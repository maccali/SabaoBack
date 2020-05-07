const path = require('path')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars');
const nodemailerhbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "72b2368914a90e",
        pass: "b47e1fff72221a"
    }
})

const viewPath = path.resolve(__dirname, '..', 'views', 'emails');

transport.use(
    'compile',
    nodemailerhbs({
        viewEngine: exphbs.create({
            layoutsDir: path.resolve(viewPath, 'layouts'),
            partialsDir: path.resolve(viewPath, 'partials'),
            defaultLayout: 'default',
            extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
    })
);


module.exports = transport