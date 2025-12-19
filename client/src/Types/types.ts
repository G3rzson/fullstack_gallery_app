export type GaleryTitleType = {
  _id: string;
  galeryTitle: string;
  path: string;
  url: string;
  createdBy: string;
};

export type GaleryImageType = {
  _id: string;
  filename: string;
  url: string;
  galeryUrl: string;
  createdAt?: Date;
};

type BaseResponseType = {
  success: boolean;
  message: string;
};

export type WithAuthDataType = {
  accessToken: string;
  username: string;
};

export type BackendResponseType<T = undefined> = BaseResponseType &
  (T extends undefined ? {} : { data: T });
