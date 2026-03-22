import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const StyledIcon = styled(Box)`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
`;

const StyledLine = styled(Box)`
  display: flex;
  align-items: center;
`;

const InlineData = ({ icon, numberData, text }) => {
  const locale = useSelector(state => state.intl);

  return (
    <StyledLine>
      <StyledIcon>{icon}</StyledIcon>
      <Typography sx={{ pl: 1 }}>
        <Typography
          component="span"
          fontWeight={600}
          color="secondary">
          {numberData.toLocaleString(locale)}
        </Typography>
        {' '}{text}
      </Typography>
    </StyledLine>
  );
};

InlineData.propTypes = {
  icon: PropTypes.node,
  numberData: PropTypes.number,
  text: PropTypes.string
};

export default InlineData;
