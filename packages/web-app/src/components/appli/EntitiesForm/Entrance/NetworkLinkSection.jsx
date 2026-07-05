import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import CaveSelection from './CaveSelect';
import { ENTRANCE_ONLY, ENTRANCE_AND_CAVE } from './caveType';

import Alert from '../../../common/Alert';
import { FormSection } from '../utils/FormContainers';

// Create-mode network opt-in: a checkbox reveals the cave/network search,
// with a preview of the outcome (new 2-entrance network vs extending an
// existing one). Edit-mode network status/actions live in
// NetworkMembershipSection instead.
const NetworkLinkSection = ({
  control,
  errors,
  entityType,
  updateEntityType,
  reset
}) => {
  const { formatMessage } = useIntl();
  // Selection-time hints, not values the form submits: the display name and
  // entrance count of the cave/network chosen in the search below. Kept in
  // local state (not the shared `cave.name` RHF field) so the linked
  // network's name never bleeds into the entrance/cave name field once the
  // user switches back to "new cave" mode.
  const [selectedCave, setSelectedCave] = useState(null);
  const [selectedNbEntrances, setSelectedNbEntrances] = useState(null);

  const handleLinkToggle = event => {
    const isLinked = event.target.checked;
    updateEntityType(isLinked ? ENTRANCE_ONLY : ENTRANCE_AND_CAVE);
    setSelectedCave(null);
    setSelectedNbEntrances(null);
    reset();
  };

  return (
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
            value={selectedCave}
            onSelectionChange={selection => {
              setSelectedCave(selection?.id ? { name: selection.name } : null);
              setSelectedNbEntrances(
                typeof selection?.nbEntrances === 'number'
                  ? selection.nbEntrances
                  : null
              );
            }}
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
  );
};

NetworkLinkSection.propTypes = {
  control: PropTypes.shape({}),
  errors: PropTypes.shape({
    caveName: PropTypes.string
  }),
  entityType: PropTypes.oneOf([ENTRANCE_ONLY, ENTRANCE_AND_CAVE]),
  updateEntityType: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default NetworkLinkSection;
