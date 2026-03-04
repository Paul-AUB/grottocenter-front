import React, { useEffect, useRef, Suspense } from 'react';
import { includes } from 'ramda';
import { useNavigate, generatePath, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../components/common/PageLoader';

import {
  changeLocation,
  changeZoom,
  fetchNetworks,
  fetchNetworksCoordinates,
  fetchOrganizations,
  fetchEntrances,
  fetchEntrancesCoordinates
} from '../actions/Map';
import { fetchProjections } from '../actions/Projections';
import useGeolocation from '../hooks/useGeolocation';
import 'leaflet/dist/leaflet.css';
import { defaultZoom, defaultCoord, focusZoom } from '../conf/config';

const MapClusters = React.lazy(
  () => import('../components/common/Maps/MapClusters')
);

const encodeMapTarget = (center, zoom) => `${center.lat},${center.lng},${zoom}`;

function decodeMapTarget(target) {
  if (!target) return null;
  const [lat, lng, zoom] = target.split(',');
  if (!lat || !lng || !zoom) return null;

  return {
    lng: parseFloat(lng),
    lat: parseFloat(lat),
    zoom: parseInt(zoom, 10)
  };
}

const Map = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { location: geoLocation, hasLocation } = useGeolocation();
  const mapRef = useRef(null);
  const location = useSelector(state => state.map.location);
  const zoom = useSelector(state => state.map.zoom);
  const networks = useSelector(state => state.map.networks);
  const networksCoordinates = useSelector(
    state => state.map.networksCoordinates
  );
  const organizations = useSelector(state => state.map.organizations);
  const entrances = useSelector(state => state.map.entrances);
  const entrancesCoordinates = useSelector(
    state => state.map.entrancesCoordinates
  );
  const { open } = useSelector(state => state.sideMenu);
  const { projections } = useSelector(state => state.projections);

  // urlDebounceRef: update the URL only once the user has truly settled,
  // avoiding lagging due to URL updates.
  // Leaflet always handles the visual movement immediately on its own.
  const urlDebounceRef = useRef(null);

  const handleUpdate = ({ heat, markers, zoom: newZoom, center, bounds }) => {
    const criteria = {
      /* eslint-disable no-underscore-dangle */
      sw_lat: bounds._southWest.wrap().lat,
      sw_lng: bounds._southWest.wrap().lng,
      ne_lat: bounds._northEast.wrap().lat,
      ne_lng: bounds._northEast.wrap().lng,
      /* eslint-enable no-underscore-dangle */
      zoom: newZoom
    };
    if (includes('organizations', markers)) {
      dispatch(fetchOrganizations(criteria));
    }
    if (includes('networks', markers)) {
      dispatch(fetchNetworks(criteria));
    }
    if (includes('entrances', markers)) {
      dispatch(fetchEntrances(criteria));
    }
    if (heat === 'networks') {
      dispatch(fetchNetworksCoordinates(criteria));
    }
    if (heat === 'entrances') {
      dispatch(fetchEntrancesCoordinates(criteria));
    }

    // Update the shareable URL after the user has settled
    if (urlDebounceRef.current) clearTimeout(urlDebounceRef.current);
    urlDebounceRef.current = setTimeout(() => {
      urlDebounceRef.current = null;
      navigate(
        generatePath('/ui/map/:target', {
          target: encodeMapTarget(center, newZoom)
        }),
        { replace: true }
      );
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (urlDebounceRef.current) clearTimeout(urlDebounceRef.current);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProjections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Capture the URL target present when the component first mounts.
  // The initial position only needs to be set once; after that Leaflet owns its position.
  const initialTargetRef = useRef(params.target);

  useEffect(() => {
    const target = decodeMapTarget(initialTargetRef.current);
    if (target) {
      dispatch(changeLocation({ lat: target.lat, lng: target.lng }));
      dispatch(changeZoom(target.zoom));
    } else {
      dispatch(changeLocation(geoLocation));
      dispatch(changeZoom(defaultZoom));
    }
  }, [dispatch, geoLocation]);

  useEffect(() => {
    const target = decodeMapTarget(params.target);
    const isDefaultTarget =
      target?.lat === defaultCoord.lat &&
      target?.lng === defaultCoord.lng &&
      target?.zoom === defaultZoom;

    if (hasLocation && (!params.target || isDefaultTarget) && mapRef.current) {
      mapRef.current.setView([geoLocation.lat, geoLocation.lng], focusZoom);
    }
  }, [hasLocation, geoLocation, params.target]);

  return (
    <Suspense fallback={<PageLoader />}>
      <MapClusters
        center={[location.lat, location.lng]}
        zoom={zoom}
        entrances={entrancesCoordinates}
        entranceMarkers={entrances}
        networks={networksCoordinates}
        networkMarkers={networks}
        organizations={organizations}
        onUpdate={handleUpdate}
        isSideMenuOpen={open}
        projectionsList={projections}
        mapRef={mapRef}
      />
    </Suspense>
  );
};

Map.propTypes = {};

export default Map;
