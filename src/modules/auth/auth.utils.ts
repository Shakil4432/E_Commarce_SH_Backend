import jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  const Token = jwt.sign(jwtPayload, secret, {
    expiresIn,
  });

  return Token;
};
