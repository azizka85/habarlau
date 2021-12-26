import { Session } from "../../data/session";
import { User } from "../../data/user";

export function setAccessToken(
  session: Session,
  oauthApp: string,
  accessToken: string,
  tokenType: string,
  scope: string,
  user: User
) {
  session.oauthApp = oauthApp;
  session.accessToken = accessToken;
  session.tokenType = tokenType;
  session.scope = scope;
  session.user = user;
}

export function signOut(session: Session) {
  session.oauthApp = undefined;
  session.accessToken = undefined;
  session.tokenType = undefined;
  session.scope = undefined;
  session.user = undefined;
}