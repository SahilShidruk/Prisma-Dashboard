require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');
const { sign } = require('jsonwebtoken');
require('./database/mongoose.js').connect();
const authSchema = require('./models/AuthSchema.js')
const userSchema = require('./models/UserSchema.js');
const authenticate = require('./middlewares/authenticate');

const app = new Koa();
const router = new Router();

app.use(
  cors({
    credentials: true
  })
);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.use(authenticate);

router.get('/user/me', async ctx => {
  ctx.body = ctx.state.user;
});

router.get('/api/auth/discord/redirect', async ctx => {
  if (!ctx.query.code) throw new Error('Code not provided.');

  const { code } = ctx.query;
  const params = new URLSearchParams({
    client_id: process.env.clientId,
    client_secret: process.env.clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:3000/api/auth/discord/redirect'
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/x-www-form-urlencoded'
  };

  const response = await axios.post(
    'https://discord.com/api/oauth2/token',
    params,
    {
      headers
    }
  );

  const userResponse = await axios.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${response.data.access_token}`,
      ...headers
    }
  });
  const { access_token, refresh_token} = response.data;
  const { id, username, avatar } = userResponse.data;
  const checkIfAuthExists = await authSchema.findOne({
    discordId: id
  })
  if (checkIfAuthExists) {
    await authSchema.findOneAndUpdate({
      discordId: id,
      access_token: access_token,
      refresh_token: refresh_token
    })
  } else {
    await authSchema.create({
      discordId: id,
      access_token: access_token,
      refresh_token: refresh_token
    })
  }
  
  const checkIfUserExists = await userSchema.findOne({
    discordId: id
  })

  if (checkIfUserExists) {
    await userSchema.findOneAndUpdate({
      discordId: id,
      discordName: username,
      avatar: avatar
    })
  } else {
    await userSchema.create({
      discordId: id,
      discordName: username,
      avatar: avatar
    })
  }

  const token = await sign({ sub: id }, process.env.jwt_secret, {
    expiresIn: '7d'
  });

  ctx.cookies.set('token', token);
  ctx.redirect(process.env.client_redirect_uri);
});

app.listen(3000, () => {
  console.log('Server Is running ln port 3000')
});
