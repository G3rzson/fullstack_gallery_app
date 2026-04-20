export type RoleType = "ADMIN" | "USER";

export type UserObjType = {
  username: string;
  role: RoleType;
};

export type GalleryTitleType = {
  _id: string;
  gallery: string;
  isPublic: boolean;
};
