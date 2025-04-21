import { api } from '../index';
import { AUTH } from '../endpoints';
import { SignupRequest, LoginRequest, CheckEmailRequest, CheckNicknameRequest } from './types';

export const authApi = {
  signup: (data: SignupRequest) => 
    api.post(AUTH.SIGNUP, data),

  kakaoSignup: (nickname: string) => 
    api.post(AUTH.KAKAO_SIGNUP, { nickname }),

  checkEmail: (data: CheckEmailRequest) =>
    api.get(`${AUTH.CHECK_EMAIL}/${data.email}`),

  // 변경된 부분
  checkNickname: (data: CheckNicknameRequest) =>
    api.get(`${AUTH.CHECK_NICKNAME}/${data.nickname}`),

  getMe: () => 
    api.get(AUTH.ME),

  login: (data: LoginRequest) => 
    api.post(AUTH.LOGIN, data),

  delete: () =>
    api.delete(AUTH.ME),
};