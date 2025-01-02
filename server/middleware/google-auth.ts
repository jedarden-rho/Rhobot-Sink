import { OAuth2Client } from 'google-auth-library';
import { createError, eventHandler } from 'h3';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export default eventHandler(async (event) => {
  const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw createError({
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload?.hd !== 'rho.co') {
      throw createError({
        status: 403,
        statusText: 'Forbidden',
      });
    }
  } catch (error) {
    throw createError({
      status: 401,
      statusText: 'Invalid token',
    });
  }
});
