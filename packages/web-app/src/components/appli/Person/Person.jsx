import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import { useIntl } from 'react-intl';
import { Button, Card, Chip, Tooltip, Typography } from '@mui/material';
import StandardDialog from '../../common/StandardDialog';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { useUserProperties, usePermissions } from '../../../hooks';
import subscriptionsType from '../../../types/subscriptions.type';
import { PersonPropTypes } from '../../../types/person.type';
import REDUCER_STATUS from '../../../reducers/ReducerStatus';
import FixedLayout from '../../common/Layouts/Fixed';
import FixedContent from '../../common/Layouts/Fixed/FixedContent';
import ScrollableContent from '../../common/Layouts/Fixed/ScrollableContent';
import CustomIcon from '../../common/CustomIcon';
import Alert from '../../common/Alert';
import DocumentsList from '../../common/DocumentsList/DocumentsList';
import EntitiesList from '../../common/entitiesList/EntitiesList';
import RelatedCaves from '../../common/RelatedCaves/RelatedCaves';
import PersonProperties from '../../common/Person/PersonProperties';
import SubscriptionsList from '../../common/Subscriptions/SubscriptionsList';
import { deletePerson } from '../../../actions/Person/DeletePerson';
import { leaveOrganization } from '../../../actions/Organization/LeaveOrganization';
import { fetchPerson } from '../../../actions/Person/GetPerson';
import {
  DeleteConfirmationDialog,
  DELETED_ENTITIES
} from '../../common/card/Deleted';

