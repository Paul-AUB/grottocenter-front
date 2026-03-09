import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';

import Translate from '../Translate';
import { useUserProperties } from '../../../hooks';
import UserAvatar from './UserAvatar';

const UserMenu = ({
  authTokenExpirationDate,
  isAuth,
  userNickname,
  onLoginClick,
  onLogoutClick
}) => {
  const { formatDate, formatMessage, formatTime } = useIntl();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const userId = pathOr(null, ['id'], useUserProperties());
  const navigate = useNavigate();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Before using onLogoutClick(), we need to handle the menu closing
  // to detach the popover menu before the account icon/button changes.
  const handleLogoutClick = () => {
    handleClose();
    onLogoutClick();
  };

  // directs to the person page to see and modify the personnal data
  const handleMyAccountClick = () => {
    navigate(`/ui/persons/${userId}`);
  };

  const isSessionExpired = authTokenExpirationDate < Date.now();

  return !isAuth ? (
    <Button
      color="inherit"
      onClick={onLoginClick}
      variant="outlined">
      <Translate>Log in</Translate>
    </Button>
  ) : (
    <>
      <IconButton
        aria-label={formatMessage({ id: 'account of current user' })}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        size="large">
        <UserAvatar username={userNickname} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}>
        <MenuItem disabled>
          {formatMessage(
            {
              id: 'Logged as {userNickname}',
              defaultMessage: 'Logged as {userNickname}'
            },
            {
              userNickname: (
                <span key="nickname">
                  &nbsp;
                  <b>{userNickname}</b>
                </span>
              )
            }
          )}
        </MenuItem>
        <MenuItem
          divider
          disabled
          style={isSessionExpired ? { opacity: 1 } : {}}>
          {isSessionExpired ? (
            <span style={{ color: theme.palette.errorColor }}>
              {formatMessage({
                id: 'Your session has expired: please log in again.'
              })}
            </span>
          ) : (
            <>
              {formatMessage(
                {
                  id: 'Expiration Date: {expirationDate} at {expirationHourAndMinutes}',
                  defaultMessage:
                    'Expiration Date: {expirationDate} at {expirationHourAndMinutes}'
                },
                {
                  expirationDate: (
                    <span key="date">
                      &nbsp;
                      {formatDate(authTokenExpirationDate)}
                      &nbsp;
                    </span>
                  ),
                  expirationHourAndMinutes: (
                    <span key="time">
                      &nbsp;
                      {formatTime(authTokenExpirationDate)}
                    </span>
                  )
                }
              )}
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleMyAccountClick}>
          <Translate>My Account</Translate>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <Translate>Log out</Translate>
        </MenuItem>
      </Menu>
    </>
  );
};

UserMenu.propTypes = {
  authTokenExpirationDate: PropTypes.instanceOf(Date),
  userNickname: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

export default UserMenu;
