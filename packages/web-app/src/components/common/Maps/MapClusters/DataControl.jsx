import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { useIntl } from 'react-intl';
import { useFullScreen } from 'react-browser-hooks';

import CustomControl, { customControlProps } from '../common/CustomControl';
import { CAVE_SIZE_STYLE } from './constants';

export const heatmapTypes = {
  ENTRANCES: 'entrances',
  NETWORKS: 'networks',
  NONE: 'none'
};
export const markerTypes = {
  ORGANIZATIONS: 'organizations'
};

const ToggleLink = styled('a')`
  background-image: none !important;
  display: flex !important;
  align-items: center;
  justify-content: center;

  .leaflet-control-layers-expanded & {
    display: none !important;
  }
`;

const SectionTitle = styled('div')`
  font-weight: bold;
  font-size: 12px;
  padding: 4px 0 2px;
  color: #333;

  &:not(:first-of-type) {
    margin-top: 6px;
  }
`;

const OptionLabel = styled('label')`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  cursor: pointer;
  padding: 2px 0;
  white-space: nowrap;
`;

const CaveSizeDot = ({ caveSize }) => {
  const { radius, fillColor, color, weight } = CAVE_SIZE_STYLE[caveSize];
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      style={{ flexShrink: 0, marginRight: 4 }}>
      <circle
        cx="16"
        cy="16"
        r={radius}
        fill={fillColor}
        stroke={color}
        strokeWidth={weight}
      />
    </svg>
  );
};

CaveSizeDot.propTypes = {
  caveSize: PropTypes.string.isRequired
};

const MARKER_ICON = {
  [heatmapTypes.ENTRANCES]: '/images/iconsV3/entry.svg',
  [heatmapTypes.NETWORKS]: '/images/iconsV3/cave_system.svg',
  [markerTypes.ORGANIZATIONS]: '/images/club.svg'
};

const MarkerIcon = ({ type }) => {
  const src = MARKER_ICON[type];
  if (src) {
    return (
      <img
        src={src}
        alt=""
        height="22"
        style={{ flexShrink: 0, marginRight: 4 }}
      />
    );
  }
  if (type === heatmapTypes.NONE) {
    return (
      <LayersClearIcon
        sx={{ fontSize: 20, flexShrink: 0, mr: '4px', color: '#777' }}
      />
    );
  }
  return null;
};

MarkerIcon.propTypes = {
  type: PropTypes.string.isRequired
};

const DataControl = ({
  updateHeatmap,
  selectedMarkers,
  setSelectedMarkers,
  entranceFilters,
  activeEntranceFilters,
  setActiveEntranceFilters,
  ...props
}) => {
  const { fullScreen } = useFullScreen();
  const { formatMessage } = useIntl();
  const wrapperRef = useRef(null);
  const [selectedHeat, setSelectedHeat] = useState(heatmapTypes.ENTRANCES);

  const toggleExpanded = useCallback(expanded => {
    const container = wrapperRef.current?.closest('.leaflet-control-layers');
    if (container) {
      container.classList.toggle('leaflet-control-layers-expanded', expanded);
    }
  }, []);

  // Remove expanded class on unmount
  useEffect(() => {
    return () => toggleExpanded(false);
  }, [toggleExpanded]);

  // Close panel when touching outside on mobile
  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        toggleExpanded(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () =>
      document.removeEventListener('pointerdown', handleClickOutside);
  }, [toggleExpanded]);

  const handleHeatChange = value => {
    setSelectedHeat(value);
  };

  const handleMarkerChange = type => {
    setSelectedMarkers(prev => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    updateHeatmap(selectedHeat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHeat]);

  const filtersDisabled = selectedHeat !== heatmapTypes.ENTRANCES;

  return (
    <CustomControl
      {...props}
      containerClassName="leaflet-control-layers leaflet-control">
      <div
        ref={wrapperRef}
        onMouseEnter={() => !fullScreen && toggleExpanded(true)}
        onMouseLeave={() => toggleExpanded(false)}>
        <ToggleLink
          className="leaflet-control-layers-toggle"
          role="button"
          tabIndex={0}
          title={formatMessage({ id: 'data-control' })}
          aria-label={formatMessage({ id: 'data-control' })}
          onClick={() => !fullScreen && toggleExpanded(true)}
          onKeyDown={e =>
            e.key === 'Enter' && !fullScreen && toggleExpanded(true)
          }
          style={{
            cursor: fullScreen ? 'default' : 'pointer',
            opacity: fullScreen ? 0.5 : 1,
            pointerEvents: fullScreen ? 'none' : 'auto'
          }}>
          <VisibilityIcon htmlColor="#333" />
        </ToggleLink>

        <section className="leaflet-control-layers-list">
          <div className="leaflet-control-layers-overlays">
            <SectionTitle>
              {formatMessage({ id: 'heat map' }).toUpperCase()}
            </SectionTitle>
            {Object.values(heatmapTypes).map(type => (
              <OptionLabel key={type}>
                <input
                  type="radio"
                  name="heatmap"
                  value={type}
                  checked={selectedHeat === type}
                  onChange={() => handleHeatChange(type)}
                />
                <MarkerIcon type={type} />
                <span>{formatMessage({ id: type })}</span>
              </OptionLabel>
            ))}

            <SectionTitle>
              {formatMessage({ id: 'markers' }).toUpperCase()}
            </SectionTitle>
            <OptionLabel>
              <input
                type="checkbox"
                name={markerTypes.ORGANIZATIONS}
                checked={selectedMarkers[markerTypes.ORGANIZATIONS]}
                onChange={() => handleMarkerChange(markerTypes.ORGANIZATIONS)}
              />
              <MarkerIcon type={markerTypes.ORGANIZATIONS} />
              <span>{formatMessage({ id: markerTypes.ORGANIZATIONS })}</span>
            </OptionLabel>
            {entranceFilters.map(filter => (
              <OptionLabel
                key={filter.id}
                style={{
                  opacity: filtersDisabled ? 0.4 : 1,
                  cursor: filtersDisabled ? 'not-allowed' : 'pointer'
                }}>
                <input
                  type="checkbox"
                  name={filter.id}
                  checked={activeEntranceFilters[filter.id] ?? false}
                  disabled={filtersDisabled}
                  onChange={() =>
                    setActiveEntranceFilters(prev => ({
                      ...prev,
                      [filter.id]: !prev[filter.id]
                    }))
                  }
                />
                <CaveSizeDot caveSize={filter.id} />
                <span>{filter.label}</span>
              </OptionLabel>
            ))}
          </div>
        </section>
      </div>
    </CustomControl>
  );
};

const MemoizedDataControl = React.memo(DataControl);

DataControl.propTypes = {
  updateHeatmap: PropTypes.func.isRequired,
  selectedMarkers: PropTypes.objectOf(PropTypes.bool).isRequired,
  setSelectedMarkers: PropTypes.func.isRequired,
  entranceFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  activeEntranceFilters: PropTypes.objectOf(PropTypes.bool).isRequired,
  setActiveEntranceFilters: PropTypes.func.isRequired,
  ...customControlProps
};

MemoizedDataControl.propTypes = DataControl.propTypes;

export default MemoizedDataControl;
