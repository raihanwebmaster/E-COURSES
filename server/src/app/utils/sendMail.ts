/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer, {Transporter} from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import config from '../config';

interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: {[key: string]: any}
}

export const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: config.smtp_host,
        port: parseInt(config.smtp_port || '587'),
        service: config.smtp_service,
        auth: {
            user: config.smtp_mail,
            pass: config.smtp_password
        }
    })
    const {email, subject, template, data} = options;

    // get the path to email template file 
    const templatePath = path.join(__dirname, "../mails", template);

    // Render the email template with EJS 
    const html:string = await ejs.renderFile(templatePath, data);
    const mailOptions = {
        from: config.smtp_mail,
        to: email,
        subject,
        html
    }
    await transporter.sendMail(mailOptions);

}