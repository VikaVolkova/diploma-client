export const textFieldStype = (type) => {
  return {
    width: type === 'full' ? 800 : 300,
    backgroundColor: 'white',
    border: 'none',
    borderRadius: 2,
  };
};

export const searchIconStyle = (type, color) => {
  return { fill: type === 'full' ? 'white' : color };
};
