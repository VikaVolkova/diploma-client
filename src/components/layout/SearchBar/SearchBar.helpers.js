import { PREVIEW_TYPE } from '../../../helpers';

export const textFieldStyle = (type, isPhone) => ({
  width: type === PREVIEW_TYPE.FULL ? 800 : isPhone ? '100%' : '90%',
  backgroundColor: '#fff',
  border: 'none',
  borderRadius: 2,
});

export const searchIconStyle = (type, color) => ({
  fill: type === PREVIEW_TYPE.FULL ? 'white' : color,
});

export const getBoxStyle = (type, isPhone) => ({
  width: type === PREVIEW_TYPE.FULL ? 900 : isPhone ? '100%' : 500,
  display: 'flex',
  justifyContent: 'space-between',
});
