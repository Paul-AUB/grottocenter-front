import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Translate from '../../../common/Translate';
import { FormSection } from '../utils/FormContainers';
import BoolToggleChip from '../utils/BoolToggleChip';
import { ENTRANCE_BOOLEAN_CHARACTERISTICS } from '../../../../conf/entranceCharacteristics';

// Boolean entrance attributes (hazards + touristic site) rendered as a single
// wrapping group of icon toggle chips. Selected = the attribute applies.
const EntranceAttributes = ({ control }) => (
  <FormSection title="Attributes & hazards">
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ mb: 1.5, display: 'block' }}>
      <Translate>Select the attributes that apply to this entrance</Translate>
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {ENTRANCE_BOOLEAN_CHARACTERISTICS.map(({ field, label, icon }) => (
        <BoolToggleChip
          key={field}
          name={`entrance.${field}`}
          label={label}
          icon={icon}
          control={control}
        />
      ))}
    </Box>
  </FormSection>
);

EntranceAttributes.propTypes = {
  control: PropTypes.shape({})
};

export default EntranceAttributes;
