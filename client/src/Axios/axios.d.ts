import "axios";

// Extend AxiosRequestConfig to include a custom _retry property
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
