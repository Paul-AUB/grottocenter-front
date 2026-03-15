import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, CardContent } from '@mui/material';
import { resetAdvancedSearchResults } from '../../../actions/Advancedsearch';
import SearchResults from './SearchResults';

const EntitySearchPage = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAdvancedSearchResults());
  }, [dispatch]);

  return (
    <Card>
      <CardContent>
        {children}
        <br />
        <SearchResults />
      </CardContent>
    </Card>
  );
};

EntitySearchPage.propTypes = {
  children: PropTypes.node.isRequired
};

export default EntitySearchPage;
