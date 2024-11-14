const express = require('express');
const axios = require('axios');
const url = require('url');
const { sign } = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./database/mongoose.js').connect();
const User = require('./models/AuthSchema.js');
const auth = require('./middlewares/auth.js');
const router = express.Router();
const cors = require('cors')
const Port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true
}))
router.use(auth);

app.get('/api/auth/discord/redirect', async (req, res) => {
  const { code } = req.query;

  if (code) {
    const formData = new url.URLSearchParams({
      client_id: process.env.clientId,
      client_secret: process.env.clientSecret,
      grant_type: 'authorization_code',
      code: code.toString(),
      redirect_uri: 'http://localhost:3000/api/auth/discord/redirect',
    });

    try {
      // Exchange code for access token
      const output = await axios.post('https://discord.com/api/v10/oauth2/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (output.data) {
        const { access_token } = output.data;

        // Fetch user info
        const userinfo = await axios.get('https://discord.com/api/v10/users/@me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const { id, username, avatar } = userinfo.data;

        // Update or create user in the database
        await User.findOneAndUpdate(
          { id },
          {
            access_token,
            username: username,
          },
          { new: true, upsert: true }
        );

        // Create JWT token
        const token = sign({ sub: id }, process.env.jwt_secret, {
          expiresIn: '5d',
        });

        // Set cookie with appropriate options
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });

        // Redirect to client
        res.redirect(process.env.client_redirect_uri);
      }
    } catch (error) {
      console.error('Error during OAuth process:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'No code provided' });
  }
});

app.listen(Port, () => {
  console.log(`Server Running on http://localhost:${Port}`);
});