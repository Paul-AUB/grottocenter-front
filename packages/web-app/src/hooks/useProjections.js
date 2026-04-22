import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjections } from '../actions/Projections';

const useProjections = () => {
  const dispatch = useDispatch();
  const projections = useSelector(
    state => state.projections?.projections ?? []
  );

  useEffect(() => {
    if (projections.length === 0) dispatch(fetchProjections());
  }, [dispatch, projections.length]);

  return projections;
};

export default useProjections;
