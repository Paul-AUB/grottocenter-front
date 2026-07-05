import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link as MuiLink } from '@mui/material';
import CustomIcon from './CustomIcon';
import { useOpenLink } from '../../hooks';

// An inline "network" link (icon + name) meant to be dropped into a
// FormattedMessage's `values` as a named placeholder, e.g.:
//   <FormattedMessage id="... {networkLink} ..." values={{ networkLink: <NetworkInlineLink .../> }} />
const NetworkInlineLink = ({ caveId, label, size = 16, variant = 'body2' }) => {
  const openLink = useOpenLink();
  return (
    <MuiLink
      component="button"
      variant={variant}
      onClick={() => openLink(`/ui/caves/${caveId}`)}
      sx={{ display: 'inline', verticalAlign: 'baseline' }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          verticalAlign: 'middle',
          mr: '2px'
        }}
      >
        <CustomIcon type="network" size={size} />
      </Box>
      {label}
    </MuiLink>
  );
};

NetworkInlineLink.propTypes = {
  caveId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.number,
  variant: PropTypes.string
};

export default NetworkInlineLink;
