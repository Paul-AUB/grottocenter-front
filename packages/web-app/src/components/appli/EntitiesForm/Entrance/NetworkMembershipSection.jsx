import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import Alert from '../../../common/Alert';
import { FormSection } from '../utils/FormContainers';

// Edit-mode network status + entry points to the (existing) move/detach flows.
// Replaces the create-time "The entrance is:" radios, which don't make sense
// once the entrance exists. The actual operations live on /ui/entrances/:id/move.
const NetworkMembershipSection = ({ entranceId, isNetwork, networkSize }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const movePath = `/ui/entrances/${entranceId}/move`;

  return (
    <FormSection title="Network">
      <Alert
        severity="info"
        disableMargins
        content={
          isNetwork
            ? formatMessage(
                {
                  id: 'This entrance belongs to a network of {count, plural, one {# entrance} other {# entrances}}.'
                },
                { count: networkSize }
              )
            : formatMessage({
                id: 'This entrance is the only one of its cavity (no network).'
              })
        }
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mt: 2
        }}
      >
        <Button variant="outlined" onClick={() => navigate(movePath)}>
          {formatMessage({ id: 'Link to an existing entrance or network' })}
        </Button>
        {isNetwork && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate(`${movePath}?mode=detach`)}
          >
            {formatMessage({ id: 'Detach from current network' })}
          </Button>
        )}
      </Box>
    </FormSection>
  );
};

NetworkMembershipSection.propTypes = {
  entranceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  isNetwork: PropTypes.bool.isRequired,
  networkSize: PropTypes.number
};

export default NetworkMembershipSection;
