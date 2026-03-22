import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomIcon from '../../../../common/CustomIcon';
import InlineData from './InlineData';

const CavesData = ({
  title,
  nbMassifs,
  nbCaves,
  nbDivingCaves,
  nbNetworks,
  url
}) => {
  const { formatMessage } = useIntl();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" textAlign="center" pb={2}>
        {title}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        {nbMassifs !== undefined && nbMassifs !== null && (
          <InlineData
            icon={<CustomIcon type="massif" size={40} />}
            numberData={nbMassifs}
            text={formatMessage({ id: nbMassifs > 1 ? 'massifs' : 'massif' })}
          />
        )}
        {nbCaves !== undefined && nbCaves !== null && (
          <InlineData
            icon={<CustomIcon type="entrance" size={40} />}
            numberData={nbCaves}
            text={formatMessage({
              id:
                nbCaves > 1
                  ? 'caves (1 or multiple entrances)'
                  : 'cave (1 or multiple entrances)'
            })}
          />
        )}
        {nbDivingCaves !== undefined && nbDivingCaves !== null && (
          <InlineData
            icon={<CustomIcon type="diving_cave" size={40} />}
            numberData={nbDivingCaves}
            text={formatMessage({
              id: nbDivingCaves > 1 ? 'caves are diveable' : 'cave is diveable'
            })}
          />
        )}
        {nbNetworks !== undefined && nbNetworks !== null && (
          <InlineData
            icon={<CustomIcon type="network" size={40} />}
            numberData={nbNetworks}
            text={formatMessage({
              id:
                nbNetworks > 1
                  ? 'networks (cave of more than 1 entrance)'
                  : 'network (cave of more than 1 entrance)'
            })}
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          size="small"
          component={Link}
          to={url}
          sx={{ fontWeight: 700 }}>
          {formatMessage({ id: 'Access entrances list' })}
        </Button>
      </Box>
    </Box>
  );
};

CavesData.propTypes = {
  title: PropTypes.string,
  nbMassifs: PropTypes.number,
  nbCaves: PropTypes.number,
  nbDivingCaves: PropTypes.number,
  nbNetworks: PropTypes.number,
  url: PropTypes.string
};

export default CavesData;
