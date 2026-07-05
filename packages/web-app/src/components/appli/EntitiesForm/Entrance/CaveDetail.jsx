import { Alert, Box, InputAdornment, Link, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { FormRow, FormSection } from '../utils/FormContainers';
import BoolToggleChip from '../utils/BoolToggleChip';

const CaveDetail = ({
  control,
  errors,
  isReadonly = false,
  isShared = false,
  caveId
}) => {
  const { formatMessage } = useIntl();

  const validateTemperature = value => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue) || !Number.isInteger(numberValue)) {
      return formatMessage({ id: 'Temperature must be an integer (in °C)' });
    }
    if (numberValue > 100 || numberValue < -100) {
      return formatMessage({
        id: 'Temperature must be between -100 and 100 °C'
      });
    }
    return true;
  };
  const validateDistance = value => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue) || !Number.isInteger(numberValue)) {
      return formatMessage({ id: 'Distance must be an integer (in m)' });
    }
    if (numberValue < 0) {
      return formatMessage({ id: 'Distance must be superior or equal to 0' });
    }
    return true;
  };

  return (
    <FormSection title="Characteristics">
      {isShared && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {formatMessage({
            id: 'These characteristics belong to the cave and are shared by all its entrances.'
          })}
          {caveId ? (
            <>
              {' '}
              <Link component={RouterLink} to={`/ui/caves/${caveId}`}>
                {formatMessage({ id: 'View the cave' })}
              </Link>
            </>
          ) : null}
        </Alert>
      )}
      <FormRow>
        <Controller
          name="cave.depth"
          control={control}
          rules={{ valueAsNumber: true, validate: validateDistance }}
          render={({ field: { ref, value, onChange } }) => (
            <TextField
              disabled={isReadonly}
              label={formatMessage({ id: 'Depth' })}
              type="number"
              error={!!errors.cave?.depth}
              inputRef={ref}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">m</InputAdornment>
                )
              }}
              helperText={errors.cave?.depth?.message}
              value={value ?? ''}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="cave.length"
          control={control}
          rules={{ valueAsNumber: true, validate: validateDistance }}
          render={({ field: { ref, value, onChange } }) => (
            <TextField
              disabled={isReadonly}
              label={formatMessage({ id: 'Development' })}
              type="number"
              error={!!errors.cave?.length}
              inputRef={ref}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">m</InputAdornment>
                )
              }}
              helperText={errors.cave?.length?.message}
              value={value ?? ''}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="cave.temperature"
          control={control}
          rules={{
            valueAsNumber: true,
            validate: validateTemperature
          }}
          render={({ field: { ref, value, onChange } }) => (
            <TextField
              disabled={isReadonly}
              label={formatMessage({ id: 'Temperature' })}
              type="number"
              error={!!errors.cave?.temperature}
              inputRef={ref}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">°C</InputAdornment>
                )
              }}
              helperText={errors.cave?.temperature?.message}
              value={value ?? ''}
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {/* Diving belongs to the cave (locked when shared); touristic site is
            an entrance-level attribute (always editable). */}
        <BoolToggleChip
          name="cave.isDiving"
          label="Diving cave"
          icon="diving_cave"
          control={control}
          disabled={isReadonly}
        />
        <BoolToggleChip
          name="entrance.isTouristic"
          label="Touristic site"
          icon="touristic"
          control={control}
        />
      </Box>
    </FormSection>
  );
};

CaveDetail.propTypes = {
  errors: PropTypes.shape({
    cave: PropTypes.shape({
      depth: PropTypes.shape({ message: PropTypes.string }),
      length: PropTypes.shape({ message: PropTypes.string }),
      temperature: PropTypes.shape({ message: PropTypes.string })
    }),
    entrance: PropTypes.shape({
      yearDiscovery: PropTypes.shape({ message: PropTypes.string })
    })
  }),
  control: PropTypes.shape({}),
  isReadonly: PropTypes.bool,
  isShared: PropTypes.bool,
  caveId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default CaveDetail;
