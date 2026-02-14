import React, { useRef, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import {
  ThemeProvider,
  StyledEngineProvider
} from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import grottoTheme from '../../../../../conf/grottoTheme';

export const MarkerGlobalCss = (
  <GlobalStyles
    styles={`
      .leaflet-container {
        font-size: 1rem;
      }
    `}
  />
);

const useMarkers = ({
  icon,
  popupContent = null,
  tooltipContent = null,
  shouldFitMapBound = false
}) => {
  const map = useMap();
  const canvasRef = useRef(L.canvas());
  // Map<id, L.Marker> for O(1) lookups during diff
  const markersRef = useRef(new Map());
  const { locale, messages } = useSelector(state => state.intl);

  const createLeafletMarker = useCallback(
    marker => {
      const { latitude, longitude } = marker;
      const options = { icon, renderer: canvasRef.current };
      const markerEl = L.marker([latitude, longitude], options);

      if (popupContent) {
        markerEl.bindPopup(
          renderToString(
            // Without theme provider the CSS doesn't work properly
            // It's makes the map slower when there is a lot of markers
            // One way to optimize it would be to not use MUI for the markers
            <IntlProvider locale={locale} messages={messages[locale]}>
              <StaticRouter location="/">
                <StyledEngineProvider injectFirst>
                  <ThemeProvider theme={grottoTheme}>
                    {popupContent(marker)}
                  </ThemeProvider>
                </StyledEngineProvider>
              </StaticRouter>
            </IntlProvider>
          )
        );
      }

      if (tooltipContent) {
        markerEl.bindTooltip(`${tooltipContent(marker)}`, {});
      }

      return markerEl;
    },
    [icon, popupContent, tooltipContent, locale, messages]
  );

  const updateMarkers = useCallback(
    newMarkers => {
      const currentMap = markersRef.current;

      if (!newMarkers || newMarkers.length === 0) {
        // Remove all markers
        for (const m of currentMap.values()) m.remove();
        currentMap.clear();
        return;
      }

      const newIds = new Set(newMarkers.map(m => m.id));

      // Remove markers no longer present
      for (const [id, leafletMarker] of currentMap) {
        if (!newIds.has(id)) {
          leafletMarker.remove();
          currentMap.delete(id);
        }
      }

      // Add markers that are new
      const addedMarkers = [];
      for (const marker of newMarkers) {
        if (!currentMap.has(marker.id)) {
          const leafletMarker = createLeafletMarker(marker);
          leafletMarker.addTo(map);
          currentMap.set(marker.id, leafletMarker);
          addedMarkers.push(leafletMarker);
        }
      }

      // Fit bounds on initial load if requested
      if (shouldFitMapBound && currentMap.size > 0 && addedMarkers.length === currentMap.size) {
        map.fitBounds(
          Array.from(currentMap.values()).map(m => m.getLatLng()),
          { padding: [40, 40], maxZoom: 16 }
        );
      }
    },
    [map, createLeafletMarker, shouldFitMapBound]
  );

  return updateMarkers;
};

export default useMarkers;
