// Take value from localStorage
export const takeValueFromLocalStorage = (keyItem: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(keyItem);
    if (item) {
      const key = JSON.parse(item) || {};
      const { refreshToken, accessToken } = key;
      return { key, refreshToken, accessToken };
    }
  }
  return { key: {}, refreshToken: '', accessToken: '' };
};
