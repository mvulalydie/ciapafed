import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function authenticateToken(req, res, next) {
  const cookieToken = req.cookies && req.cookies.token;
  const auth = req.headers.authorization || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const token = cookieToken || bearer;

  if (!token) return res.status(401).json({ message: 'Token manquant.' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
}
