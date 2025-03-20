import { api } from '../index';
import { AUTH } from '../endpoints';
import { SignupRequest, LoginRequest, CheckEmailRequest, CheckNicknameRequest } from './types';

export const authApi = {
  signup: (data: SignupRequest) => 
    api.post(AUTH.SIGNUP, data),

  kakaoSignup: (nickname: string) => 
    api.post(AUTH.KAKAO_SIGNUP, { nickname }),

  checkEmail: (data: CheckEmailRequest) =>
    api.post(AUTH.CHECK_EMAIL, data),

  checkNickname: (data: CheckNicknameRequest) =>
    api.post(AUTH.CHECK_NICKNAME, data),

  getMe: () => 
    api.get(AUTH.ME),

    login: (data: LoginRequest) => 
    api.post(AUTH.LOGIN, data),

    delete: () =>
    api.delete(AUTH.ME),
};