export const getWeightClass = weightInPounds => {
  const weight = Math.floor(weightInPounds);
  if (weight < 116) {
    return "Strawweight";
  } else if (weight < 126) {
    return "Flyweight";
  } else if (weight < 136) {
    return "Bantamweight";
  } else if (weight < 146) {
    return "Featherweight";
  } else if (weight < 156) {
    return "Lightweight";
  } else if (weight < 171) {
    return "Welterweight";
  } else if (weight < 186) {
    return "Middleweight";
  } else if (weight < 206) {
    return "Light Heavyweight";
  } else {
    return "Heavyweight";
  }
};