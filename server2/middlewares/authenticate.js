const userSchema = require('../models/UserSchema.js')
const { verify } = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  const token = ctx.cookies.get('token');
 // console.log(token);

  try {
    const { sub } = await verify(token, process.env.jwt_secret);
    ctx.state.user = await userSchema.findOne({
      discordId: sub
    })
  } catch (e) {
    ctx.state.user = null;
  }

  await next();
};
