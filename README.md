# Github User CLI

## Description

This command-line application fetches information about a given GitHub user and stores it in a PostgreSQL database. It can also list users by location and programming languages.

## Setup

1. Clone the repository:

   ```sh
   git clone <repo-url>
   cd github-user-fetcher
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure the database:

   - Set up PostgreSQL and create a database.
   - Create a `.env` file with the database URL:
     ```ini
     DATABASE_URL=postgres://username:password@localhost:5432/github_users
     ```

4. Transpiling to JS:

   ```sh
   npx tsc
   ```

5. Run database migrations:

   ```sh
   npx ts-node ./src/migrate.ts
   ```

   or after transpiling to JS

   ```sh
   npx node ./dist/migrate.js
   ```

## Usage

- **Fetch GitHub User**

  ```sh
  npx node ./dist/main.ts fetch --username <github-username>
  ```

- **List All Users**

  ```sh
  npx node ./dist/main.ts list
  ```

- **List Users by Location**

  ```sh
  npx node ./dist/main.ts list --location <location>
  ```

- **List Users by Language**

  ```sh
  npx node ./dist/main.ts list --language <language>
  ```

## Testing

Run tests using Jest:

```sh
npm test
```
