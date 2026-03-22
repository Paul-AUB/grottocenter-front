import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Entry from '../../components/appli/Entry';
import { fetchEntrance } from '../../actions/Entrance/GetEntrance';
import { usePermissions } from '../../hooks';
import {
  Deleted,
  DELETED_ENTITIES
} from '../../components/common/card/Deleted';

const FAKE_ENTRANCE = {
  id: 14,
  name: 'Fake Entrance (all icons)',
  latitude: 45.0768,
  longitude: 5.3958,
  precision: 10,
  country: 'FR',
  city: 'Choranche',
  region: 'Auvergne-Rhône-Alpes',
  altitude: 580,
  discoveryYear: 1947,
  isSensitive: false,
  isDeleted: false,
  language: 'fr',
  massifs: [{ id: 1, name: 'Vercors' }],
  undergroundType: 'karst',
  cave: {
    id: 1,
    name: 'Réseau de Choranche',
    depth: 680,
    length: 18000,
    temperature: 9,
    isDiving: true,
    entrances: [{ id: 14 }, { id: 15 }],
    exploringOrganizations: [
      { id: 1, name: 'Spéléo Club Rosnéen', url: '/ui/organizations/1' }
    ]
  },
  dataQuality: 65,
  stats: { approach: 3, aestheticism: 4, caving: 3 },
  author: { id: 1, name: 'Thomas Cabotiau' },
  dateInscription: '2008-07-29',
  reviewer: { id: 1, name: 'Thomas Cabotiau' },
  dateReviewed: '2025-12-06',
  locations: [],
  descriptions: [],
  riggings: [],
  documents: [],
  histories: [],
  comments: []
};

const EntryPage = () => {
  const dispatch = useDispatch();
  const { entranceId } = useParams();
  const permissions = usePermissions();
  const { loading, data, error } = useSelector(state => state.entrance);

  useEffect(() => {
    if (entranceId !== '14') dispatch(fetchEntrance(entranceId));
  }, [entranceId, dispatch]);

  const entrance = entranceId === '14' ? FAKE_ENTRANCE : data;

  return entrance?.isDeleted && !permissions.isModerator ? (
    <Deleted entityType={DELETED_ENTITIES.entrance} entity={entrance} />
  ) : (
    <Entry
      isLoading={entranceId !== '14' && loading}
      error={error}
      entrance={entrance}
    />
  );
};

export default EntryPage;
