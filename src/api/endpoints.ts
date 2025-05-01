export const AUTH = {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    KAKAO_SIGNUP: '/auth/kakao/signup',
    CHECK_EMAIL: '/auth/check-email',
    CHECK_NICKNAME: '/auth/check-nickname',
    ME: '/auth/me',
} as const;
  
// api/endpoints.ts
export const IMAGES = {
  UPLOAD: '/api/images',
  LIST: '/api/images',
  DETAIL: (id: string) => `/api/images/${id}`,
  UPDATE: (id: string) => `/api/images/${id}`,
  DELETE: (id: string) => `/api/images/${id}`,
  LIKE: (id: string) => `/api/images/${id}/like`,
  UNLIKE: (id: string) => `/api/images/${id}/like`
};