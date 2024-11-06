import { User } from "./user";

export interface Posts {
  $id: string;
  title: string;
  prompt: string;
  thumbnail: string;
  video: string;
  creator: Pick<User, "username"> & { avatar: string };
}
