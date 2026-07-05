import {
  FormControl as MuiFormControl,
  RadioGroup,
  FormControlLabel,
  Box,
  Radio
} from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useController } from 'react-hook-form';
import CaveSelection from './CaveSelect';
import { ENTRANCE_ONLY, ENTRANCE_AND_CAVE } from './caveType';

import Alert from '../../../common/Alert';
import { FormRow, FormSection } from '../utils/FormContainers';
import InputLanguage from '../utils/InputLanguage';
import InputText from '../utils/InputText';
import NameSuggestionDropdown from './NameSuggestionDropdown';
import NetworkMembershipSection from './NetworkMembershipSection';

const FormControl = styled(MuiFormControl)`
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

const EditTypeSelection = ({
  control,
  errors,
  entityType,
  updateEntityType,
  entranceId,
  reset,
  networkSize,
  isNewEntrance = false
}) => {
  const { formatMessage } = useIntl();

  const {
    field: { onChange: onNameChange }
  } = useController({
    control,
    name: 'entrance.name',
    rules: { required: true }
  });

  return (
    <>
      {isNewEntrance && (
        <FormSection title="The entrance is:">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label={formatMessage({ id: 'The entrance is:' })}
              name="entityType"
              value={entityType}
              onChange={event => {
                updateEntityType(event.target.value);
                reset();
              }}
            >
              <FormControlLabel
                value={ENTRANCE_AND_CAVE}
                control={<Radio />}
                label={formatMessage({
                  id: 'The first entrance of a new cave (on Grottocenter)'
                })}
              />
              <FormControlLabel
                value={ENTRANCE_ONLY}
                control={<Radio />}
                label={formatMessage({
                  id: 'Linked to an existing entrance or network'
                })}
              />
            </RadioGroup>
          </FormControl>
          {entityType === ENTRANCE_ONLY && (
            <>
              <CaveSelection control={control} errors={errors} />
              {errors?.caveName && (
                <Alert severity="error" content={errors.caveName} />
              )}
            </>
          )}
        </FormSection>
      )}

      <FormSection>
        {entityType === ENTRANCE_AND_CAVE ? (
          <FormRow>
            <Box sx={{ flex: { xs: '1 1 100%', sm: 2 }, minWidth: 0 }}>
              <NameSuggestionDropdown
                control={control}
                formKey="cave.name"
                enabled={isNewEntrance}
              >
                <InputText
                  formKey="cave.name"
                  labelName="Entrance name (which is also the cave name)"
                  control={control}
                  isError={!!errors?.cave?.name}
                  isRequired
                  onChangeAdditionalFn={onNameChange}
                />
              </NameSuggestionDropdown>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: 1 }, minWidth: 0 }}>
              <InputLanguage
                formKey="cave.language"
                labelName="Cave name language"
                control={control}
                isError={!!errors?.cave?.language}
              />
            </Box>
          </FormRow>
        ) : (
          <FormRow>
            <Box sx={{ flex: { xs: '1 1 100%', sm: 2 }, minWidth: 0 }}>
              <NameSuggestionDropdown
                control={control}
                formKey="entrance.name"
                enabled={isNewEntrance}
              >
                <InputText
                  formKey="entrance.name"
                  labelName="Entrance name"
                  control={control}
                  isError={!!errors?.entrance?.name}
                  isRequired
                />
              </NameSuggestionDropdown>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: 1 }, minWidth: 0 }}>
              <InputLanguage
                formKey="entrance.language"
                labelName="Entrance name language"
                control={control}
                isError={!!errors?.entrance?.language}
              />
            </Box>
          </FormRow>
        )}
      </FormSection>

      {!isNewEntrance && (
        <NetworkMembershipSection
          entranceId={entranceId}
          isNetwork={entityType === ENTRANCE_ONLY}
          networkSize={networkSize}
        />
      )}
    </>
  );
};

EditTypeSelection.propTypes = {
  control: PropTypes.shape({}),
  errors: PropTypes.shape({
    cave: PropTypes.shape({
      name: PropTypes.string,
      language: PropTypes.string
    }),
    entrance: PropTypes.shape({
      name: PropTypes.string,
      language: PropTypes.string
    }),
    caveName: PropTypes.string
  }),
  entityType: PropTypes.oneOf([ENTRANCE_ONLY, ENTRANCE_AND_CAVE]),
  updateEntityType: PropTypes.func,
  entranceId: PropTypes.number,
  networkSize: PropTypes.number,
  reset: PropTypes.func,
  isNewEntrance: PropTypes.bool
};

export default EditTypeSelection;
