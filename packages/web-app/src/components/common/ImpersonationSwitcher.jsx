import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  Badge,
  Box,
  Divider,
  Fab,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  clearImpersonation,
  setImpersonatedRole
} from '../../actions/Login';
import { usePermissions } from '../../hooks';

// Ordered most-privileged → least — the useful QA sweep direction. Administrator
// is intentionally absent: it's the "stop impersonating" case, exposed as the
// first entry ("Myself (Administrator)") below.
const IMPERSONATABLE_ROLES = ['Moderator', 'Leader', 'User', 'Visitor'];

const ImpersonationSwitcher = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { isRealAdmin, isImpersonating, impersonatedRole } = usePermissions();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handlePick = useCallback(
    role => {
      dispatch(setImpersonatedRole(role));
      setAnchorEl(null);
    },
    [dispatch]
  );

  const handleStop = useCallback(() => {
    dispatch(clearImpersonation());
    setAnchorEl(null);
  }, [dispatch]);

  if (!isRealAdmin) return null;

  const tooltipText = isImpersonating
    ? formatMessage(
        {
          id: 'You are viewing the site as {role}',
          defaultMessage: 'You are viewing the site as {role}'
        },
        {
          role: formatMessage({
            id: impersonatedRole,
            defaultMessage: impersonatedRole
          })
        }
      )
    : formatMessage({
        id: 'View the site as another role',
        defaultMessage: 'View the site as another role'
      });

  return (
    <>
      <Tooltip title={tooltipText} placement="left">
        <Fab
          onClick={handleOpen}
          color={isImpersonating ? 'warning' : 'default'}
          size="medium"
          aria-label={tooltipText}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            // Below MUI's Snackbar so notifications stay reachable over it.
            zIndex: theme => theme.zIndex.snackbar - 1
          }}>
          <Badge
            color="error"
            variant="dot"
            overlap="circular"
            invisible={!isImpersonating}>
            <VisibilityIcon />
          </Badge>
        </Fab>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{ paper: { sx: { minWidth: 240, mb: 1 } } }}>
        <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
          <Typography variant="overline" color="text.secondary">
            {formatMessage({
              id: 'View the site as another role',
              defaultMessage: 'View the site as another role'
            })}
          </Typography>
        </Box>
        <MenuItem onClick={handleStop} selected={!isImpersonating}>
          <ListItemIcon>
            {!isImpersonating ? (
              <CheckIcon fontSize="small" />
            ) : (
              <PersonIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {formatMessage({
              id: 'Myself (Administrator)',
              defaultMessage: 'Myself (Administrator)'
            })}
          </ListItemText>
        </MenuItem>
        <Divider />
        {IMPERSONATABLE_ROLES.map(role => {
          const selected = impersonatedRole === role;
          return (
            <MenuItem
              key={role}
              onClick={() => handlePick(role)}
              selected={selected}>
              <ListItemIcon>
                {selected ? <CheckIcon fontSize="small" /> : null}
              </ListItemIcon>
              <ListItemText>
                {formatMessage({ id: role, defaultMessage: role })}
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ImpersonationSwitcher;
