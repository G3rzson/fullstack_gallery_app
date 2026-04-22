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
