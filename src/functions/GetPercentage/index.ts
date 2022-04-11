export const getPercentage = (prev: number, current: number) => {
  if (isNaN(prev)) {
    return "0";
  }
  const numerator = current - prev;
  const denominator = prev === 0 ? 1 : prev;
  const division = numerator / denominator;
  const result = division * 100;
  if (result < 0) {
    return `${Math.round(result)}`;
  } else if (result === 0) {
    return "0";
  } else {
    return `+${Math.round(result)}`;
  }
};

export const getPercentageIncrease = (prev: number, current: number) => {
  if (isNaN(prev)) {
    return "up";
  }
  const numerator = current - prev;
  const denominator = prev === 0 ? 1 : prev;
  const division = numerator / denominator;
  const result = division * 100;
  if (result < 0) {
    return "down";
  } else if (result === 0) {
    return "up";
  } else {
    return "up";
  }
};
