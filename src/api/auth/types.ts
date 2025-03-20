export interface SignupRequest {
    email: string;
    password: string;
    nickname: string;
  }
  
export interface LoginRequest {
    email: string;
    password: string;
  }
  
export interface CheckEmailRequest {
    email: string;
}
  
export interface CheckNicknameRequest {
    nickname: string;
}