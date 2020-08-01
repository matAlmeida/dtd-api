interface IAddress {
  email: string;
  name: string;
}

export interface IMessage<Context> {
  to: IAddress;
  from: IAddress;
  template: string;
  context: Context;
}

export interface IMailProvider<Context> {
  sendMail(message: IMessage<Context>, templatesPath: string): Promise<void>;
}
