export const checkAlphaNumericNotEmpty = (val) => {
  let regex = /[^A-Za-z0-9]/;
  if (regex.test(val)) {
    return "Name should be only letters and numbers";
  }
  if (val.length === 0) {
    return "Name should not be empty";
  }
  return;
};
