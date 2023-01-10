export const getTitleStyle = (isTablet) => {
  return isTablet ? '0 auto 10px 15px' : '0 auto 10px 15.5%';
};

export const getGridContainerStyle = (isTablet) => {
  return { width: isTablet ? '100%' : '70%', m: 'auto' };
};

export const gridItemMargin = { mb: 3 };
