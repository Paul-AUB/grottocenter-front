import { Box, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import CaveSelection from './CaveSelect';
import { ENTRANCE_ONLY, ENTRANCE_AND_CAVE } from './caveType';

import Alert from '../../../common/Alert';
import { FormRow, FormSection } from '../utils/FormContainers';
import InputLanguage from '../utils/InputLanguage';
import InputText from '../utils/InputText';
import NameSuggestionDropdown from './NameSuggestionDropdown';
import NetworkMembershipSection from './NetworkMembershipSection';

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
  // Number of entrances already in the selected existing cave/network
  // (search result's `nbEntrances`), used to preview the outcome of linking:
  // creating a 2-entrance network vs extending an existing one. Local-only:
  // it's a selection-time hint, not a value the form submits.
  const [selectedNbEntrances, setSelectedNbEntrances] = useState(null);

  const {
    field: { onChange: onNameChange }
  } = useController({
    control,
    name: 'entrance.name',
    rules: { required: true }
  });

  const handleLinkToggle = event => {
    const isLinked = event.target.checked;
    updateEntityType(isLinked ? ENTRANCE_ONLY : ENTRANCE_AND_CAVE);
    setSelectedNbEntrances(null);
    reset();
  };

  return (
    <>
      <FormRow>
        {entityType === ENTRANCE_AND_CAVE ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </FormRow>

      {isNewEntrance ? (
        <FormSection title="Network">
          <FormControlLabel
            control={
              <Checkbox
                checked={entityType === ENTRANCE_ONLY}
                onChange={handleLinkToggle}
              />
            }
            label={formatMessage({
              id: 'Link to an existing entrance or network'
            })}
          />
          {entityType === ENTRANCE_ONLY && (
            <>
              <CaveSelection
                control={control}
                errors={errors}
                onSelectionChange={selection =>
                  setSelectedNbEntrances(
                    typeof selection?.nbEntrances === 'number'
                      ? selection.nbEntrances
                      : null
                  )
                }
              />
              {errors?.caveName && (
                <Alert severity="error" content={errors.caveName} />
              )}
              {selectedNbEntrances !== null && (
                <Alert
                  severity="info"
                  disableMargins
                  content={
                    selectedNbEntrances <= 1
                      ? formatMessage({
                          id: 'Linking to this entrance will create a network of 2 entrances.'
                        })
                      : formatMessage(
                          {
                            id: 'Linking to this network will extend it to {count} entrances.'
                          },
                          { count: selectedNbEntrances + 1 }
                        )
                  }
                />
              )}
            </>
          )}
        </FormSection>
      ) : (
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
