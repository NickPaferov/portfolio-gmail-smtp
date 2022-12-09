const express = require('express')
const nodemailer = require("nodemailer")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())
console.log()
const smtp_login = process.env.SMTP_LOGIN || "---"
const smtp_password = process.env.SMTP_PASSWORD || "---"

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail", // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    let {name, email, messageText} = req.body
// send mail with defined transport object
    let info = await transporter.sendMail({
        from: "HR", // sender address
        to: "paferov_nikolai@mail.ru", // list of receivers
        subject: "Offer", // Subject line
        // text: "My first server for app portfolio", // plain text body
        html: `<b>Message from my portfolio</b>
                <div>name: ${name}</div>
                <div>email: ${email}</div>
                <div>message: ${messageText}</div>
              `, // html body
    });

    res.send('Message has been sent')
})

const port = process.env.PORT || 3010

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
