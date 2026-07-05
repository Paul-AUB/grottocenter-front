import {
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { usePermissions, useNearbyEntrances } from '../../../../hooks';
import { ENTRANCE_ONLY, ENTRANCE_AND_CAVE } from './caveType';
import Alert from '../../../common/Alert';
import CoordinateFormSection from '../utils/CoordinateFormSection';
import { FormRow, FormSection } from '../utils/FormContainers';

const EntranceDetail = ({
  control,
  errors,
  getValues,
  isNewEntrance = false
}) => {
  const permissions = usePermissions();
  const { formatMessage } = useIntl();

  // Informational only: show existing entrances near the entered coordinates
  // so the user can spot a duplicate before creating one (creation mode only).
  // The map reports its zoom so the hint can be hidden when zoomed out too far.
  const latitude = useWatch({ control, name: 'entrance.latitude' });
  const longitude = useWatch({ control, name: 'entrance.longitude' });
  const [mapZoom, setMapZoom] = useState(null);
  const nearbyEntrances = useNearbyEntrances(
    latitude,
    longitude,
    isNewEntrance,
    mapZoom
  );

  /* useRef to track initial value.
  User can't unmark an entrance. So we need to remember the entrance was not sensitive initially
  to allow the user to mark and unmark it freely before submitting the form
  */
  const values = getValues();
  const initialIsSensitive = useRef(values.entrance.isSensitive).current;

  const isSensitiveDisabled = !permissions.isAdmin && initialIsSensitive;
  const isSensitive = useWatch({ control, name: 'entrance.isSensitive' });

  return (
    <FormSection title="Location">
      <Controller
        name="entrance.isSensitive"
        control={control}
        defaultValue={false}
        render={({ field: { ref, value, onChange } }) => (
          <FormControlLabel
            control={
              <Switch
                inputRef={ref}
                disabled={isSensitiveDisabled}
                checked={value}
                onChange={e => onChange(e.target.checked)}
              />
            }
            label={formatMessage({ id: 'Restricted access entrance' })}
          />
        )}
      />
      {(isSensitive || isSensitiveDisabled) && (
        <Alert
          disableMargins
          severity={isSensitiveDisabled ? 'info' : 'warning'}
          content={formatMessage({
            id: isSensitiveDisabled
              ? "You can't unrestrict a cave access."
              : 'To be used for a cave requiring special protection. For more details see the User Guide. When a cave access is marked as "restricted", location of the entrance will no longer be available to Grottocenter users and visitors.'
          })}
        />
      )}

      {!isSensitiveDisabled && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}>
          {formatMessage({
            id: 'Search or click on the map to position the entrance'
          })}
        </Typography>
      )}
      {!isSensitiveDisabled && (
        <CoordinateFormSection
          control={control}
          formLatitudeKey="entrance.latitude"
          formLongitudeKey="entrance.longitude"
          required
          latitudeError={errors?.entrance?.latitude?.message}
          longitudeError={errors?.entrance?.longitude?.message}
          additionalPositions={nearbyEntrances}
          additionalMarkersLabel={formatMessage({
            id: 'Existing nearby entrances'
          })}
          onZoomChange={setMapZoom}
        />
      )}
      <FormRow>
        <Controller
          name="entrance.altitude"
          control={control}
          rules={{ valueAsNumber: true }}
          render={({ field: { ref, value, onChange } }) => (
            <TextField
              fullWidth
              label={formatMessage({ id: 'Altitude' })}
              type="number"
              error={!!errors.entrance?.altitude}
              inputRef={ref}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>
              }}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="entrance.yearDiscovery"
          control={control}
          rules={{ valueAsNumber: true }}
          render={({ field: { ref, value, onChange } }) => (
            <TextField
              fullWidth
              label={formatMessage({ id: 'Year of discovery' })}
              type="number"
              error={!!errors.entrance?.yearDiscovery}
              inputRef={ref}
              InputProps={{
                inputProps: { max: new Date().getFullYear() }
              }}
              value={value ?? ''}
              onChange={onChange}
            />
          )}
        />
      </FormRow>
    </FormSection>
  );
};

EntranceDetail.propTypes = {
  errors: PropTypes.shape({
    entrance: PropTypes.shape({
      isSensitive: PropTypes.shape({ message: PropTypes.string }),
      latitude: PropTypes.shape({ message: PropTypes.string }),
      longitude: PropTypes.shape({ message: PropTypes.string }),
      language: PropTypes.shape({ message: PropTypes.string }),
      name: PropTypes.shape({ message: PropTypes.string }),
      altitude: PropTypes.shape({ message: PropTypes.number }),
      yearDiscovery: PropTypes.shape({ message: PropTypes.number })
    })
  }),
  control: PropTypes.shape({}),
  getValues: PropTypes.func.isRequired, // React-hook-form getValues() function
  isNewEntrance: PropTypes.bool,
  allLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      refName: PropTypes.string.isRequired
    })
  ),
  setFocus: PropTypes.func,
  entityType: PropTypes.oneOf([ENTRANCE_AND_CAVE, ENTRANCE_ONLY])
};

export default EntranceDetail;
