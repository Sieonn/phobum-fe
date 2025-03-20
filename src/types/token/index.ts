export interface Token {
    acessToken: string;
    refreshToken: string;
}

export interface TokenResponse {
    id: number;
    nickname: string;
    email?: string;
    provider?: string;
    accessToken?: string;
    refreshToken?: string;
  }