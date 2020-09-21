const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/spotify");
};

const { Router } = require("express");
const router = Router();


// Spotify OAuth2
const passport = require("passport");
const { Strategy } = require("passport-spotify");
const session = require("express-session");

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

router.use(session({
  secret:"kucing-gede-imut",
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(
new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, function(accessToken, refreshToken, expires_in, profile, done) {
  process.nextTick(function() {
    done(null, profile);
  });
}));




router.get("/auth/spotify", passport.authenticate("spotify", { scope: ['user-read-email', 'user-read-private'], showDialog: true}), (req, res) => {
  
});

router.get("/auth/spotify/callback", passport.authenticate("spotify", { failureRedirect: "/login" }));


router.get("/login", checkAuth);
router.get("/logout", checkAuth, (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/", async (req, res) => {
  console.log(req.user);
  res.json(req.user ? req.user : {"empty": "login first!"});
});
module.exports = router;
