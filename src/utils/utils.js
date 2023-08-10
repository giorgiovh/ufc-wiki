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

export const generateUniqueCode = async(groupsRef) => {
  // variable to store the code
  let code;
  // variable to check if the code is unique
  let isUnique = false;

  // keep generating a new code until it is unique
  while (!isUnique) {
    // generate a random 6 character alphanumeric code
    code = Math.random().toString(36).substring(2, 8);

    // check if the code already exists in the 'groups' collection
    const snapshot = await groupsRef.where('code', '==', code).get();
    isUnique = !snapshot.docs.length;
  }

  return code;
}

export const createFighterName = fighter => `${fighter.FirstName} ${fighter.LastName}`

export const createFightName = fighters => `${createFighterName(fighters[0])} vs. ${createFighterName(fighters[1])}`