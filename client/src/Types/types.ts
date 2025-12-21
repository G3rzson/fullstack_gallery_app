export type GaleryTitleType = {
  _id: string;
  galeryTitle: string;
  path: string;
  url: string;
  createdBy: string;
  isPrivate: boolean;
};

export type GaleryImageType = {
  _id: string;
  filename: string;
  url: string;
  galeryUrl: string;
  createdBy: string;
};

type BaseResponseType = {
  success: boolean;
  message: string;
};

export type UserObjType = {
  username: string;
  role: "admin" | "user";
};

export type WithAuthDataType = {
  accessToken: string;
  userObj: UserObjType;
};

export type BackendResponseType<T = undefined> = BaseResponseType &
  (T extends undefined ? {} : { data: T });
