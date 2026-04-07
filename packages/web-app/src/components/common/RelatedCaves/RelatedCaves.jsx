import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import EntitiesList from '../entitiesList/EntitiesList';
import Alert from '../Alert';
import { NetworkPropTypes } from '../../../types/grotto.type';
import { EntranceSimplePropTypes } from '../../../types/entrance.type';
import SearchCaveForm from '../../appli/Form/SearchCaveForm';
import { linkCave } from '../../../actions/Cave/LinkCave';
import { unlinkCave } from '../../../actions/Cave/UnlinkCave';
import { getEntranceUrl } from '../../../conf/apiRoutes';

const RelatedCaves = ({
  exploredEntrances,
  exploredNetworks,
  entityId,
  isOrganization,
  canManageCaves,
  onRefresh,
  isCaveSearchVisible,
  onToggleCaveSearch
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const fetchCaveIdFromEntrance = useCallback(async entranceId => {
    const response = await fetch(`${getEntranceUrl}${entranceId}`);
    const entranceData = await response.json();
    return entranceData.cave?.id;
  }, []);

  const handleUnlinkCave = useCallback(async caveId => {
    try {
      await dispatch(unlinkCave(caveId, entityId, isOrganization));
      onRefresh();
    } catch (error) {
      console.error('Error unlinking cave:', error);
    }
  }, [dispatch, entityId, isOrganization, onRefresh]);

  const handleUnlinkEntrance = useCallback(async entranceId => {
    try {
      const caveId = await fetchCaveIdFromEntrance(entranceId);
      if (caveId) {
        await handleUnlinkCave(caveId);
      }
    } catch (error) {
      console.error('Error unlinking cave:', error);
    }
  }, [fetchCaveIdFromEntrance, handleUnlinkCave]);

  const onSubmitForm = useCallback(async selectedEntrances => {
    onToggleCaveSearch(false);
    setIsAdding(true);

    try {
      for (const entrance of selectedEntrances) {
        const entranceId = entrance.id || entrance['@id'];
        const caveId = await fetchCaveIdFromEntrance(entranceId);

        if (caveId) {
          try {
            await dispatch(linkCave(caveId, entityId, isOrganization));
          } catch (error) {
            if (error.body?.message?.includes('already')) {
              console.warn(
                `Cave ${caveId} is already linked to entity ${entityId}`
              );
            } else {
              console.error(`Error linking cave ${caveId}:`, error);
            }
          }
        }
      }
      onRefresh();
    } catch (error) {
      console.error('Error linking cave:', error);
    } finally {
      setIsAdding(false);
    }
  }, [dispatch, entityId, fetchCaveIdFromEntrance, isOrganization, onRefresh, onToggleCaveSearch]);

  const toolTipTitle = formatMessage({
    id: isOrganization
      ? 'Remove from organization'
      : 'Remove from my explored caves'
  });

  const isEmpty =
    (exploredNetworks ?? []).length === 0 &&
    (exploredEntrances ?? []).length === 0;

  return (
    <>
      {isCaveSearchVisible && <SearchCaveForm onSubmit={onSubmitForm} />}
      {isAdding ? (
        <Alert severity="info" title={formatMessage({ id: 'Loading ...' })} />
      ) : isEmpty && !isCaveSearchVisible ? (
        <Alert
          severity="info"
          title={formatMessage({ id: 'No explored caves found.' })}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <EntitiesList
            type="cave"
            entities={exploredNetworks}
            onItemRemove={canManageCaves ? handleUnlinkCave : null}
            toolTipTitle={toolTipTitle}
          />
          <EntitiesList
            type="entrance"
            entities={exploredEntrances}
            onItemRemove={canManageCaves ? handleUnlinkEntrance : null}
            toolTipTitle={toolTipTitle}
          />
        </Box>
      )}
    </>
  );
};

RelatedCaves.propTypes = {
  exploredEntrances: PropTypes.arrayOf(EntranceSimplePropTypes),
  exploredNetworks: PropTypes.arrayOf(NetworkPropTypes),
  entityId: PropTypes.number.isRequired,
  isOrganization: PropTypes.bool.isRequired,
  canManageCaves: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  isCaveSearchVisible: PropTypes.bool.isRequired,
  onToggleCaveSearch: PropTypes.func.isRequired
};

export default RelatedCaves;
