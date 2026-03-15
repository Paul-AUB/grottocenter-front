import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MapIcon from '@mui/icons-material/Map';
import { FlagRounded } from '@mui/icons-material';
import { displayLoginDialog } from '../../../actions/Login';
import { usePermissions } from '../../../hooks';
import {
  entranceIcon,
  bibliographyIcon,
  massifIcon,
  organizationIcon,
  caverIcon
} from '../../../assets/icons';

import Translate from '../Translate';

const EntityIcon = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ height: 24, width: 24 }} />
);

EntityIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export const LinkedItem = ({ href = '', ItemIcon, label, onClick }) => (
  <ListItemButton
    component={React.forwardRef((props, ref) => (
      <Link {...props} to={href} ref={ref} />
    ))}
    onClick={onClick}>
    <ListItemIcon>
      <ItemIcon />
    </ListItemIcon>
    <ListItemText>
      <Translate>{label}</Translate>
    </ListItemText>
  </ListItemButton>
);

LinkedItem.propTypes = {
  href: PropTypes.string,
  ItemIcon: PropTypes.func,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

const MenuLinks = ({ toggle }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = usePermissions();

  const handleContributeClick = () => {
    if (toggle) toggle();
    if (isAuth) {
      navigate('/ui/entity/add');
    } else {
      dispatch(displayLoginDialog());
    }
  };

  return (
    <>
      <List
        component="nav"
        aria-label={formatMessage({ id: 'main mailbox folders' })}
        subheader={
          <ListSubheader disableSticky>
            <Translate>Explore</Translate>
          </ListSubheader>
        }>
        <LinkedItem
          ItemIcon={() => <MapIcon color="primary" />}
          label={formatMessage({ id: 'Map' })}
          href="/ui/map"
          onClick={toggle}
        />
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader disableSticky>
            <Translate>Browse</Translate>
          </ListSubheader>
        }>
        <LinkedItem
          ItemIcon={() => <EntityIcon src={entranceIcon} alt="entrance" />}
          label={formatMessage({ id: 'Entrances' })}
          href="/ui/entrances"
          onClick={toggle}
        />
        <LinkedItem
          ItemIcon={() => <EntityIcon src={bibliographyIcon} alt="document" />}
          label={formatMessage({ id: 'Documents' })}
          href="/ui/documents"
          onClick={toggle}
        />
        <LinkedItem
          ItemIcon={() => <EntityIcon src={massifIcon} alt="massif" />}
          label={formatMessage({ id: 'Massifs' })}
          href="/ui/massifs"
          onClick={toggle}
        />
        <LinkedItem
          ItemIcon={() => <EntityIcon src={organizationIcon} alt="organization" />}
          label={formatMessage({ id: 'Organizations' })}
          href="/ui/organizations"
          onClick={toggle}
        />
        <LinkedItem
          ItemIcon={() => <EntityIcon src={caverIcon} alt="person" />}
          label={formatMessage({ id: 'Persons' })}
          href="/ui/persons"
          onClick={toggle}
        />
        <LinkedItem
          ItemIcon={() => <FlagRounded color="primary" />}
          label={formatMessage({ id: 'Countries' })}
          href="/ui/countries"
          onClick={toggle}
        />
      </List>
      <List component="nav">
        <ListItemButton onClick={handleContributeClick}>
          <ListItemIcon>
            <LibraryAddIcon color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Translate>Contribute</Translate>
          </ListItemText>
        </ListItemButton>
      </List>
    </>
  );
};

MenuLinks.propTypes = {
  toggle: PropTypes.func
};

export default MenuLinks;
