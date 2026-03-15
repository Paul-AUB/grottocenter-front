import React, { useCallback } from 'react';
import { Divider, Drawer, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Translate from '../Translate';
import MenuLinks from './MenuLinks';
import Footer from './Footer';
import LanguageSelector from '../LanguageSelector';
import { usePermissions } from '../../../hooks';
import QuickSearch from '../../appli/QuickSearch';
import { logoGC } from '../../../conf/config';

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

const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
`;

const UserContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const UserInformation = ({ isAuth = false }) => (
  <UserContainer>
    {isAuth ? (
      <Wrapper>
        <Typography variant="caption">
          <Translate>You are connected</Translate>
        </Typography>
      </Wrapper>
    ) : (
      <>
        <Typography variant="caption" fontWeight="fontWeightBold">
          <Translate>You are not logged in.</Translate>
        </Typography>
        <Typography variant="caption">
          <Translate>Log in to activate the editor mode.</Translate>
        </Typography>
      </>
    )}
  </UserContainer>
);

UserInformation.propTypes = {
  isAuth: PropTypes.bool
};

const SideMenu = ({ isOpen, toggle }) => {
  const permissions = usePermissions();
  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(toggle()), [dispatch, toggle]);
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={isOpen}
      onClose={handleClose}>
      <Header>
        <HeaderLink to="">
          <LogoImage src={logoGC} alt="Grottocenter" />
          <Typography variant="h4" noWrap fontWeight="fontWeightBold">
            Grottocenter
          </Typography>
        </HeaderLink>
      </Header>
      <Divider />
      <Content>
        <UserInformation isAuth={permissions.isAuth} />
        <QuickSearch onClose={isMobile ? handleClose : undefined} />
        <Divider />
        <MenuLinks isAuth={permissions.isAuth} toggle={isMobile ? handleClose : undefined} />
        <Footer />
        <LanguageSelector />
      </Content>
    </Drawer>
  );
};

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default SideMenu;
