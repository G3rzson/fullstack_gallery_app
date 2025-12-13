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
