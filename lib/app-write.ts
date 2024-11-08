import { CreatePost } from "@/app/(tabs)/create";
import { ImagePickerAsset } from "expo-image-picker";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "67289ba50018fff94ce9",
  databaseId: "67289e1300389e5c020c",
  usersCollectionId: "67289e4e003860f649e7",
  videosCollectionId: "67289e96001547ab3c29",
  storageId: "6728a3a2000497cced37",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const createUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn({ email, password });

    const user = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );
    return user;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSearchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFilePreview = async ({
  fileId,
  type,
}: {
  fileId: any;
  type: "video" | "image";
}) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = await storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = await storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const uploadFile = async ({
  file,
  type,
}: {
  file: ImagePickerAsset;
  type: "video" | "image";
}) => {
  if (!file) return;

  try {
    // @ts-ignore
    const name = `${Date.now().toString()}.${file.uri
      ?.split(".")
      ?.pop()
      .toLowerCase()}`;

    console.log(name);
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      {
        name: (file.fileName as string) || name,
        type: file.mimeType as string,
        size: file.fileSize as number,
        uri: file.uri,
      }
    );
    const fileUrl = await getFilePreview({
      fileId: uploadedFile.$id,
      type,
    });
    return fileUrl;
  } catch (error: any) {
    console.log(type, error);
    throw new Error(error);
  }
};

export const createVideoPost = async (
  form: CreatePost & { userId: string }
) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile({ file: form.thumbnail, type: "image" }),
      uploadFile({ file: form.video, type: "video" }),
    ]);
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};
