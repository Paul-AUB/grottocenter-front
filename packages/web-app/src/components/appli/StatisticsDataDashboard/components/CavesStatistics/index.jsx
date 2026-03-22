import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoBlock from './InfoBlock';

import InfoSection from '../../../../common/InfoSection';
import { depthIcon, lengthIcon } from '../../../../../assets/icons';

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const styledImg = { width: '100%', height: 'auto' };

const CavesStatistics = ({ avgDepth, avgLength, totalLength }) => {
  const { formatMessage } = useIntl();

  const tooltipText = `${formatMessage({ id: 'Calculated on' })} ${
    totalLength.nb_data
  } ${formatMessage({ id: 'caves' })}`;

  return (
    <InfoSection title={formatMessage({ id: 'Caves statistics' })}>
      <StyledBox>
        {avgDepth && (
          <InfoBlock
            icon={
              <img
                style={styledImg}
                src={depthIcon}
                alt={formatMessage({ id: 'Depth icon' })}
              />
            }
            numberData={avgDepth}
            text={formatMessage({ id: 'average depth' })}
          />
        )}
        {avgLength && (
          <InfoBlock
            icon={
              <img
                style={styledImg}
                src={lengthIcon}
                alt={formatMessage({ id: 'Length icon' })}
              />
            }
            numberData={avgLength}
            text={formatMessage({ id: 'average length' })}
          />
        )}
        {totalLength && (
          <InfoBlock
            icon={
              <Tooltip title={tooltipText}>
                <img
                  style={styledImg}
                  src={lengthIcon}
                  alt={formatMessage({ id: 'Length icon' })}
                />
              </Tooltip>
            }
            numberData={totalLength.value}
            text={formatMessage({ id: 'cumulated length' })}
          />
        )}
      </StyledBox>
    </InfoSection>
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
