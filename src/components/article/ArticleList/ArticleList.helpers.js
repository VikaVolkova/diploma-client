export const getButtonStyle = (isPhone) => {
  return { textAlign: 'center', m: !isPhone ? '5% auto 7%' : '10% auto 15%' };
};

export const loadingBoxStyle = { display: 'flex', justifyContent: 'center' };
