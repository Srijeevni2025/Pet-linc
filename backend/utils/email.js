const nodemailer = require("nodemailer");
const ejs = require("ejs")


class Email{
    constructor(headerData){
        this.to = headerData.to;
        this.PartnerName = headerData.partnerName;
        this.from = `Petlinc <${process.env.EMAIL_FROM}>`
    }

    newTransport(){
        return nodemailer.createTransport({
            host:process.env.MAILTRAP_HOST,
            port:process.env.MAILTRAP_PORT,
            auth:{
                user:process.env.MAILTRAP_USER,
                pass:process.env.MAILTRAP_PASS
            }
        })
    }

    async sendWelcome(template, subject){
         // rendering the HTML based on ejs template
         const htmlEmail = await ejs.renderFile(`${__dirname}/../views/emails/${template}.ejs`, {
            partnerName: this.PartnerName
         })
         
         const mailOptions = {
            to:this.to,
            from:this.from,
            html:htmlEmail
         }

         await this.newTransport().sendMail(mailOptions);
    }
}

module.exports = Email;