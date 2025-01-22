import Mail from "nodemailer/lib/mailer/index.js";
import transport from "../config/smtp.config.js";


class MailService{

    public sendMail = async ( mailOptions:Mail.Options )=>{

        await transport.sendMail(mailOptions );
    }
}

const mailService = new MailService();

export { mailService};
