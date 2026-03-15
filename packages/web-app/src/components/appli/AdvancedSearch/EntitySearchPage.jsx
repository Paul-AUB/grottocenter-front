import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import FixedContent from '../../common/Layouts/Fixed/FixedContent';
import {
  fetchAdvancedSearchResults,
  resetAdvancedSearchResults
} from '../../../actions/Advancedsearch';
import { getStoredRowsPerPage } from '../../common/EntityTable/EntityTable';
import SearchResults from './SearchResults';

const EntitySearchPage = ({ title, entityType, children }) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  useLayoutEffect(() => {
    dispatch(resetAdvancedSearchResults());
    dispatch(
      fetchAdvancedSearchResults({
        entity: entityType,
        query: '',
        matchAllFields: true,
        size: getStoredRowsPerPage()
      })
    );
  }, [dispatch, entityType]);

  return (
    <FixedContent
      title={formatMessage({ id: title })}
      content={
        <>
          {children}
          <br />
          <SearchResults entityType={entityType} />
        </>
      }
    />
  );
};

EntitySearchPage.propTypes = {
  title: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default EntitySearchPage;
