export const generateUserLoginErrorInfo = (user) => {
  return `Some data is imcomplete or isn't valid. Check the required fields:
      * email: needs to be a String, received: ${user.email}
      * password: needs to be a String, received: ${user.password}`;
};
