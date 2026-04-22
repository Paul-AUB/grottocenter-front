import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Check } from '@mui/icons-material';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem
} from '@mui/material';
import { groupBy } from 'ramda';
import getLocalizedCountryName from '../../../helpers/countryName';
import Translate from '../Translate';
import { WGS84_DD, DMS_CODE } from '../../../hooks';

const CRSMenu = ({ anchorEl, onClose, preferred, projections, onSelect }) => {
  const { formatMessage, locale } = useIntl();

  const worldLabel = formatMessage({ id: 'World' });

  const sortedGroups = useMemo(
    () =>
      Object.entries(
        groupBy(
          p =>
            getLocalizedCountryName(p, formatMessage, locale, p.en_name) ||
            worldLabel,
          projections
        )
      )
        .map(([name, projs]) => [
          name,
          [...projs].sort((a, b) => a.title.localeCompare(b.title))
        ])
        .sort(([a], [b]) =>
          a === worldLabel ? -1 : b === worldLabel ? 1 : a.localeCompare(b)
        ),
    [projections, formatMessage, locale, worldLabel]
  );

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{ sx: { maxHeight: 440, minWidth: 280 } }}>
      <ListSubheader disableSticky sx={{ lineHeight: '32px', fontWeight: 'bold' }}>
        <Translate>Coordinate system</Translate>
      </ListSubheader>
      <MenuItem onClick={() => onSelect(WGS84_DD)} dense>
        <ListItemIcon>
          {preferred === WGS84_DD && <Check fontSize="small" color="primary" />}
        </ListItemIcon>
        <ListItemText
          primary={<Translate>Decimal degrees (WGS84)</Translate>}
          slotProps={{ primary: { variant: 'body2' } }}
        />
      </MenuItem>
      <MenuItem onClick={() => onSelect(DMS_CODE)} dense>
        <ListItemIcon>
          {preferred === DMS_CODE && <Check fontSize="small" color="primary" />}
        </ListItemIcon>
        <ListItemText
          primary={<Translate>Degrees Minutes Seconds</Translate>}
          slotProps={{ primary: { variant: 'body2' } }}
        />
      </MenuItem>
      {projections.length > 0 && [
        <Divider key="proj-divider" />,
        ...sortedGroups.map(([groupName, groupProjections]) => [
          <ListSubheader
            key={`header-${groupName}`}
            disableSticky
            sx={{ lineHeight: '28px' }}>
            {groupName}
          </ListSubheader>,
          ...groupProjections.map(p => (
            <MenuItem key={p.code} onClick={() => onSelect(p.code)} dense>
              <ListItemIcon>
                {preferred === p.code && (
                  <Check fontSize="small" color="primary" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={p.title}
                slotProps={{ primary: { variant: 'body2' } }}
              />
            </MenuItem>
          ))
        ])
      ]}
    </Menu>
  );
};

CRSMenu.propTypes = {
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  preferred: PropTypes.string.isRequired,
  projections: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string, title: PropTypes.string })
  ),
  onSelect: PropTypes.func.isRequired
};

CRSMenu.defaultProps = {
  anchorEl: null,
  projections: []
};

export default CRSMenu;
