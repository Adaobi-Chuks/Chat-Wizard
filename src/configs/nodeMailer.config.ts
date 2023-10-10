import nodemailer from "nodemailer";

//Transporter Creation
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "chuksaginamada@gmail.com",
        pass: "zoicpzhzechmyxrb",
    },
});

export {
    transporter
}
