const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

//added 
function profileTakein (accessToken, refreshToken, profile, cb) {
  let user = userController.getUserByGitHubIdOrCreate(profile);
  return cb(null, user);
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById, profileTakein,
};
