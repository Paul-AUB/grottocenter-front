import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Divider, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoBlock from './InfoBlock';

import { depthIcon, lengthIcon } from '../../../../../assets/icons';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr auto 1fr',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    '& hr': { display: 'none' },
  },
}));

const styledImg = { width: '100%', height: 'auto' };

const CavesStatistics = ({ avgDepth, avgLength, totalLength }) => {
  const { formatMessage } = useIntl();

  const tooltipText = `${formatMessage({ id: 'Calculated on' })} ${
    totalLength.nb_data
  } ${formatMessage({ id: 'caves' })}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" textAlign="center" pb={2}>
        {formatMessage({ id: 'Caves statistics' })}
      </Typography>
      <StyledBox>
        {avgDepth && (
          <InfoBlock
            icon={<img style={styledImg} src={depthIcon} alt={formatMessage({ id: 'Depth icon' })} />}
            numberData={avgDepth}
            text={formatMessage({ id: 'average depth' })}
          />
        )}
        <Divider orientation="vertical" flexItem />
        {avgLength && (
          <InfoBlock
            icon={<img style={styledImg} src={lengthIcon} alt={formatMessage({ id: 'Length icon' })} />}
            numberData={avgLength}
            text={formatMessage({ id: 'average length' })}
          />
        )}
        <Divider orientation="vertical" flexItem />
        {totalLength && (
          <InfoBlock
            icon={
              <Tooltip title={tooltipText}>
                <img style={styledImg} src={lengthIcon} alt={formatMessage({ id: 'Length icon' })} />
              </Tooltip>
            }
            numberData={totalLength.value}
            text={formatMessage({ id: 'cumulated length' })}
          />
        )}
      </StyledBox>
    </Box>
  );
};

CavesStatistics.propTypes = {
  avgDepth: PropTypes.number,
  avgLength: PropTypes.number,
  totalLength: PropTypes.shape({
    value: PropTypes.number,
    nb_data: PropTypes.number
  })
};

export default CavesStatistics;
