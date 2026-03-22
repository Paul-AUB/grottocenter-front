import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatisticsCountry } from '../../../actions/Country/GetStatisticsCountry';
import { fetchStatisticsMassif } from '../../../actions/Massif/GetStatisticsMassif';
import { fetchStatisticsRegion } from '../../../actions/Region/GetStatisticsRegion';
import SpecificsCaves from './components/SpecificsCaves';
import CavesData from './components/CavesData/index';
import CavesStatistics from './components/CavesStatistics';
import Alert from '../../common/Alert';
import ScrollableContent from '../../common/Layouts/Fixed/ScrollableContent';

const StatisticsDataDashboard = ({ countryId, massifId, regionId, description }) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [data, setData] = useState({});
  const [entityType, setEntityType] = useState();

  const { dataMassif, loadingMassif, errorMassif } = useSelector(
    state => state.statisticsMassif
  );
  const { dataCountry, loadingCountry, errorCountry } = useSelector(
    state => state.statisticsCountry
  );
  const { statistics: dataRegion, status: statusRegion } = useSelector(
    state => state.statisticsRegion
  );
  const loadingRegion = statusRegion === 'LOADING';
  const errorRegion = statusRegion === 'FAILED';

  useEffect(() => {
    if (regionId && countryId) {
      dispatch(fetchStatisticsRegion(countryId, regionId));
    } else if (countryId) {
      dispatch(fetchStatisticsCountry(countryId));
    } else {
      dispatch(fetchStatisticsMassif(massifId));
    }
  }, [countryId, massifId, regionId, dispatch]);

  useEffect(() => {
    setData(dataCountry);
    setEntityType('country');
  }, [dataCountry]);

  useEffect(() => {
    setData(dataMassif);
    setEntityType('massif');
  }, [dataMassif]);

  useEffect(() => {
    setData(dataRegion);
    setEntityType('region');
  }, [dataRegion]);

  useEffect(() => {
    if (regionId) {
      setEntityType('region');
    } else if (countryId) {
      setEntityType('country');
    } else {
      setEntityType('massif');
    }
  }, [countryId, regionId]);

  const isLoading = loadingCountry || loadingMassif || loadingRegion;
  const hasError = errorMassif || errorCountry || errorRegion;
  const hasData = data && data.nb_caves > 0 && !hasError;
  const isEmpty =
    !isLoading &&
    !hasData &&
    (!data || data.nb_caves === undefined || data.nb_caves === 0);

  return (
    <ScrollableContent
      anchorId="statistics"
      title={formatMessage({ id: 'More information' })}
      subheader={description}
      content={
        <>
            {isLoading && <Skeleton height={200} width="100%" />}
          {hasData && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <CavesData
                title={
                  entityType === 'country'
                    ? formatMessage({ id: 'Massifs, networks and caves' })
                    : formatMessage({ id: 'Networks and caves' })
                }
                nbMassifs={data.nb_massifs}
                nbCaves={data.nb_caves}
                nbDivingCaves={data.diving_caves}
                nbNetworks={data.nb_networks}
                url={(() => {
                  if (entityType === 'country')
                    return `/ui/countries/${countryId}/entrances`;
                  if (entityType === 'region')
                    return `/ui/countries/${countryId}/regions/${regionId}/entrances`;
                  return `/ui/massifs/${massifId}/entrances`;
                })()}
              />
              <CavesStatistics
                avgDepth={data.avg.avg_depth}
                avgLength={data.avg.avg_length}
                totalLength={data.total_length}
              />
              <SpecificsCaves
                maxDepthCave={data.cave_with_max_depth}
                maxLengthCave={data.cave_with_max_length}
                parentEntity={(() => {
                  if (entityType === 'country')
                    return formatMessage({ id: 'country' });
                  if (entityType === 'region')
                    return formatMessage({ id: 'region' });
                  return formatMessage({ id: 'massif' });
                })()}
              />
            </Box>
          )}
          {(hasError || isEmpty) && (
            <Alert
              severity="info"
              title={(() => {
                if (entityType === 'country')
                  return formatMessage({
                    id: 'There is currently not enough information about this country.'
                  });
                if (entityType === 'region')
                  return formatMessage({
                    id: 'There is currently not enough information about this region.'
                  });
                return formatMessage({
                  id: 'There is currently not enough information about this massif.'
                });
              })()}
            />
          )}
        </>
      }
    />
  );
};

// different type for both IDs make the component not factorizable
StatisticsDataDashboard.propTypes = {
  countryId: PropTypes.string,
  massifId: PropTypes.number,
  regionId: PropTypes.string,
  description: PropTypes.string
};

export default StatisticsDataDashboard;
