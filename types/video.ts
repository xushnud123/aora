import { User } from "./user";

export interface Posts {
  $id: string;
  title: string;
  prompt: string;
  thumbnail: string;
  video: string;
  postId: string;
  bookmark?: false;
  creator: Pick<User, "username"> & { avatar: string };
}
