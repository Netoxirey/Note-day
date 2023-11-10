const express = require('express');
const helmet = require('helmet');
const taskRouter = require('./routes/task.router')
const cors = require('cors');
const path = require('path');
const { auth, requiresAuth } = require('express-openid-connect');
const morgan = require('morgan')

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.DOMAIN
  };

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com","https://platform-lookaside.fbsbx.com","https://avatars.githubusercontent.com"]
  }
}));

app.use(cors());
app.use(auth(config));
app.use(morgan('combined'))
app.use(express.json());

app.use('/api/task', taskRouter);
app.use(express.static(path.join(__dirname, '..', 'public')))
app.get('/authenticated', (req, res) => {
    res.json(req.oidc.isAuthenticated() ? true : false);
  });

  app.get('/profile', requiresAuth(), (req, res) => {
    const user = req.oidc.user
    res.json(user);
  });
module.exports = app;