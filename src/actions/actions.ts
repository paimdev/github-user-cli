import { addLanguage,
  addUser,
  getUsers,
  getUsersByLanguage,
  getUsersByLocation
} from '../db';
import { fetchGitHubUser, fetchUserLanguages } from '../github';

export const handleUser = async (username: string) => {
  const user = await fetchGitHubUser(username);
  const languages = await fetchUserLanguages(username);

  const dbUser = await addUser(user.name || user.login,
    user.location,
    user.login
  );

  for (const lang of languages) {
    await addLanguage(dbUser.id, lang);
  }

  console.log(`Fetched and stored user: ${user.name}`);
};

export const handleList = async (location?: string, language?: string) => {
  if (location && language) {
    const usersByLocation = await getUsersByLocation(location);
    const usersByLanguage = await getUsersByLanguage(language);

    const commonUsers = usersByLocation.filter(user => 
      usersByLanguage.some(langUser => langUser.id === user.id)
    );
        
    console.log(commonUsers);
  } else if (location) {
    const users = await getUsersByLocation(location);
    console.log(users);
  } else if (language) {
    const users = await getUsersByLanguage(language);
    console.log(users);
  } else {
    const users = await getUsers();
    console.log(users);
  }
};