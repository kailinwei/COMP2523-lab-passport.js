const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });

});
  //added for admin task 2, i don't know how to make a delete button
  // i added a app.delete in authoRoute.js, but i don't know how it works
  router.get("/admin", ensureAuthenticated, (req, res) => {
    const listofSession = req.sessionStore.sessions})
    let sessionId = [];

     listofSession.forEach(element => {
      sessionId.push(session.ID)
      //give the button the delete function
     
     });
    res.render("admin", {
      user: req.user,
    });


module.exports = router;
