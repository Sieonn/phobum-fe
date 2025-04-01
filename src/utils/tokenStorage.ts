let accessToken: string | null = null;

export const tokenStorage = {
  setAccessToken: (token: string) => {
    accessToken = token;
  },
  
  getAccessToken: () => accessToken,
  
  setRefreshToken: (token: string) => {
    sessionStorage.setItem('refreshToken', token);
  },
  
  getRefreshToken: () => sessionStorage.getItem('refreshToken'),
  
  clearTokens: () => {
    accessToken = null;
    sessionStorage.removeItem('refreshToken');
  }
};