import { User } from "./user";

export interface Session {
  oauthApp?: string;
  accessToken?: string;
  tokenType?: string;
  scope?: string;
  user?: User;
}