export type GaleryTitleType = {
  _id: string;
  galeryTitle: string;
  path: string;
  url: string;
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

export type WithAuthInfoType = {
  accessToken: string;
  user: string;
};

export type ResponseType<T = undefined> = BaseResponseType &
  (T extends undefined ? {} : { data: T });
