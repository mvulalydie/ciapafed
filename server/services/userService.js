import { getUserByEmail } from '../models/userModel.js';

export async function findUserByEmail(email) {
  return getUserByEmail(email);
}
