import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button, Stack } from '@mui/material';

import {
  fetchAdvancedSearchResults,
  resetAdvancedSearchResults
} from '../../../../actions/Advancedsearch';
import { ADVANCED_SEARCH_TYPES } from '../../../../conf/config';
import OrganizationsSearch from '../../AdvancedSearch/OrganizationsSearch';
import SearchResults from '../../AdvancedSearch/SearchResults';

const SearchOrganizationForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);

  const startAdvancedSearch = (formValues, resourceType) => {
    dispatch(fetchAdvancedSearchResults(formValues, resourceType));
  };

  const resetAdvancedSearch = () => {
    dispatch(resetAdvancedSearchResults());
  };

  const resetForm = () => {
    resetAdvancedSearch();
    setSelectedOrganizations([]);
  };

  const handleSelection = (ids, results) => {
    setSelectedOrganizations(results.filter(r => ids.includes(r.id)));
  };

  const handleOnSubmit = () => {
    onSubmit(selectedOrganizations);
    resetForm();
  };

  return (
    <Box>
      <OrganizationsSearch
        startAdvancedsearch={startAdvancedSearch}
        resourceType={ADVANCED_SEARCH_TYPES.ORGANIZATIONS}
        resetResults={resetAdvancedSearch}
      />
      <SearchResults onSelected={handleSelection} hideExport />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        spacing={1}
        sx={{ mt: 3 }}>
        <Button
          disabled={selectedOrganizations.length === 0}
          color="primary"
          variant="contained"
          type="submit"
          fullWidth
          sx={{ maxWidth: { sm: 200 } }}
          onClick={handleOnSubmit}>
          {formatMessage({ id: 'Join' })}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ maxWidth: { sm: 200 } }}
          onClick={resetForm}>
          {formatMessage({ id: 'Reset' })}
        </Button>
      </Stack>
    </Box>
  );
};

SearchOrganizationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SearchOrganizationForm;
