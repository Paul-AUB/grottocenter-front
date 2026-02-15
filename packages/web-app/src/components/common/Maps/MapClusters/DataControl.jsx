import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useIntl } from 'react-intl';
import { useFullScreen } from 'react-browser-hooks';
import { includes, without } from 'ramda';
import CustomControl, { customControlProps } from '../common/CustomControl';

export const heatmapTypes = {
  ENTRANCES: 'entrances',
  NETWORKS: 'networks',
  NONE: 'none'
};
const markerTypes = {
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

const DataControl = ({ updateHeatmap, updateMarkers, ...props }) => {
  const { fullScreen } = useFullScreen();
  const { formatMessage } = useIntl();
  const wrapperRef = useRef(null);
  const [selectedHeat, setSelectedHeat] = useState(heatmapTypes.ENTRANCES);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  const toggleExpanded = useCallback((expanded) => {
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
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [toggleExpanded]);

  const handleHeatChange = value => {
    setSelectedHeat(value);
  };

  const handleMarkerToggle = value => {
    setSelectedMarkers(prev =>
      includes(value, prev) ? without(value, prev) : [...prev, value]
    );
  };

  useEffect(() => {
    updateHeatmap(selectedHeat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHeat]);
  useEffect(() => {
    updateMarkers(selectedMarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarkers]);

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
          onKeyDown={e => e.key === 'Enter' && !fullScreen && toggleExpanded(true)}
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
                checked={includes(markerTypes.ORGANIZATIONS, selectedMarkers)}
                onChange={() => handleMarkerToggle(markerTypes.ORGANIZATIONS)}
              />
              <span>{formatMessage({ id: markerTypes.ORGANIZATIONS })}</span>
            </OptionLabel>
          </div>
        </section>
      </div>
    </CustomControl>
  );
};

const MemoizedDataControl = React.memo(DataControl);

DataControl.propTypes = {
  updateHeatmap: PropTypes.func.isRequired,
  updateMarkers: PropTypes.func.isRequired,
  ...customControlProps
};

MemoizedDataControl.propTypes = DataControl.propTypes;

export default MemoizedDataControl;
