import { fetchGitHubUser, fetchUserLanguages } from '../src/github';

test('fetchGitHubUser should return user data for valid username', async () => {
  const user = await fetchGitHubUser('octocat');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('location');
});

test('fetchUserLanguages should return an array of languages for a valid user', 
  async () => {
    const languages = await fetchUserLanguages('octocat');
    expect(Array.isArray(languages)).toBe(true);
    expect(languages.length).toBeGreaterThan(0);
  }
);