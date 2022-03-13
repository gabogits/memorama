export const calculateScore = (maxTime, time, scoreMax) => {
  if (isNaN(maxTime) || isNaN(time) || isNaN(scoreMax) || time >= maxTime) {
    return 0;
  }
  let perc = ((time / maxTime) * 100).toFixed(3);
  let score = parseInt(scoreMax * ((100 - perc) / 100));

  return score;
};
