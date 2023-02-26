const nodeMailer=require("nodemailer");
const {Response}=require("../utils/response.js");

const sendEmail = async (mailOptions,res) => {
    const transporter = await nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Hata Çıktı Mail Gönderilemedi : ", error);
            return new Response(null,"Hata Çıktı Mail Gönderilemedi").error400(res);
        }
        console.log("info : ",info);
        return true;
    })
}


module.exports={sendEmail};