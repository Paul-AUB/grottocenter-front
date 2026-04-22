import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjections } from '../actions/Projections';

const useProjections = () => {
  const dispatch = useDispatch();
  const projections = useSelector(
    state => state.projections?.projections ?? []
  );

  const isLoading = useSelector(
    state => state.projections?.loading ?? false
  );

  useEffect(() => {
    if (projections.length === 0 && !isLoading) dispatch(fetchProjections());
  }, [dispatch, projections.length, isLoading]);

  return projections;
};

export default useProjections;
