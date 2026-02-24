export type IRequest = {
  raw: any;
  query?: object;
  body?: object;
};

export type IResponse = {
  raw: any;
  status: (status: number) => IResponse;
  send: (result: string) => void;
};
