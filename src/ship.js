const Ship = function (length = 5) {
  let timesHit = 0;

  const getLength = () => length;
  const getTimesHit = () => timesHit;
  const hit = () => (timesHit += 1);
  const isSunk = () => timesHit === getLength();

  return { isSunk, hit, getTimesHit };
};

module.exports = Ship;
