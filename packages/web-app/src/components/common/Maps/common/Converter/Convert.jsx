import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import proj4 from 'proj4';
import { groupBy } from 'ramda';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useIntl } from 'react-intl';
import { unitsTab } from '../../../../../conf/ListGPSProj';
import Translate from '../../../Translate';
import getLocalizedCountryName from '../../../../../helpers/countryName';
import { useDebounce } from '../../../../../hooks/useDebounce';

// --- Pure helper functions (proj4 projection manipulation) ---

function addZone(definition, zone) {
  const tmp = definition.split('+zone=');
  const tmp2 = tmp[1].substring(2);
  return `${tmp[0]}+zone=${zone} ${tmp2}`;
}

function removeSouth(definition) {
  const parts = definition.split('+south');
  return parts.length > 1 ? parts[0] + parts[1] : parts[0];
}

function getUTMZone(wgs84lng) {
  return wgs84lng >= 0
    ? Math.floor((wgs84lng + 180) / 6) + 1
    : Math.floor(wgs84lng / 6) + 31;
}

function getHemisphere(wgs84Lat) {
  return wgs84Lat >= 0 ? 'North' : 'South';
}

function buildUTMProjection(definition, zone, hemisphere) {
  let projection = addZone(definition, zone);
  projection = removeSouth(projection);
  if (hemisphere === 'South') {
    projection += ' +south';
  }
  return projection;
}

// --- Styled components ---

const SectionBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`
}));

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: 12
});

const MenuItemGroup = styled(MenuItem)({
  fontSize: 'larger',
  fontWeight: 'bold'
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: 'small',
  padding: '0 30px'
});

const OutputValue = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  transition: 'background-color 0.15s',
  '&:hover': {
    backgroundColor: theme.palette.action.selected
  }
}));

// --- Component ---

const Convert = ({
  list: projectionsList,
  map,
  hideOutput = false,
  onConvert
}) => {
  const { formatMessage, locale } = useIntl();

  // Input state
  const defaultHemi = 'North';
  const defaultZone = 31;
  const [valueXInput, setValueXInput] = useState('');
  const [valueYInput, setValueYInput] = useState('');
  const [keyGPSInput, setKeyGPSInput] = useState('WGS84');
  const [keyGPSOutput, setKeyGPSOutput] = useState('WGS84');
  const [zoneInput, setZoneInput] = useState(defaultZone);
  const [hemiInput, setHemiInput] = useState(defaultHemi);

  // Output state
  const [valueXOutput, setValueXOutput] = useState('');
  const [valueYOutput, setValueYOutput] = useState('');
  const [zoneOutput, setZoneOutput] = useState('—');
  const [hemiOutput, setHemiOutput] = useState('—');

  // Copy feedback
  const [copiedField, setCopiedField] = useState(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

  // Derived values
  const inputProjection = useMemo(
    () => projectionsList.find(p => p.code === keyGPSInput),
    [projectionsList, keyGPSInput]
  );
  const outputProjection = useMemo(
    () => projectionsList.find(p => p.code === keyGPSOutput),
    [projectionsList, keyGPSOutput]
  );

  const inputUnits = inputProjection?.units;
  const outputUnits = outputProjection?.units;
  const utmInput = inputProjection?.proj === 'utm';
  const utmOutput = outputProjection?.proj === 'utm';
  const inputLabels = unitsTab[inputUnits] || unitsTab.m;
  const outputLabels = unitsTab[outputUnits] || unitsTab.m;

  // Grouped options for Select (by country)
  const groupedOptions = useMemo(() => {
    const worldLabel = formatMessage({ id: 'World' });
    const grouped = groupBy(
      p =>
        getLocalizedCountryName(p, formatMessage, locale, p.en_name) ||
        worldLabel,
      projectionsList
    );
    const items = [];
    Object.entries(grouped)
      .sort(([a], [b]) =>
        a === worldLabel ? -1 : b === worldLabel ? 1 : a.localeCompare(b)
      )
      .forEach(([countryName, projections]) => {
        items.push(
          <MenuItemGroup key={countryName} disabled>
            {countryName}
          </MenuItemGroup>
        );
        projections.forEach((projection, index) => {
          items.push(
            <StyledMenuItem
              key={`${countryName}-${projection.code}-${index}`}
              value={projection.code}>
              {projection.title}
            </StyledMenuItem>
          );
        });
      });
    return items;
  }, [projectionsList, formatMessage, locale]);

  // --- Conversion logic ---

  const performConvert = useCallback(() => {
    if (!valueXInput || !valueYInput || !inputProjection || !outputProjection)
      return;

    // Special case to avoid weird edge cases in proj4 when converting
    // between the same UTM zones or between a UTM zone and its base projection
    if (keyGPSInput === keyGPSOutput) {
      setValueXOutput(valueXInput);
      setValueYOutput(valueYInput);
      if (utmInput) {
        setZoneOutput(zoneInput);
        setHemiOutput(hemiInput);
      }
      if (onConvert) onConvert();
      return;
    }

    try {
      // proj4 expects [x, y] = [easting/lng, northing/lat]
      // For degree-based systems, our UI shows Lat as X and Lng as Y,
      // so we swap them for proj4
      const xValue = inputUnits === 'degrees' ? valueYInput : valueXInput;
      const yValue = inputUnits === 'degrees' ? valueXInput : valueYInput;

      let firstProjection = inputProjection.definition;
      let secondProjection = outputProjection.definition;

      if (utmInput) {
        firstProjection = buildUTMProjection(
          firstProjection,
          zoneInput,
          hemiInput
        );
      }

      const wgs84Def = projectionsList.find(
        p => p.code === 'WGS84'
      )?.definition;
      const [lng, lat] = proj4(firstProjection, wgs84Def, [
        parseFloat(xValue),
        parseFloat(yValue)
      ]);
      const wgs84Coords = [lat, lng];

      if (utmOutput) {
        const calculatedZone = getUTMZone(lng);
        const calculatedHemi = getHemisphere(lat);
        secondProjection = buildUTMProjection(
          secondProjection,
          calculatedZone,
          calculatedHemi
        );
        setZoneOutput(calculatedZone);
        setHemiOutput(calculatedHemi);
      }

      const [convertedX, convertedY] = proj4(
        firstProjection,
        secondProjection,
        [parseFloat(xValue), parseFloat(yValue)]
      );

      // Swap back for degree-based output
      if (outputUnits === 'degrees') {
        setValueXOutput(convertedY);
        setValueYOutput(convertedX);
      } else {
        setValueXOutput(convertedX);
        setValueYOutput(convertedY);
      }

      if (map && wgs84Coords) {
        map.setView(wgs84Coords, map.getZoom());
      }

      if (onConvert) {
        onConvert();
      }
    } catch {
      setValueXOutput('');
      setValueYOutput('');
    }
  }, [
    valueXInput,
    valueYInput,
    keyGPSInput,
    keyGPSOutput,
    inputProjection,
    outputProjection,
    inputUnits,
    outputUnits,
    utmInput,
    utmOutput,
    zoneInput,
    hemiInput,
    projectionsList,
    map,
    onConvert
  ]);

  // Auto-convert: debounce coordinate values, but react immediately to projection changes
  const debouncedX = useDebounce(valueXInput, 300);
  const debouncedY = useDebounce(valueYInput, 300);

  useEffect(() => {
    if (hideOutput) return;
    if (debouncedX && debouncedY) {
      performConvert();
    } else {
      setValueXOutput('');
      setValueYOutput('');
      setHemiOutput('—');
      setZoneOutput('—');
    }
  }, [debouncedX, debouncedY, performConvert, hideOutput]);

  // --- Handlers ---

  const handleChangeGPSInput = useCallback(event => {
    setKeyGPSInput(event.target.value);
    setValueXInput('');
    setValueYInput('');
    setValueXOutput('');
    setValueYOutput('');
    setZoneInput(defaultZone);
    setHemiInput(defaultHemi);
  }, []);

  const handleChangeGPSOutput = useCallback(event => {
    setKeyGPSOutput(event.target.value);
  }, []);

  const handleCopy = useCallback(async (value, field) => {
    const text = String(value);
    let copied = false;

    // Try modern clipboard API first
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        // Falls through to fallback
      }
    }

    // Fallback for non-secure contexts (e.g. HTTP localhost, mobile)
    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy'); // eslint-disable-line no-restricted-properties
      } catch {
        // Silent fail
      }
      document.body.removeChild(textarea);
    }

    setCopiedField(field);
    clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopiedField(null), 1500);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 340
      }}>
      {/* INPUT SECTION */}
      <SectionBox>
        <SectionTitle variant="subtitle1">
          <Translate>Input</Translate>
        </SectionTitle>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>
            <Translate>Coordinate system</Translate>
          </InputLabel>
          <Select
            value={keyGPSInput}
            label={formatMessage({ id: 'Coordinate system' })}
            onChange={handleChangeGPSInput}>
            {groupedOptions}
          </Select>
        </FormControl>

        {utmInput && (
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>
                <Translate>Hemisphere</Translate>
              </InputLabel>
              <Select
                value={hemiInput}
                label={formatMessage({ id: 'Hemisphere' })}
                onChange={e => setHemiInput(e.target.value)}>
                <MenuItem value="North">
                  <Translate>North</Translate>
                </MenuItem>
                <MenuItem value="South">
                  <Translate>South</Translate>
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              type="number"
              label="Zone"
              value={zoneInput}
              onChange={e => setZoneInput(e.target.value)}
              sx={{ width: 90 }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            type="number"
            label={`${inputLabels.xName} (${inputLabels.xUnit})`}
            value={valueXInput}
            onChange={e => setValueXInput(e.target.value)}
            sx={{ flex: 1, minWidth: 130 }}
          />
          <TextField
            size="small"
            type="number"
            label={`${inputLabels.yName} (${inputLabels.yUnit})`}
            value={valueYInput}
            onChange={e => setValueYInput(e.target.value)}
            sx={{ flex: 1, minWidth: 130 }}
          />
        </Box>

        {hideOutput && (
          <Button
            variant="contained"
            onClick={performConvert}
            disabled={!valueXInput || !valueYInput}
            fullWidth
            sx={{ mt: 2 }}>
            <Translate>Convert</Translate>
          </Button>
        )}
      </SectionBox>

      {/* OUTPUT SECTION */}
      {!hideOutput && (
        <SectionBox>
          <SectionTitle variant="subtitle1">
            <Translate>Output</Translate>
          </SectionTitle>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>
              <Translate>Coordinate system</Translate>
            </InputLabel>
            <Select
              value={keyGPSOutput}
              label={formatMessage({ id: 'Coordinate system' })}
              onChange={handleChangeGPSOutput}>
              {groupedOptions}
            </Select>
          </FormControl>

          {utmOutput && (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 2,
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <Typography variant="body2">
                <Translate>Hemisphere</Translate>
                {': '}
                <strong>{formatMessage({ id: hemiOutput })}</strong>
              </Typography>
              <Typography variant="body2">
                Zone: <strong>{zoneOutput}</strong>
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
            <Tooltip open={copiedField === 'x'}>
              <OutputValue
                onClick={() => valueXOutput && handleCopy(valueXOutput, 'x')}
                sx={!valueXOutput ? { cursor: 'default', opacity: 0.5 } : {}}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {outputLabels.xName}:
                </Typography>
                <Typography variant="body1">
                  <strong>{valueXOutput || '—'}</strong> {outputLabels.xUnit}
                </Typography>
                {copiedField === 'x' ? (
                  <CheckIcon
                    color="success"
                    sx={{ fontSize: 16, ml: 'auto' }}
                  />
                ) : (
                  <ContentCopyIcon
                    sx={{ fontSize: 16, opacity: 0.4, ml: 'auto' }}
                  />
                )}
              </OutputValue>
            </Tooltip>

            <Tooltip open={copiedField === 'y'}>
              <OutputValue
                onClick={() => valueYOutput && handleCopy(valueYOutput, 'y')}
                sx={!valueYOutput ? { cursor: 'default', opacity: 0.5 } : {}}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {outputLabels.yName}:
                </Typography>
                <Typography variant="body1">
                  <strong>{valueYOutput || '—'}</strong> {outputLabels.yUnit}
                </Typography>
                {copiedField === 'y' ? (
                  <CheckIcon
                    color="success"
                    sx={{ fontSize: 16, ml: 'auto' }}
                  />
                ) : (
                  <ContentCopyIcon
                    sx={{ fontSize: 16, opacity: 0.4, ml: 'auto' }}
                  />
                )}
              </OutputValue>
            </Tooltip>
          </Box>
        </SectionBox>
      )}

      {/* ATTRIBUTION */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textAlign: 'center', px: 1, mt: 1, lineHeight: 1.4 }}>
        <Translate
          id="Based on the library {proj4jsLink} and the project {proj4Link}, this converter uses the conversion constants from {spatialReferenceLink}."
          values={{
            proj4jsLink: (
              <a
                key="proj4js"
                // No certificate for proj4js.org, so using http to ensure the link works even on non-secure contexts
                href="http://proj4js.org"
                target="_blank"
                rel="noopener noreferrer">
                Proj4js
              </a>
            ),
            proj4Link: (
              <a
                key="proj4"
                href="https://trac.osgeo.org/proj"
                target="_blank"
                rel="noopener noreferrer">
                Proj.4
              </a>
            ),
            spatialReferenceLink: (
              <a
                key="spatialref"
                href="https://spatialreference.org"
                target="_blank"
                rel="noopener noreferrer">
                Spatial Reference
              </a>
            )
          }}
        />
      </Typography>
    </Box>
  );
};

Convert.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      title: PropTypes.string,
      definition: PropTypes.string,
      units: PropTypes.string,
      proj: PropTypes.string
    })
  ).isRequired,
  map: PropTypes.shape({
    setView: PropTypes.func,
    getZoom: PropTypes.func
  }),
  hideOutput: PropTypes.bool,
  onConvert: PropTypes.func
};

export default Convert;
