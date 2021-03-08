const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const gitHubStrategy = require("passport-github2").Strategy;  //installed so can check credential in github

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

//gitHubStrategy task 1
 const gitHubLogin = new gitHubStrategy(
   {
     clientID: process.env.clientID,
     clientSecret: process.env.clientSecret,
     callbackURL: 'http://localhost:8000/auth/login/github/callback',  
   },
   function(accessToken, refeshToken, profile, cb){
    User.findOrCreate({githubId: profile.id}, function(err, user){
      return cb(err, user);
    });
   }
 );

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }

});

module.exports = passport.use(localLogin);
module.exports = passport.use(gitHubLogin);
