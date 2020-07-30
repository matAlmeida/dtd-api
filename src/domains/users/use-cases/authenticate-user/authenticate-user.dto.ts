export interface IAuthenticateUserRequestDTO {
  email: string;
  password: string;
}

export interface IAuthenticateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  session_token: string;
}

export interface ISessionParams {
  id: string;
}
