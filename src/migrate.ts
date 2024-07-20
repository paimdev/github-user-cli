import * as fs from 'fs';
import * as path from 'path';
import pgPromise from 'pg-promise';
import { config } from 'dotenv';

config();

const pgp = pgPromise();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const db = pgp(DATABASE_URL);

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir);

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    await db.none(sql);
    console.log(`Applied migration: ${file}`);
  }
};

runMigrations().catch(err => {
  console.error('Migration failed', err);
  process.exit(1);
});
