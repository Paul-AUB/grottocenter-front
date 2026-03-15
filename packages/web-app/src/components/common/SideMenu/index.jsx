import React, { useCallback } from 'react';
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Launch, MenuBook } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Translate';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { displayLoginDialog } from '../../../actions/Login';
import { usePermissions } from '../../../hooks';
import MenuLinks from './MenuLinks';
import Translate from '../Translate';
import LanguageSelector from '../LanguageSelector';
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
  padding: 0 8px 8px;
  font-size: 0.95rem;
`;

const Footer = styled('div')`
  margin-top: auto;
`;

const ContributeButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  width: `calc(100% - ${theme.spacing(2)})`
}));

const SideMenu = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = usePermissions();
  const handleClose = useCallback(() => dispatch(toggle()), [dispatch, toggle]);
  const { locale } = useSelector(state => state.intl);

  const handleContributeClick = () => {
    handleClose();
    if (isAuth) {
      navigate('/ui/entity/add');
    } else {
      dispatch(displayLoginDialog());
    }
  };
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
      <Content>
        <Divider />
        <QuickSearch onClose={isMobile ? handleClose : undefined} />
        <Divider />
        <MenuLinks toggle={isMobile ? handleClose : undefined} />
        <Footer>
          <Divider />
          <ContributeButton
            variant="outlined"
            color="primary"
            startIcon={<LibraryAddIcon />}
            onClick={handleContributeClick}>
            <Translate>Contribute</Translate>
          </ContributeButton>
          <Divider />
          <List dense>
            <ListItemButton
              component="a"
              href={userguideUrl}
              target="_blank"
              rel="noreferrer">
              <ListItemIcon>
                <MenuBook color="primary" sx={{ fontSize: 28 }} />
              </ListItemIcon>
              <ListItemText primary={<Translate>User guide</Translate>} />
              <Launch fontSize="small" color="action" />
            </ListItemButton>
            <ListItem>
              <ListItemIcon>
                <LanguageIcon color="primary" sx={{ fontSize: 28 }} />
              </ListItemIcon>
              <LanguageSelector hideIcon />
            </ListItem>
          </List>
        </Footer>
      </Content>
    </Drawer>
  );
};

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default SideMenu;
