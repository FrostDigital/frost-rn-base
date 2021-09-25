export interface ApiError {
  error: {
    code: string;
    title?: string;
    detail?: string;
  };
}
