const getLocalizedCountryName = (iso2, locale, fallback = '') => {
  if (!iso2) return fallback;
  try {
    return (
      new Intl.DisplayNames([locale, 'en'], { type: 'region' }).of(
        iso2.toUpperCase()
      ) || fallback
    );
  } catch {
    return fallback;
  }
};

export default getLocalizedCountryName;
