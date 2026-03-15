import React, { useCallback } from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Launch, MenuBook } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Translate';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuLinks from './MenuLinks';
import Translate from '../Translate';
import LanguageSelector from '../LanguageSelector';
import { usePermissions } from '../../../hooks';
import QuickSearch from '../../appli/QuickSearch';
import { logoGC } from '../../../conf/config';
import { userguideLinks } from '../../../conf/externalLinks';

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 68,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
  flexShrink: 0,
  padding: theme.spacing(2)
}));

const HeaderLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: inherit;
  text-decoration: none;
`;

const LogoImage = styled('img')`
  height: 48px;
  flex-shrink: 0;
`;

const Content = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px;
`;


const SideMenu = ({ isOpen, toggle }) => {
  const permissions = usePermissions();
  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(toggle()), [dispatch, toggle]);
  const { locale } = useSelector(state => state.intl);
  const userguideUrl =
    userguideLinks[locale] !== undefined
      ? userguideLinks[locale]
      : userguideLinks['*'];
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={isOpen}
      onClose={handleClose}>
      <Header>
        <HeaderLink to="/" onClick={isMobile ? handleClose : undefined}>
          <LogoImage src={logoGC} alt="Grottocenter" />
          <Typography variant="h4" noWrap fontWeight="fontWeightBold">
            Grottocenter
          </Typography>
        </HeaderLink>
      </Header>
      <Divider />
      <Content>
        <QuickSearch onClose={isMobile ? handleClose : undefined} />
        <Divider />
        <MenuLinks isAuth={permissions.isAuth} toggle={isMobile ? handleClose : undefined} />
        <div style={{ marginTop: 'auto' }}>
          <Divider />
          <List>
            <ListItemButton component="a" href={userguideUrl} target="_blank" rel="noreferrer">
              <ListItemIcon><MenuBook color="primary" /></ListItemIcon>
              <ListItemText primary={<Translate>User guide</Translate>} />
              <Launch fontSize="small" color="action" />
            </ListItemButton>
          </List>
          <Divider />
          <ListItemButton disableRipple>
            <ListItemIcon><LanguageIcon color="primary" /></ListItemIcon>
            <LanguageSelector hideIcon />
          </ListItemButton>
        </div>
      </Content>
    </Drawer>
  );
};

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default SideMenu;
