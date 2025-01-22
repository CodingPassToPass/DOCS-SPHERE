import { createTransport} from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth:{
        user: "fakersoftwaretesting3000@gmail.com",
        pass: "111111112222222212",
    },
    secure: true
});

export default transport;


