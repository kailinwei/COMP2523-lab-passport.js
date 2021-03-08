const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const app = express();

const router = express.Router();
//localhost:8000/auth/login
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
//add here
router.get("/login/github", passport.authenticate("github"));

router.post(
  "/login",
  passport.authenticate("github", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login",
})
)

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


  //task 2:
  
  router.get("/admin", forwardAuthenticated, (req, res) => res.render("admin"));
  router.post(
    "/admin",
    passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/auth/login",
    })
  );

  app.delete('/admin', function (req, res) {
    res.redirect('/')
  })
  //------------------------end--------------------------- 

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;


