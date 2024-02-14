export const getRandomPrice = (): number => {
  return parseFloat((Math.random() * 100 + 1).toFixed(2));
};
