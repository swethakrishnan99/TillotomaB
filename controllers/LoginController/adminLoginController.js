const admin = require('../../model/adminSchema')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    // find matching users
    const match = await admin.findOne({ email });
    if (!match) return res.status(400).json({ message: "user not found" })
    else
        if (await bcrypt.compare(password, match.password)) {
            res.status(200).json({ message: "success" })
        }
        else {
            res.status(409).json({ message: "incorrect password" })
        }

}

module.exports = { handleLogin }