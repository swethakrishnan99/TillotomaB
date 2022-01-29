const admin = require("../../model/adminSchema");
const bcrypt = require("bcrypt");

const handleNewAdmin = async (req, res) => {
    const {
        name,
        email,
        password,
        phone,
        nationality,
        whatsapp,
        dob,
        country,
    } = req.body;
    if (!name || !password || !email || !phone || !dob || !nationality || !country)
        return res.status(400).json({ message: "please fill all the mandatory fields" });

    // password validation
    const isPasswordSecure = (password) => {
        const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        return re.test(password);
    };
    if (!isPasswordSecure(password))
        return res.status(400).json({ message: "enter valid password" });


    // check for duplicate emails in the db
    const duplicate = await admin.findOne({ email });
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await admin.create({
            name,
            email,
            phone,
            password: hashedPwd,
            nationality,
            whatsapp,
            dob,
            countryOfResidence: country,
        });

        console.log(result);

        res.status(201).json({ success: `New admin user ${result} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewAdmin };
