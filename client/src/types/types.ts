export type RoleType = "ADMIN" | "USER";

export type UserObjType = {
  username: string;
  role: RoleType;
};

export type ModeType = "public" | "my";

export type GalleryTitleType = {
  _id: string;
  gallery: string;
  isPublic: boolean;
};

export type GalleryImageType = {
  _id: string;
  publicId: string;
  publicUrl: string;
  originalName: string;
  mimetype: string;
  size: number;
  galleryId: string;
  createdBy: string;
};

export type BaseResponseType = {
  success: boolean;
  message: string;
};

export type ResponseWithDataType<T> = BaseResponseType & {
  data: T;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    userObj: { username: string; role: "USER" | "ADMIN" };
  };
};
