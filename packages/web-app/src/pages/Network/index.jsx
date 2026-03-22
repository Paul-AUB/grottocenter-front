import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Network from '../../components/appli/Network';
import { fetchCave } from '../../actions/Cave/GetCave';
import { usePermissions } from '../../hooks';
import {
  Deleted,
  DELETED_ENTITIES
} from '../../components/common/card/Deleted';

const FAKE_CAVE = {
  id: 0,
  name: 'Réseau de Choranche',
  language: 'fra',
  isDeleted: false,
  depth: 680,
  length: 18000,
  temperature: 9,
  isDiving: true,
  author: { id: 1, name: 'Thomas Cabotiau' },
  dateInscription: '2008-07-29',
  reviewer: { id: 2, name: 'Marie Dupont' },
  dateReviewed: '2025-12-06',
  massifs: [{ id: 1, name: 'Vercors (plateau du)' }],
  entrances: [
    {
      id: 14,
      name: 'Grotte de Choranche',
      latitude: 45.0768,
      longitude: 5.3958,
      country: 'FR'
    },
    {
      id: 15,
      name: 'Goule Noire',
      latitude: 45.0812,
      longitude: 5.4021,
      country: 'FR'
    },
    {
      id: 16,
      name: 'Puits du Pylône',
      latitude: 45.0734,
      longitude: 5.3897,
      country: 'FR'
    }
  ],
  exploringOrganizations: [
    { id: 1, name: 'Spéléo Club Rosnéen', language: 'fra' },
    { id: 2, name: 'Groupe Spéléologique du Vercors', language: 'fra' }
  ],
  descriptions: [
    {
      id: 1,
      title: 'Description générale',
      body: "Réseau karstique majeur développé dans les calcaires urgoniens du Vercors. Le réseau de Choranche est l'un des plus importants du massif avec plus de 18 km de galeries topographiées. La galerie principale suit un axe NNE-SSO sur environ 300 m avant de bifurquer vers les réseaux inférieurs. Les concrétionnements sont exceptionnels, notamment dans la salle des Géants.",
      author: { id: 1, name: 'Thomas Cabotiau' },
      reviewer: { id: 2, name: 'Marie Dupont' },
      dateInscription: '2008-07-29',
      dateReviewed: '2024-01-15',
      language: 'fra',
      relevance: 5,
      isDeleted: false
    },
    {
      id: 2,
      title: 'Hydrologie',
      body: "Le réseau est alimenté par un bassin versant d'environ 45 km². Les débits peuvent varier de 50 l/s en étiage à plus de 10 m³/s en crue. Plusieurs siphons actifs sont présents dans les parties profondes du réseau.",
      author: { id: 2, name: 'Marie Dupont' },
      dateInscription: '2015-03-10',
      language: 'fra',
      relevance: 3,
      isDeleted: false
    }
  ]
};

const NetworkPage = () => {
  const dispatch = useDispatch();
  const { caveId } = useParams();
  const permissions = usePermissions();
  const { loading, cave: storeCave, error } = useSelector(state => state.cave);

  useEffect(() => {
    if (caveId !== '0') dispatch(fetchCave(caveId));
  }, [caveId, dispatch]);

  const cave = caveId === '0' ? FAKE_CAVE : storeCave;

  return cave?.isDeleted && !permissions.isModerator ? (
    <Deleted entityType={DELETED_ENTITIES.network} entity={cave} />
  ) : (
    <Network isLoading={caveId !== '0' && loading} error={error} cave={cave} />
  );
};

export default NetworkPage;
