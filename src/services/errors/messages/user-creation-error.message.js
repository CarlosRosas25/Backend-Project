export const generateUserCreationErrorInfo = (user) => {
  return `Some data is imcomplete or isn't valid. Check the required fields:
    * first_name: needs to be a String, received: ${user.first_name}
    * last_name: needs to be a String, received: ${user.last_name}
    * age: needs to be a Number, received: ${user.age}
    * email: needs to be a String, received: ${user.email}
    `;
};
