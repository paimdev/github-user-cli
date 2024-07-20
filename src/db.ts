import pgPromise from 'pg-promise';
import { config } from 'dotenv';

config();

const pgp = pgPromise();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const db = pgp(DATABASE_URL);

export const addUser = async (
  name: string, 
  location: string, 
  githubUsername: string
) => {
  const query = `
      INSERT INTO users(name, location, github_username) 
      VALUES($1, $2, $3) 
      RETURNING id
    `;
  return db.one(query, [name, location, githubUsername]);
};

export const addLanguage = async (userId: number, language: string) => {
  return db.none(
    'INSERT INTO languages(user_id, language) VALUES($1, $2)',
    [userId, language]
  );
};

export const getUsers = async () => {
  return db.any('SELECT * FROM users');
};

export const getUsersByLocation = async (location: string) => {
  return db.any('SELECT * FROM users WHERE location = $1', [location]);
};

export const getUsersByLanguage = async (language: string) => {
  return db.any(
    `SELECT u.* FROM users u
     JOIN languages l ON u.id = l.user_id
     WHERE l.language = $1`,
    [language]
  );
};
