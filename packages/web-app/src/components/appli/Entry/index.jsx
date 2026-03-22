import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import { Box, Breadcrumbs, Card, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';

import FixedLayout from '../../common/Layouts/Fixed';
import FixedContent from '../../common/Layouts/Fixed/FixedContent';


import CustomIcon from '../../common/CustomIcon';

import Properties from './Properties';
import Descriptions from '../Descriptions';
import Locations from './Locations';
import Riggings from './Riggings/Riggings';
import Comments from './Comments/index';
import Documents from './Documents';
import Histories from './Histories';
import { deleteEntrance } from '../../../actions/Entrance/DeleteEntrance';
import { restoreEntrance } from '../../../actions/Entrance/RestoreEntrance';
import { usePermissions, useUserProperties } from '../../../hooks';
import { linkCave } from '../../../actions/Cave/LinkCave';
import { unlinkCave } from '../../../actions/Cave/UnlinkCave';
import StandardDialog from '../../common/StandardDialog';
import { EntranceForm } from '../EntitiesForm';
import SensitiveCaveWarning from './SensitiveCaveWarning';
import AuthorAndDate from '../../common/Contribution/AuthorAndDate';
import Alert from '../../common/Alert';
import Map from '../../common/Maps/MapMultipleMarkers';
import { EntrancePropTypes } from '../../../types/entrance.type';
import {
  DeletedCard,
  DeleteConfirmationDialog,
  DELETED_ENTITIES
} from '../../common/card/Deleted';
import { fetchPerson } from '../../../actions/Person/GetPerson';

const HalfSplitContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Entry = ({ isLoading, error, entrance }) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { entranceId } = useParams();
  const { isAuth, isAdmin, isModerator } = usePermissions();
  const componentRef = useRef();
  const [isEditing, setEditing] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isDeleteConfirmationPermanent, setIsDeleteConfirmationPermanent] =
    useState(false);
  const [wantedDeletedState, setWantedDeletedState] = useState(false);
  const userId = useUserProperties()?.id ?? null;
  const [isExploredLoading, setIsExploredLoading] = useState(false);
  const [isExplored, setIsExplored] = useState(false);
  const { person, error: personError } = useSelector(state => state.person);
  const exploredEntrances = person?.exploredEntrances;
  const exploredNetworks = person?.exploredNetworks;
  const mapPositions = useMemo(() => (entrance ? [entrance] : []), [entrance]);

  useEffect(() => {
    if (entrance) setWantedDeletedState(entrance.isDeleted);
  }, [entrance]);

  let onDelete = null;
  if (!entrance?.isDeleted && isModerator) {
    onDelete = () => {
      setIsDeleteConfirmationPermanent(false);
      setIsDeleteConfirmationOpen(true);
    };
  }

  const onDeletePress = (entityId, isPermanent) => {
    setWantedDeletedState(true);
    dispatch(deleteEntrance({ id: entranceId, entityId, isPermanent }));
    if (isPermanent) navigate('/', { replace: true });
  };
  const onRestorePress = () => {
    setWantedDeletedState(false);
    dispatch(restoreEntrance({ id: entranceId }));
  };

  useEffect(() => {
    if (userId && !person && !personError) {
      dispatch(fetchPerson(userId));
    }
  }, [userId, person, personError, dispatch]);

  useEffect(() => {
    if (entrance?.id && entrance?.cave?.id) {
      const explored =
        exploredEntrances?.some(e => e?.id === entrance.id) ||
        exploredNetworks?.some(n => n?.id === entrance.cave.id);
      setIsExplored(explored);
    }
  }, [exploredEntrances, exploredNetworks, entrance?.id, entrance?.cave?.id]);

  const handleToggleExplored = async () => {
    if (!userId || !entrance?.cave?.id) return;

    setIsExploredLoading(true);
    try {
      if (isExplored) {
        await dispatch(unlinkCave(entrance.cave.id, userId, false));
      } else {
        await dispatch(linkCave(entrance.cave.id, userId, false));
      }
      setIsExplored(!isExplored);
    } catch (error) {
      console.error('Error toggling explored status:', error);
      setIsExplored(isExplored);
    } finally {
      setIsExploredLoading(false);
    }
  };

  const isActionLoading = wantedDeletedState !== entrance?.isDeleted;

  return (
    <div ref={componentRef}>
      <FixedLayout>
        {entrance && (
          <FixedContent
            displayShare
            subheader={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  sx={{ fontSize: { xs: '1.2rem', md: '1.7rem' } }}>
                  {entrance.country && (
                    <Link
                      component={RouterLink}
                      to={`/ui/countries/${entrance.country}`}
                      underline="hover"
                      color="inherit"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CustomIcon type="country" size={16} />
                      {entrance.country}
                    </Link>
                  )}
                  {entrance.massifs?.[0] && (
                    <Link
                      component={RouterLink}
                      to={`/ui/massifs/${entrance.massifs[0].id}`}
                      underline="hover"
                      color="inherit"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CustomIcon type="massif" size={16} />
                      {entrance.massifs[0].name}
                    </Link>
                  )}
                  {entrance.cave?.entrances?.length > 1 && (
                    <Link
                      component={RouterLink}
                      to={`/ui/caves/${entrance.cave.id}`}
                      underline="hover"
                      color="inherit"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CustomIcon type="network" size={16} />
                      {entrance.cave.name}
                    </Link>
                  )}
                </Breadcrumbs>
              </Box>
            }
            title={entrance.name ?? ''}
            icon={<CustomIcon type="entrance" />}
            onEdit={
              isAuth && !entrance.isDeleted ? () => setEditing(true) : undefined
            }
            onDelete={onDelete}
            isExplored={isAuth && entrance?.cave?.id ? isExplored : null}
            isExploredLoading={isExploredLoading}
            onToggleExplored={
              isAuth && entrance?.cave?.id && !entrance?.isDeleted
                ? handleToggleExplored
                : undefined
            }
            printRef={componentRef}
            entranceSnapshot={{
              id: entrance.id,
              type: 'entrances',
              isNetwork: entrance.cave?.entrances.length > 1,
              content: {
                ...entrance,
                latitude: entrance?.latitude,
                longitude: entrance?.longitude,
                cave: entrance?.cave?.id,
                caveName: entrance?.cave?.name
              }
            }}
            snapshot={{
              id: entrance.id,
              type: 'entrances',
              isNetwork: entrance.cave?.entrances.length > 1,
              getAll: true
            }}
            footer={
              (entrance.author || entrance.reviewer || entrance.language) && (
                <Typography component="div" variant="caption">
                  {entrance.author && (
                    <AuthorAndDate
                      author={entrance.author}
                      verb="Created"
                      date={entrance.dateInscription}
                    />
                  )}
                  {entrance.author && entrance.reviewer && ' · '}
                  {entrance.reviewer && (
                    <AuthorAndDate
                      author={entrance.reviewer}
                      verb="Updated"
                      date={entrance.dateReviewed}
                    />
                  )}
                  {entrance.language &&
                    (entrance.author || entrance.reviewer) &&
                    ' · '}
                  {entrance.language &&
                    `${formatMessage({ id: 'Language' })} : ${entrance.language.toUpperCase()}`}
                </Typography>
              )
            }
            content={
              <>
                {entrance.isDeleted && (
                  <DeletedCard
                    entityType={DELETED_ENTITIES.entrance}
                    entity={entrance}
                    isLoading={isActionLoading}
                    onRestorePress={onRestorePress}
                    onPermanentDeletePress={() => {
                      setIsDeleteConfirmationPermanent(true);
                      setIsDeleteConfirmationOpen(true);
                    }}
                  />
                )}
                <DeleteConfirmationDialog
                  entityType={DELETED_ENTITIES.entrance}
                  isOpen={isDeleteConfirmationOpen}
                  isLoading={isActionLoading}
                  isPermanent={isDeleteConfirmationPermanent}
                  isSearchMandatory={
                    isDeleteConfirmationPermanent &&
                    (entrance?.entrances ?? []).length > 0
                  }
                  onClose={() => setIsDeleteConfirmationOpen(false)}
                  onConfirmation={entity => {
                    onDeletePress(entity?.id, isDeleteConfirmationPermanent);
                  }}
                />

                {entrance.isSensitive && <SensitiveCaveWarning />}
                <HalfSplitContainer>
                  {(!entrance.isSensitive || isAdmin) && (
                    <Map positions={mapPositions} loading={isLoading} />
                  )}

                  <Properties entrance={entrance} dataQuality={entrance.dataQuality} />
                </HalfSplitContainer>
              </>
            }
          />
        )}
        {isLoading && (
          <Card sx={{ padding: 3 }}>
            <Skeleton height={300} width="100%" /> {/* Map Skeleton */}
            <Skeleton height={80} />
            <Skeleton height={100} />
            <Skeleton height={150} />
            <Skeleton height={100} />
          </Card>
        )}
        {error && (
          <Card sx={{ padding: 3 }}>
            <Alert
              title={formatMessage({
                id: 'Error, the entrance data you are looking for is not available.'
              })}
              severity="error"
            />
          </Card>
        )}
        {entrance && (
          <>
            {(isAuth || entrance.locations.length > 0) && (
              <Locations
                locations={entrance.locations}
                entranceId={entrance.id}
                isSensitive={entrance.isSensitive}
                isEditAllowed={!entrance.isDeleted}
              />
            )}
            {(isAuth || entrance.descriptions.length > 0) && (
              <Descriptions
                descriptions={entrance.descriptions}
                entityType="entrance"
                entityId={entrance.id}
                isEditAllowed={!entrance.isDeleted}
              />
            )}
            {(isAuth || entrance.riggings.length > 0) && (
              <Riggings
                riggings={entrance.riggings}
                entranceId={entrance.id}
                isEditAllowed={!entrance.isDeleted}
              />
            )}
            {(isAuth || entrance.documents.length > 0) && (
              <Documents
                documents={entrance.documents}
                entranceId={entrance.id}
                isEditAllowed={!entrance.isDeleted}
              />
            )}
            {(isAuth || entrance.histories.length > 0) && (
              <Histories
                histories={entrance.histories}
                entranceId={entrance.id}
                isEditAllowed={!entrance.isDeleted}
              />
            )}
            {(isAuth || entrance.comments.length > 0) && (
              <Comments
                comments={entrance.comments}
                entranceId={entrance.id}
                isEditAllowed={!entrance.isDeleted}
              />
            )}

            {isAuth && (
              <StandardDialog
                fullWidth
                maxWidth="md"
                open={isEditing}
                onClose={() => setEditing(false)}
                scrollable
                title={formatMessage({ id: 'Entrance edition' })}>
                <EntranceForm
                  entranceValues={{
                    country: entrance.country,
                    depth: entrance.depth,
                    length: entrance.length,
                    id: entrance.id,
                    isSensitive: entrance.isSensitive,
                    name: entrance.name,
                    language: entrance.language,
                    latitude: entrance?.latitude,
                    longitude: entrance?.longitude,
                    altitude: entrance.altitude,
                    yearDiscovery: entrance.discoveryYear
                  }}
                  caveValues={{
                    ...entrance.cave,
                    name: entrance.cave?.name,
                    language: entrance.cave?.language
                  }}
                />
              </StandardDialog>
            )}
          </>
        )}
      </FixedLayout>
    </div>
  );
};

Entry.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  entrance: EntrancePropTypes
};

export default Entry;
