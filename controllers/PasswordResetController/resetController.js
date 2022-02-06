const jwt = require("jsonwebtoken");
const student = require("../../model/studentSchema");
const faculty = require("../../model/facultySchema");
const admin = require("../../model/adminSchema");
const nodemailer = require("nodemailer");
const cors = require('cors')
require("dotenv").config()
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: { user: "tillotoma@hotmail.com", pass: "TF@tf1234" },
});


const forgotPassword = async (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const user = req.body.user;
    // const { email, user } = req.body;
    console.log(email, "-email", user, "-userSchema")

    // find schema
    let userSchema = admin;
    if (user == "student") {
        console.log("entered")

        userSchema = student;
    }
    else if (user == "faculty") {
        console.log("entered")

        userSchema = faculty;
    }

    else if (userSchema == "admin") {
        console.log("entered")
        userSchema = admin;
    }


    const match = await userSchema.findOne({ email });
    if (!match) return res.status(400).json({ message: "user not found" });
    const secret = process.env.RESET_KEY + match.password;
    const payload = { email: match.email, id: match.id };
    const token = jwt.sign(payload, secret, { expiresIn: "20m" });
    const options = {
        from: "tillotoma@hotmail.com",
        to: match.email,
        subject: "Reset password",
        html: `<p>Please click on the link to reset your password</p>
        <a href="${process.env.CLIENT_URL}/reset-password.html?user=${user}&token=${token}"> Click here</a>`,
    };

    const update = await userSchema.updateOne({ id: match.id }, { $set: { resetLink: token } })
    if (!update) res.status(400).json({ error: "reset password link error" })
    else {
        transporter.sendMail(options, (error, info) => {
            if (error) throw error;
            return res.status(200).json({ message: "Email has been sent, please follow the instruction" })

        })
    }

}


const resetPassword = async (req, res) => {
    const { resetLink, user, password } = req.body;
    let userSchema = null;
    if (user === "student")
        userSchema = student;
    else if (user === "faculty")
        userSchema = faculty;
    else if (userSchema === "admin")
        userSchema = admin;
    // password validation
    const isPasswordSecure = (password) => {
        const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        return re.test(password);
    };
    if (!isPasswordSecure(password))
        return res.status(400).json({ message: "enter valid password" });

    if (resetLink) {
        // find user with resetLink
        const match = await userSchema.findOne({ resetLink });
        if (!match) return res.status(400).json({ message: "incorrect token or it is expired" });
        const secret = process.env.RESET_KEY + match.password;
        const decodedData = await jwt.verify(resetLink, secret)
        if (!decodedData) return res.status(401).json({ message: "something went wrong, Please try again" })

        // update user password
        const update = await userSchema.updateOne({ resetLink }, { $set: { password } })
        if (!update) res.status(400).json({ error: "User with the token doesn't exist" })
        return res.status(200).json({ message: "password updated successfully" })
    }

    else {
        return res.status(401).json({ error: "Authentication error !!" })
    }
}
module.exports = { forgotPassword, resetPassword };

// jwt.verify(resetLink, process.env.RESET_KEY, (error, decodedData) => {
//     if (error) {
//         console.log(error.response)
//         return res.status(401).json({ message: "incorrect token or it is expired" })
//     }
//     // update password
//     const update = userSchema.updateOne({ resetLink }, { $set: { password } })
//     if (!update) res.status(400).json({ error: "User with the token doesn't exist" })
//     return res.status(200).json({ message: "password updated successfully" })

// })