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
  id: 0,
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
  language: 'fra',
  massifs: [{ id: 1, name: 'Vercors (plateau du)' }],
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
  locations: [
    {
      id: 1,
      title: 'Accès principal',
      body: 'Depuis le village de Choranche, prendre la route forestière sur 2 km. Le départ se trouve après le grand virage, au niveau du panneau bois.',
      author: { id: 1, name: 'Thomas Cabotiau' },
      reviewer: { id: 2, name: 'Marie Dupont' },
      dateInscription: '2010-04-12',
      dateReviewed: '2023-09-01',
      language: 'fra',
      relevance: 4
    },
    {
      id: 2,
      title: '',
      body: 'Accès secondaire possible par le chemin de la Balme (non entretenu, 4x4 conseillé).',
      author: { id: 2, name: 'Marie Dupont' },
      dateInscription: '2015-06-20',
      language: 'fra',
      relevance: 2
    }
  ],
  descriptions: [
    {
      id: 1,
      title: 'Description générale',
      body: "Réseau karstique développé dans les calcaires urgoniens du Vercors. Le porche d'entrée est large de 8 m pour une hauteur de 5 m. La galerie principale suit un axe NNE-SSO sur environ 300 m avant de bifurquer vers les réseaux inférieurs.",
      author: { id: 1, name: 'Thomas Cabotiau' },
      reviewer: { id: 2, name: 'Marie Dupont' },
      dateInscription: '2008-07-29',
      dateReviewed: '2024-01-15',
      language: 'fra',
      relevance: 5
    }
  ],
  riggings: [
    {
      id: 1,
      title: "Équipement puits d'entrée",
      obstacles: [
        {
          obstacle: "P15 — Puits d'entrée",
          rope: '25 m',
          anchor: '2 spits + main naturel',
          observation: 'Fractionnement à -8 m conseillé en période de crue'
        },
        {
          obstacle: 'P8 — Méandre du Chat',
          rope: '15 m',
          anchor: '1 spit + coinceur',
          observation: ''
        }
      ],
      author: { id: 3, name: 'Jean-Pierre Vidal' },
      dateInscription: '2012-03-05',
      language: 'fra',
      relevance: 3
    }
  ],
  documents: [
    {
      id: 1,
      title: 'Topo du réseau de Choranche — 1992',
      description:
        'Topographie complète réalisée par le SCR en 1992, mise à jour en 2005.',
      dateInscription: '2009-02-10',
      files: []
    }
  ],
  histories: [
    {
      id: 1,
      body: 'Première exploration documentée en 1947 par le Spéléo-Club de Grenoble. Le réseau a été progressivement topographié entre 1950 et 1965. La jonction avec le réseau de la Goule Noire a été réalisée en 1978.',
      author: { id: 1, name: 'Thomas Cabotiau' },
      reviewer: { id: 2, name: 'Marie Dupont' },
      dateInscription: '2008-07-29',
      dateReviewed: '2022-11-30',
      language: 'fra',
      relevance: 5
    }
  ],
  comments: [
    {
      id: 1,
      title: 'Superbe réseau !',
      body: 'Très belle sortie, galeries bien dimensionnées. Attention au siphon terminal qui peut être actif en période hivernale.',
      author: { id: 4, name: 'Camille Arnaud' },
      dateInscription: '2024-05-18',
      language: 'fra',
      relevance: 4,
      aestheticism: 5,
      approach: 3,
      eTTrail: '00:30:00',
      eTUnderground: '03:00:00'
    }
  ]
};

const EntryPage = () => {
  const dispatch = useDispatch();
  const { entranceId } = useParams();
  const permissions = usePermissions();
  const { loading, data, error } = useSelector(state => state.entrance);

  useEffect(() => {
    if (entranceId !== '0') dispatch(fetchEntrance(entranceId));
  }, [entranceId, dispatch]);

  const entrance = entranceId === '0' ? FAKE_ENTRANCE : data;

  return entrance?.isDeleted && !permissions.isModerator ? (
    <Deleted entityType={DELETED_ENTITIES.entrance} entity={entrance} />
  ) : (
    <Entry
      isLoading={entranceId !== '0' && loading}
      error={error}
      entrance={entrance}
    />
  );
};

export default EntryPage;
