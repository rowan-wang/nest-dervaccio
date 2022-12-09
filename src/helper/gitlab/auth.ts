import { methodV } from '@/utils/request';

export const getUserToken = async ({ username, password }) => {
  const { data: token } = await methodV({
    url: `/oauth/token`,
    method: 'POST',
    params: {
      grant_type: 'password',
      username,
      password,
    },
  });
  if (token && token.access_token) {
    return token;
  }
  return false;
};
