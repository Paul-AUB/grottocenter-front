import React from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import PropTypes from 'prop-types';

// Use only secondary main color for all avatars (simple and consistent)
const AVATAR_COLOR = orange[700]; // #F57C00 - Secondary main

// Generate initials from username
const getInitials = username => {
  if (!username) return '?';

  const cleaned = username.trim().toUpperCase();

  // If username contains space, take first letter of first and last word
  const words = cleaned.split(/\s+/);
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`;
  }

  // Otherwise, take first two letters
  return cleaned.substring(0, 2);
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32
  }
}));

const UserAvatar = ({ username, ...props }) => {
  const initials = getInitials(username);

  return (
    <StyledAvatar
      {...props}
      sx={{
        bgcolor: AVATAR_COLOR,
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 500,
        ...props.sx
      }}>
      {initials}
    </StyledAvatar>
  );
};

UserAvatar.propTypes = {
  username: PropTypes.string,
  sx: PropTypes.object
};

export default UserAvatar;
