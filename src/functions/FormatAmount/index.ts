const formatAmount = (amt: string) => {
  const amountNo = Number(amt.substring(3)).toFixed(2);
  return `GMD${amountNo}`;
};

export default formatAmount