const Person = ({
  isLoading,
  person,
  error,
  subscriptions,
  subscriptionsStatus
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const permissions = usePermissions();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isCaveSearchVisible, setIsCaveSearchVisible] = useState(false);
  const [pendingLeaveOrg, setPendingLeaveOrg] = useState(null);

  const userId = useUserProperties()?.id ?? null;
  let canEdit = false;
  if (userId && person) {
    canEdit = userId.toString() === person?.id?.toString();
  }
  const canUnsubscribe = canEdit || permissions.isAdmin;

  const handleRefresh = useCallback(() => {
    dispatch(fetchPerson(person.id));
  }, [dispatch, person?.id]);

  const handleLeaveOrganization = useCallback(async organizationId => {
    if (!person?.id) return;
    try {
      await dispatch(leaveOrganization(person.id, organizationId));
      dispatch(fetchPerson(person.id));
    } catch (err) {
      console.error('Error leaving organization:', err);
    }
  }, [dispatch, person?.id]);

  const requestLeaveOrganization = useCallback(organizationId => {
    const org = (person?.organizations ?? []).find(o => o.id === organizationId);
    setPendingLeaveOrg({ id: organizationId, label: org?.name });
  }, [person?.organizations]);

  const handleConfirmLeaveOrg = useCallback(async () => {
    if (!pendingLeaveOrg) return;
    const { id } = pendingLeaveOrg;
    setPendingLeaveOrg(null);
    await handleLeaveOrganization(id);
  }, [pendingLeaveOrg, handleLeaveOrganization]);

  let onDelete = null;
  if (person && (permissions.isAdmin || permissions.isModerator)) {
    onDelete = () => {
      setIsDeleteConfirmationOpen(true);
    };
  }
  const onDeletePress = (entityId, isPermanent) => {
    dispatch(deletePerson({ id: person?.id, entityId, isPermanent }));
    if (isPermanent) navigate('/', { replace: true });
  };

  let title = '';
  if (person) {
    if (person.name && person.surname) {
      title = `${person.name} ${person.surname}`;
    } else {
      title = person.nickname ?? '';
    }
  }

  const nbOrganizations = (person?.organizations ?? []).length;
  const nbDocuments = (person?.documents ?? []).length;
  const nbNetworks = (person?.exploredNetworks ?? []).length;
  const nbEntrances = (person?.exploredEntrances ?? []).length;

  return (
    <FixedLayout>
      {person && (
        <FixedContent
          displayShare
          icon={<CustomIcon type="caver" />}
          title={title}
          titleAdornment={
            canEdit && (
              <Chip
                label={formatMessage({ id: 'You' }).toUpperCase()}
                sx={{
                  ml: 3,
                  fontSize: '1.4rem',
                  letterSpacing: 1.5,
                  verticalAlign: 'middle',
                  bgcolor: 'secondary.main',
                  fontWeight: 700
                }}
              />
            )
          }
          onEdit={
            canEdit
              ? () => navigate(`/ui/persons/${person?.id}/edit`)
              : undefined
          }
          onDelete={onDelete}
          content={
            <>
              <DeleteConfirmationDialog
                entityType={DELETED_ENTITIES.person}
                isOpen={isDeleteConfirmationOpen}
                isLoading={false}
                isPermanent
                onClose={() => setIsDeleteConfirmationOpen(false)}
                onConfirmation={entity => {
                  onDeletePress(entity?.id, true);
                }}
              />
              <PersonProperties person={person} />
            </>
          }
        />
      )}
      {isLoading && (
        <Card sx={{ padding: 3 }}>
          <Skeleton />
          <Skeleton height={200} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </Card>
      )}
      {!!error && (
        <Card sx={{ padding: 3 }}>
          <Alert
            title={formatMessage({
              id: 'Error, the person you are looking for is not available.'
            })}
            severity="error"
          />
        </Card>
      )}
      {person && (
        <>
          {permissions.isLeader && (
            <ScrollableContent
              anchorId="subscriptions"
              title={formatMessage({ id: 'Subscriptions' })}
              content={
                <SubscriptionsList
                  canUnsubscribe={canUnsubscribe}
                  subscriptions={subscriptions}
                  subscriptionsStatus={subscriptionsStatus}
                  userId={person.id}
                />
              }
            />
          )}
          {(nbOrganizations > 0 || canEdit) && (
            <ScrollableContent
              anchorId="organizations"
              title={`${formatMessage({ id: 'Organizations' })} (${nbOrganizations})`}
              content={
                <EntitiesList
                  type="organization"
                  entities={person.organizations}
                  onItemRemove={canEdit ? requestLeaveOrganization : null}
                  toolTipTitle={formatMessage({ id: 'Leave organization' })}
                  emptyMessage={
                    <Alert
                      severity="info"
                      title={formatMessage({
                        id: 'This person is not a member of any organization yet.'
                      })}
                    />
                  }
                />
              }
            />
          )}
          {(nbNetworks > 0 || nbEntrances > 0 || canEdit) && (
            <ScrollableContent
              anchorId="related-caves"
              title={`${formatMessage({ id: 'Explored caves' })} (${nbNetworks + nbEntrances})`}
              icon={
                canEdit && (
                  <Tooltip
                    title={formatMessage({
                      id: isCaveSearchVisible
                        ? 'Cancel this search'
                        : 'Add a cave'
                    })}>
                    <Button
                      color={isCaveSearchVisible ? 'inherit' : 'secondary'}
                      variant="outlined"
                      onClick={() => setIsCaveSearchVisible(v => !v)}
                      startIcon={
                        isCaveSearchVisible ? <CancelIcon /> : <AddCircleIcon />
                      }>
                      {formatMessage({
                        id: isCaveSearchVisible ? 'Cancel' : 'Add'
                      })}
                    </Button>
                  </Tooltip>
                )
              }
              content={
                <RelatedCaves
                  exploredEntrances={person.exploredEntrances}
                  exploredNetworks={person.exploredNetworks}
                  entityId={person.id}
                  isOrganization={false}
                  canManageCaves={canEdit}
                  onRefresh={handleRefresh}
                  isCaveSearchVisible={isCaveSearchVisible}
                  onToggleCaveSearch={setIsCaveSearchVisible}
                />
              }
            />
          )}
          {nbDocuments > 0 && (
            <ScrollableContent
              anchorId="documents"
              title={`${formatMessage({ id: 'Documents' })} (${nbDocuments})`}
              content={<DocumentsList documents={person.documents} />}
            />
          )}
        </>
      )}
      <StandardDialog
        open={!!pendingLeaveOrg}
        onClose={() => setPendingLeaveOrg(null)}
        fullWidth
        maxWidth="xs"
        title={formatMessage({ id: 'Leave organization' })}
        actions={
          <>
            <Button onClick={() => setPendingLeaveOrg(null)} variant="text">
              {formatMessage({ id: 'Cancel' })}
            </Button>
            <Button onClick={handleConfirmLeaveOrg} color="error" autoFocus>
              {formatMessage({ id: 'Leave' })}
            </Button>
          </>
        }>
        {formatMessage(
          { id: 'Are you sure you want to leave {name}?' },
          {
            name: (
              <Typography component="span" fontWeight={700}>
                {pendingLeaveOrg?.label ?? '?'}
              </Typography>
            )
          }
        )}
      </StandardDialog>
    </FixedLayout>
  );
};

Person.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  person: PersonPropTypes,
  subscriptions: subscriptionsType,
  subscriptionsStatus: PropTypes.oneOf(Object.values(REDUCER_STATUS))
};

export default Person;
