import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { handleList, handleUser } from './actions/actions';

interface FetchArgs {
  username: string;
}

interface ListArgs {
  location?: string;
  language?: string;
}

const argv = yargs(hideBin(process.argv))
  .command('fetch', 'Fetch a GitHub user', {
    username: {
      description: 'GitHub username',
      alias: 'u',
      type: 'string',
      demandOption: true
    }
  })
  .command('list', 'List users with optional filters', {
    location: {
      description: 'Location to filter by',
      alias: 'l',
      type: 'string'
    },
    language: {
      description: 'Language to filter by',
      alias: 'g',
      type: 'string'
    }
  })
  .help()
  .alias('help', 'h')
  .parseSync();

const main = async () => {
  const command = argv._[0] as string;

  if (command === 'fetch') {
    const args = argv as unknown as FetchArgs;
    const username = args.username;

    if (username) {
      try {
        handleUser(username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    } else {
      console.error('Username is required');
    }
  } else if (command === 'list') {
    const args = argv as unknown as ListArgs;
    const location = args.location;
    const language = args.language;

    try {
      handleList(location, language);
    } catch (error) {
      console.error('Error listing users:', error);
    }
  } else {
    console.error('Unknown command');
  }
};

main().catch(err => {
  console.error('Unhandled error:', err);
});
