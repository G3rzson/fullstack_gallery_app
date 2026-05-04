export type RoleType = "ADMIN" | "USER";

// ha a userObj-et bővíted vigyázz mert a login response-ban is használva van, ha változik akkor ott is változtatni kell vagy átalakítani a login response-t hogy ne használja ezt a típust
export type UserObjType = {
  _id: string;
  username: string;
  role: RoleType;
};

export type GetDataType = "userData" | "titleData" | "imageData";

export type GalleryTitleType = {
  _id: string;
  galleryTitle: string;
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
    userObj: {
      _id: string;
      username: string;
      role: "USER" | "ADMIN";
    };
  };
};
