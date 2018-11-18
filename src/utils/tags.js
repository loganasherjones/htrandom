export const randomizeTags = tags => {
  const shuffled = tags.slice(0);
  let i = tags.length;
  while (i--) {
    const index = Math.floor((i + 1) * Math.random());
    const temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, tags.length);
};

export const validateTag = tag => {
  const response = {
    invalid: false,
    message: null
  };

  if (!tag.startsWith('#')) {
    response.invalid = true;
    response.message = `${tag} does not start with #`;
  } else if (tag.length <= 1) {
    response.invalid = true;
    response.message = `${tag} is too short`;
  }

  return response;
};
