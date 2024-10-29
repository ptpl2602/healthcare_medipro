export type ResponseBase<TData> = {
  statusCode: number;
  message: string;
  data?: TData | null;
};