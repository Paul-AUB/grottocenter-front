import React, { useState, useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { styled } from '@mui/material/styles';
import { TextField, Paper, List, ListItem, ListItemText, CircularProgress, InputAdornment } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
  NOMINATIM_API_URL,
  AUTOCOMPLETE_DEBOUNCE_DELAY,
  AUTOCOMPLETE_MIN_CHARACTERS,
  ADVANCED_SEARCH_TYPES
} from '../../../../conf/config';
import { advancedSearchUrl } from '../../../../conf/apiRoutes';
import CustomIcon from '../../CustomIcon';

const SearchContainer = styled(Paper)`
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 1000;
  padding: 4px;
  min-width: 250px;
  /* Let some space for the eye button and prevent overflow on small screens */
  max-width: calc(100% - 115px);

  /* Increase width on desktop to fit full placeholder text */
  @media (min-width: 1024px) {
    min-width: 350px;
    max-width: calc(100% - 115px);
  }

  .MuiTextField-root {
    .MuiInputBase-root {
      height: 32px;
      input {
        padding: 0 10px;
      }
    }
  }
`;

const ResultsList = styled(List)`
  max-height: 200px;
  overflow-y: auto;
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer !important;
  padding: 0 14px;
  margin: 0;
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const ADDRESS_TYPE_PRIORITY = {
  house: 1, building: 2, amenity: 3, tourism: 4, leisure: 5,
  road: 6, highway: 7, hamlet: 8, village: 9,
  suburb: 10, neighbourhood: 11, quarter: 12,
  town: 13, city: 14, municipality: 15,
  county: 16, district: 17,
  state: 18, province: 19, region: 20,
  country: 21, continent: 22
};

const GeocodingControl = ({ onLocationSelect }) => {
  const map = useMap();
  const { formatMessage, locale } = useIntl();
  const [query, setQuery] = useState('');
  const [locationResults, setLocationResults] = useState([]);
  const [entranceResults, setEntranceResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEntrance, setSelectedEntrance] = useState(null);

  const hasResults = locationResults.length > 0 || entranceResults.length > 0;

  useEffect(() => {
    if (!hasResults) return undefined;

    const container = map.getContainer();

    // Prevent map interactions when scrolling/touching the results list
    const handleEvent = e => {
      if (e.target.closest('.results-list')) {
        e.stopPropagation();
      }
    };

    container.addEventListener('wheel', handleEvent, { capture: true });
    container.addEventListener('touchstart', handleEvent, { capture: true, passive: true });
    container.addEventListener('touchmove', handleEvent, { capture: true, passive: true });

    return () => {
      container.removeEventListener('wheel', handleEvent, { capture: true });
      container.removeEventListener('touchstart', handleEvent, { capture: true });
      container.removeEventListener('touchmove', handleEvent, { capture: true });
    };
  }, [map, hasResults]);

  // Open popup on the entrance marker once it appears on the map
  useEffect(() => {
    if (!selectedEntrance) return undefined;

    const { lat, lng } = selectedEntrance;

    const isTargetMarker = layer =>
      layer instanceof L.Marker &&
      Math.abs(layer.getLatLng().lat - lat) < 0.001 &&
      Math.abs(layer.getLatLng().lng - lng) < 0.001;

    // Check markers already on the map
    let found = false;
    map.eachLayer(layer => {
      if (!found && isTargetMarker(layer)) {
        layer.openPopup();
        found = true;
      }
    });
    if (found) {
      setSelectedEntrance(null);
      return undefined;
    }

    // Otherwise listen for new layers being added
    const onLayerAdd = e => {
      if (isTargetMarker(e.layer)) {
        e.layer.openPopup();
        setSelectedEntrance(null);
        map.off('layeradd', onLayerAdd);
      }
    };
    map.on('layeradd', onLayerAdd);

    // Safety timeout to stop listening after 5s
    const timeout = setTimeout(() => {
      map.off('layeradd', onLayerAdd);
      setSelectedEntrance(null);
    }, 5000);

    return () => {
      map.off('layeradd', onLayerAdd);
      clearTimeout(timeout);
    };
  }, [selectedEntrance, map]);

  useEffect(() => {
    if (query.length < AUTOCOMPLETE_MIN_CHARACTERS) {
      setLocationResults([]);
      setEntranceResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const bounds = map.getBounds();
        const viewbox = `${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()},${bounds.getSouth()}`;

        // Parallel API calls
        const [locationData, entranceData] = await Promise.all([
          fetch(
            `${NOMINATIM_API_URL}?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=${locale}&viewbox=${viewbox}`
          )
            .then(res => res.json())
            .catch(error => {
              console.error('Failed to fetch location data:', error);
              return [];
            }),
          fetch(advancedSearchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query,
              entity: ADVANCED_SEARCH_TYPES.ENTRANCES,
              matchAllFields: false,
              page: 0,
              size: 5
            })
          })
            .then(res => res.json())
            .then(data => data.results || [])
            .catch(error => {
              console.error('Failed to fetch entrance data:', error);
              return [];
            })
        ]);

        const sortedLocations = locationData.sort((a, b) =>
            (ADDRESS_TYPE_PRIORITY[a.addresstype] || 99) - (ADDRESS_TYPE_PRIORITY[b.addresstype] || 99)
        );

        setLocationResults(sortedLocations);
        setEntranceResults(entranceData);
      } catch (error) {
        console.error('Search error:', error);
        setLocationResults([]);
        setEntranceResults([]);
      } finally {
        setLoading(false);
      }
    }, AUTOCOMPLETE_DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [query, locale, map]);

  const handleSelect = result => {
    setQuery('');
    setLocationResults([]);
    setEntranceResults([]);

    if (result.resultType === 'entrance') {
      // For entrances: zoom to focused view and store selection for popup opening
      const lat = result.latitude;
      const lng = result.longitude;

      // Store the selected entrance for popup opening via layeradd listener
      setSelectedEntrance({ lat, lng });

      if (onLocationSelect) {
        onLocationSelect({ lat, lng });
      }

      setTimeout(() => {
        const targetZoom = 16;

        // setView triggers moveend/zoomend natively which MapClusters listens to.
        // When zoom doesn't change, force a dragend so markers reload for the new bounds.
        const needsDragEnd = map.getZoom() === targetZoom;
        map.setView([lat, lng], targetZoom);
        if (needsDragEnd) {
          map.fire('dragend');
        }
      }, 150);
    } else {
      // For locations: use existing bounding box logic
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);

      if (onLocationSelect) {
        onLocationSelect({ lat, lng });
      }

      setTimeout(() => {
        if (result.boundingbox) {
          const [south, north, west, east] = result.boundingbox.map(parseFloat);
          map.fitBounds([[south, west], [north, east]]);
        } else {
          map.setView([lat, lng], map.getZoom());
        }
      }, 100);
    }
  };

  const allResults = useMemo(() => [
    ...entranceResults
      // Explicitly filter out entrances without coordinates to avoid showing results that can't be displayed on the map
      .filter(e => e.latitude != null && e.longitude != null)
      .map(e => ({ ...e, resultType: 'entrance' })),
    ...locationResults.map(l => ({ ...l, resultType: 'location' }))
  ], [entranceResults, locationResults]);

  return (
    <SearchContainer elevation={3}>
      <TextField
        size="small"
        fullWidth
        placeholder={formatMessage({ id: 'Search location or entrance...' })}
        value={query}
        onChange={e => setQuery(e.target.value)}
        slotProps={{
          input: {
            endAdornment: loading && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            )
          }
        }}
      />
      {allResults.length > 0 && (
        <ResultsList className="results-list">
          {allResults.map(result => {
            if (result.resultType === 'entrance') {
              return (
                <StyledListItem
                  key={`entrance-${result.id}`}
                  onClick={() => handleSelect(result)}>
                  <CustomIcon type="entry" size={20} />
                  <ListItemText
                    primary={result.name}
                    secondary={`Entrance • ${[result.city, result.region].filter(Boolean).join(', ')}`}
                  />
                </StyledListItem>
              );
            } else {
              return (
                <StyledListItem
                  key={result.place_id}
                  onClick={() => handleSelect(result)}>
                  <LocationOn fontSize="small" color="action" />
                  <ListItemText
                    primary={result.display_name}
                    secondary={formatMessage({ id: `addresstype.${result.addresstype}`, defaultMessage: result.addresstype })}
                  />
                </StyledListItem>
              );
            }
          })}
        </ResultsList>
      )}
    </SearchContainer>
  );
};

GeocodingControl.propTypes = {
  onLocationSelect: PropTypes.func
};

export default GeocodingControl;
