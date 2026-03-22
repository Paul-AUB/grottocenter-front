import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Tooltip,
  Typography
} from '@mui/material';
import { Place, Map } from '@mui/icons-material';
import DataQualityBadge from '../../common/DataQualityBadge';
import DataQualityHelpButton from '../../common/DataQualityBadge/DataQualityHelpButton';

import CustomIcon from '../../common/CustomIcon';
import { Property } from '../../common/Properties';
import InfoSection from '../../common/InfoSection';
import Ratings from './Ratings';
import { EntrancePropTypes } from '../../../types/entrance.type';
import {
  DepthProperty,
  LengthProperty,
  TemperatureProperty,
  DivingProperty,
  OrganizationProperty
} from '../../common/CaveProperties';

const GlobalWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledRatings = styled(Ratings)`
  justify-content: space-evenly;
`;

const computePrecisionSeverity = precision => {
  if (precision === undefined || precision === null) return 'warning';
  if (precision === 0) return 'error';
  return 'success';
};

const Properties = ({ isLoading = false, entrance, dataQuality }) => {
  const { formatMessage } = useIntl();

  let precisionText = '';
  if (entrance.precision === 0) {
    precisionText = formatMessage({
      id: 'Precision unavailable for restricted access entrance.'
    });
  } else if (entrance.precision !== undefined && entrance.precision !== null) {
    precisionText = `±${entrance.precision}m`;
  }

  const openOSM = () =>
    window.open(
      `https://www.openstreetmap.org/?mlat=${entrance.latitude}&mlon=${entrance.longitude}`,
      '_blank',
      'noopener,noreferrer'
    );
  const openGM = () =>
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${entrance.latitude},${entrance.longitude}`,
      '_blank',
      'noopener,noreferrer'
    );

  return (
    <GlobalWrapper>
      <InfoSection title={formatMessage({ id: 'Location' })}>
        <Box display="flex" flexDirection="column" gap={1}>
          {entrance.latitude && entrance.longitude && (
            <Property
              loading={isLoading}
              label={`${formatMessage({ id: 'Coordinates' })} (WGS84)`}
              value={
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                  <span>{`${entrance.latitude.toFixed(4)}° N, ${entrance.longitude.toFixed(4)}° E`}</span>
                  {precisionText && (
                    <Chip
                      label={precisionText}
                      size="small"
                      color={computePrecisionSeverity(entrance.precision)}
                    />
                  )}
                  <ButtonGroup color="primary" variant="outlined" size="small">
                    <Tooltip
                      title={formatMessage({ id: 'Open on OpenStreetMap' })}>
                      <Button
                        onClick={openOSM}
                        startIcon={<Map fontSize="small" />}>
                        OSM
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={formatMessage({ id: 'Open on Google Maps' })}>
                      <Button
                        onClick={openGM}
                        startIcon={<Place fontSize="small" />}>
                        GMaps
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </Box>
              }
              icon={<CustomIcon type="coordinates" />}
            />
          )}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1
            }}>
            <Property
              loading={isLoading}
              label={formatMessage({ id: 'City' })}
              value={[entrance.city, entrance.region]
                .flatMap(f => (f ? [f] : []))
                .join(', ')}
              icon={<CustomIcon type="location" />}
              secondary
            />
            {!!entrance.altitude && (
              <Property
                label={formatMessage({ id: 'Altitude' })}
                value={`${entrance.altitude} m`}
                icon={<CustomIcon type="altitude" />}
              />
            )}
          </Box>
        </Box>
      </InfoSection>

      {(entrance.cave?.depth ||
        entrance.cave?.length ||
        entrance.cave?.temperature ||
        entrance.discoveryYear ||
        entrance.undergroundType ||
        entrance.cave?.isDiving) && (
        <InfoSection title={formatMessage({ id: 'Characteristics' })}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1
            }}>
            <DepthProperty depth={entrance.cave?.depth} isLoading={isLoading} />
            <LengthProperty
              length={entrance.cave?.length}
              isLoading={isLoading}
            />
            <TemperatureProperty
              temperature={entrance.cave?.temperature}
              isLoading={isLoading}
            />
            {!!entrance.discoveryYear && (
              <Property
                label={formatMessage({ id: 'Year of discovery' })}
                value={entrance.discoveryYear}
                icon={<CustomIcon type="discovery_date" />}
              />
            )}
            {!!entrance.undergroundType && (
              <Property
                label={formatMessage({ id: 'Underground type' })}
                value={entrance.undergroundType}
                icon={<CustomIcon type="category" />}
              />
            )}
            <DivingProperty
              isDiving={entrance.cave?.isDiving}
              isLoading={isLoading}
            />
          </Box>
        </InfoSection>
      )}

      {entrance.cave?.exploringOrganizations?.length > 0 && (
        <InfoSection title={formatMessage({ id: 'Exploring organizations' })}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              }
            }}>
            {entrance.cave.exploringOrganizations.map(org => (
              <OrganizationProperty key={org.id} organization={org} />
            ))}
          </Box>
        </InfoSection>
      )}
      {dataQuality != null && (
        <InfoSection title={formatMessage({ id: 'Data quality' })}>
          <Box display="flex" alignItems="center" gap={2}>
            <DataQualityBadge value={dataQuality} size={32} />
            <Typography variant="body2">
              {dataQuality >= 70
                ? formatMessage({ id: 'Good' })
                : dataQuality >= 40
                  ? formatMessage({ id: 'Satisfactory' })
                  : formatMessage({ id: 'Insufficient' })}
            </Typography>
            <DataQualityHelpButton />
          </Box>
        </InfoSection>
      )}
      {!!entrance.stats &&
        !!entrance.stats.approach &&
        !!entrance.stats.aestheticism &&
        !!entrance.stats.caving && (
          <StyledRatings
            access={entrance.stats.approach}
            interest={entrance.stats.aestheticism}
            progression={entrance.stats.caving}
            size="small"
          />
        )}
    </GlobalWrapper>
  );
};

Properties.propTypes = {
  isLoading: PropTypes.bool,
  entrance: EntrancePropTypes,
  dataQuality: PropTypes.number
};

export default Properties;
