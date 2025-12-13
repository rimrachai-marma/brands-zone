import { User } from "./users";

export default interface LoginSignUpData {
  user: User;

  access_token: {
    token: string;
    token_type: string;
  };
}
