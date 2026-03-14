import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  altitudeIcon,
  bibliographyIcon,
  categoryIcon,
  caverIcon,
  countryIcon,
  coordinatesIcon,
  depthIcon,
  discoveryDateIcon,
  divingCaveIcon,
  entranceIcon,
  entranceMarkerIcon,
  lengthIcon,
  locationIcon,
  massifIcon,
  networkIcon,
  organizationIcon,
  temperatureIcon,
  timeToGoIcon,
  undergroundTimeIcon
} from '../../../assets/icons';

const Icon = styled('span')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  margin: 0px 4px 0px 0px;
`;

const Img = styled('img')`
  padding: 0;
`;

const iconSources = {
  altitude: altitudeIcon,
  bibliography: bibliographyIcon,
  category: categoryIcon,
  caver: caverIcon,
  country: countryIcon,
  coordinates: coordinatesIcon,
  depth: depthIcon,
  discovery_date: discoveryDateIcon,
  diving_cave: divingCaveIcon,
  entrance: entranceIcon,
  entrance_marker: entranceMarkerIcon,
  length: lengthIcon,
  location: locationIcon,
  massif: massifIcon,
  network: networkIcon,
  organization: organizationIcon,
  temperature: temperatureIcon,
  time_to_go: timeToGoIcon,
  underground_time: undergroundTimeIcon
};

const CustomIcon = ({ type, size = 35 }) => (
  <Icon size={size}>
    <Img src={iconSources[type]} alt={type} height={size} width={size} />
  </Icon>
);

CustomIcon.propTypes = {
  type: PropTypes.oneOf(Object.keys(iconSources)).isRequired,
  size: PropTypes.number
};

export default CustomIcon;
