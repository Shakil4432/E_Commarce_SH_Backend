export type TErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  error?: {
    details?: any;
  };
  stack: string;
};
