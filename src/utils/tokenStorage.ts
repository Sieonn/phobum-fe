let accessToken: string | null = null;

// export const tokenStorage = {
//   setAccessToken: (token: string) => {
//     accessToken = token;
//   },
  
//   getAccessToken: () => accessToken,
  
//   setRefreshToken: (token: string) => {
//     sessionStorage.setItem('refreshToken', token);
//   },
  
//   getRefreshToken: () => sessionStorage.getItem('refreshToken'),
  
//   clearTokens: () => {
//     accessToken = null;
//     sessionStorage.removeItem('refreshToken');
//   }
// };
export const tokenStorage = {
  setAccessToken: (token: string) =>
    sessionStorage.setItem('accessToken', token),
  setRefreshToken: (token: string) =>
    sessionStorage.setItem('refreshToken', token),
  getAccessToken: () => sessionStorage.getItem('accessToken'),
  getRefreshToken: () => sessionStorage.getItem('refreshToken'),
  clearTokens: () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  },

  isTokenValid: () => {
    const token = sessionStorage.getItem('accessToken');

    return token !== null;
  }
};
