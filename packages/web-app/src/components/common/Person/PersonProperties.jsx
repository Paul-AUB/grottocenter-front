import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Chip, Divider, Typography } from '@mui/material';

const PersonProperties = ({ person }) => {
  const { formatMessage } = useIntl();

  const groups = (person.groups ?? [])
    .filter(g => g.name)
    .map(g => formatMessage({ id: g.name }))
    .join(', ');

  const detailRows = [
    { label: formatMessage({ id: 'Id' }), value: `#${person.id}` },
    person.name && {
      label: formatMessage({ id: 'Caver.Name', defaultMessage: 'Name' }),
      value: person.name
    },
    person.surname && {
      label: formatMessage({ id: 'Surname' }),
      value: person.surname
    },
    person.language &&
      person.language !== '000' && {
        label: formatMessage({ id: 'Language' }),
        value: person.language
      },
    groups && { label: formatMessage({ id: 'Groups' }), value: groups },
    person.mail && { label: formatMessage({ id: 'Mail' }), value: person.mail }
  ].filter(Boolean);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {person.isBanned && (
        <Chip
          label={formatMessage({ id: 'Banned' })}
          color="error"
          size="small"
          sx={{ alignSelf: 'flex-start', mb: 0.5 }}
        />
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 3,
          rowGap: 0.75,
          alignItems: 'center'
        }}>
        <Typography variant="h5" color="text.secondary">
          {formatMessage({ id: 'Nickname' })}
        </Typography>
        <Typography variant="h5">{person.nickname}</Typography>
        <Divider sx={{ gridColumn: '1 / -1', my: 0.5, width: '40%' }} />
        {detailRows.map(({ label, value }) => (
          <React.Fragment key={label}>
            <Typography variant="h5" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h5">{value}</Typography>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

PersonProperties.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    surname: PropTypes.string,
    language: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    mail: PropTypes.string,
    isBanned: PropTypes.bool
  }).isRequired
};

export default PersonProperties;
