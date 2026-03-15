import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import FixedContent from '../../common/Layouts/Fixed/FixedContent';
import { resetAdvancedSearchResults } from '../../../actions/Advancedsearch';
import SearchResults from './SearchResults';

const EntitySearchPage = ({ title, children }) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  useEffect(() => {
    dispatch(resetAdvancedSearchResults());
  }, [dispatch]);

  return (
    <FixedContent
      title={formatMessage({ id: title })}
      content={
        <>
          {children}
          <br />
          <SearchResults />
        </>
      }
    />
  );
};

EntitySearchPage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default EntitySearchPage;
