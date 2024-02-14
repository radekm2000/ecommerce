import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class NodemailerService {
  async sendEmail(userEmail: string, itemDescription: string[]) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_EMAIL_PASSWORD,
        },
      });
      const mail_configs: {
        from: string;
        to: string;
        subject: string;
        html: string;
      } = {
        from: process.env.MY_EMAIL,
        to: userEmail,
        subject: `Product purchase`,
        html: `Thank you for your purchase, you bought ${itemDescription}`,
      };

      transporter.sendMail(mail_configs, (err) => {
        if (err) {
          return reject({ message: 'error while sending email occured' });
        }
        return resolve({
          message: `Email sent succesfully to ${mail_configs.to}`,
        });
      });
    });
  }
}
