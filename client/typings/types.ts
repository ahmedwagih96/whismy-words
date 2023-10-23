export interface AuthForm {
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
}

export type Params = string | string[];

export interface ResetPasswordForm {
  email: string;
  password: string;
  verifyPassword: string;
}

export interface SearchParamsType {
  category: string;
  limit: string;
  sort: string;
  pageNumber: string
  
}