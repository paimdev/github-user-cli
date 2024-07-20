import axios from 'axios';

export const fetchGitHubUser = async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const fetchUserLanguages = async (username: string) => {
  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  const languages = new Set<string>();
  
  for (const repo of reposResponse.data) {
    const repoLanguagesResponse = await axios.get(repo.languages_url);
    Object.keys(repoLanguagesResponse.data).forEach(lang => 
      languages.add(lang)
    );
  }
  
  return Array.from(languages);
};
