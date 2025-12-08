export type GaleryTitleType = {
  _id: string;
  galeryTitle: string;
  path: string;
  url: string;
};

export type BackendAnswerGaleryTitleType = {
  success: boolean;
  galeryTitles: GaleryTitleType[];
};

export type GaleryImagesType = {
  _id: string;
  filename: string;
  url: string;
  galeryUrl: string;
  createdAt?: Date;
};

export type BackendAnswerGaleryImagesType = {
  success: boolean;
  images: GaleryImagesType[];
};
