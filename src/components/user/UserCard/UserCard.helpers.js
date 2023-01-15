import { SIZE_TYPES } from '../../../helpers';

export const getAvatarStyle = (isPhone) => ({
  width: isPhone ? 150 : 200,
  height: isPhone ? 150 : 200,
});
export const button = { mr: 3 };

export const getTypographyVariant = (isPhone, isTablet) =>
  isPhone ? 'body2' : isTablet ? 'body1' : 'h6';

export const getButtonSize = (isTablet) => (isTablet ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM);
