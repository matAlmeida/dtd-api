import Email, { EmailOptions } from 'email-templates';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { singleton } from '@keenondrums/singleton';

import { IMailProvider, IMessage } from '../IMailProvider';

import config from '@config';

@singleton
export class SMTPMailProvider<Context> implements IMailProvider<Context> {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      url: `smtp://${config.env.SMTP_USER}:${config.env.SMTP_PASS}@${config.env.SMTP_HOST}:${config.env.SMTP_PORT}`
    });
  }

  async sendMail(message: IMessage<Context>, templatesPath: string): Promise<void> {
    const email = new Email({
      message: {
        from: `"${message.from.name}" <${message.from.email}>`
      },
      send: true,
      transport: this.transporter,
      views: {
        root: templatesPath
      },
      preview: false
    });

    const mailOptions: EmailOptions<Context> = {
      message: {
        to: `"${message.to.name}" <${message.to.email}>`
      },
      template: message.template,
      locals: message.context
    };

    await email.send(mailOptions);
  }
}
