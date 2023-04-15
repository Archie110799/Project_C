export type HTTPResult<T> = {
  data?: T;
  error?: Error | string;
};
