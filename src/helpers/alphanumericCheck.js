export const checkAlphaNumericNotEmpty = (val) => {
  let regex = /^[a-z\d\-\s]+$/i;
  if (!regex.test(val)) {
    return "Name should be only letters and numbers";
  }
  if (val.length === 0) {
    return "Name should not be empty";
  }
  return;
};
