// #!/usr/bin/env node
import * as fs from "fs";


import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yosihofman21@gmail.com",
    pass: process.env.PASS,
  },
});

let mailOptions = {
  from: "yosihofman21@gmail.com",
  to: `yossihofman2@gmail.com`,
  subject: "מייל",
  text: "",
  //   attachments:
  //     [
  //       {
  //         filename: `blessByCLI_${friendsArray[i].name}.docx`,
  //         path: `c:/blessByCLI_${friendsArray[i].name}.docx`,
  //         contentType: 'application/doc',
  //       },
  //       {
  //         filename: 'shanatova.jpg',
  //         path: 'c:/shanatova.jpg',
  //       }
  //     ],
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log(
      `Email sent to ${mailOptions.to}: ${info.response} SUCCESS!`
    );
  }
});
//   } else {
//     console.log(`${friendsArray[i].name} does not have an email box!`);
//   };
// };

export default mail
