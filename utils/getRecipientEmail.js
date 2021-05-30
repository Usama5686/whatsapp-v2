const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];
//Return the Email of users[] arrray from firebase which which did not match the loggedin user
// for example users=[programmer3399@gmail.com,nj@gmail.com]
//loggedinUser = programmer3399@gmail.com;
// this function will return nj@gmail.com
export default getRecipientEmail;
