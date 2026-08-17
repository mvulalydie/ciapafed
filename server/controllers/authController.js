import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, listUsers, deleteUserById } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Set process.env.JWT_SECRET in production.');
}

export async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Identifiants invalides.' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ message: 'Identifiants invalides.' });

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET || 'dev-secret', { expiresIn: '8h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 3600 * 1000
  });

  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function register(req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Registration disabled in production.' });
  }

  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis.' });

  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ message: 'Utilisateur deja existant.' });

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser({ email, name, passwordHash: hash });
  res.status(201).json({ user: { id: user.id, email: user.email } });
}

export function logout(req, res) {
  res.cookie('token', '', { maxAge: 0 });
  res.json({ message: 'Deconnecte' });
}

export function me(req, res) {
  if (!req.user) return res.status(401).json({ message: 'Non authentifie' });
  res.json({ user: req.user });
}

export async function getUsers(req, res) {
  const users = await listUsers();
  res.json(users);
}

export async function createAdminUser(req, res) {
  const { email, password, name, role } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ message: 'Utilisateur deja existant.' });

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser({ email, name, passwordHash: hash, role: role || 'admin' });
  res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
}

export async function deleteAdminUser(req, res) {
  const { id } = req.params;

  if (Number(req.user?.sub) === Number(id)) {
    return res.status(400).json({ message: 'Vous ne pouvez pas supprimer votre propre compte.' });
  }

  const removed = await deleteUserById(id);
  if (!removed) return res.status(404).json({ message: 'Utilisateur introuvable.' });

  res.json(removed);
}
