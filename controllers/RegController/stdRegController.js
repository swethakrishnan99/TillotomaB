const student = require("../../model/studentSchema");
const bcrypt = require("bcrypt");

const handleNewStudent = async (req, res) => {
    const {
        name,
        email,
        password,
        phone,
        dob,
        whatsapp,
        nationality,
        country,
        education,
        occupation,
        language,
    } = req.body;
    if (!name || !password || !email || !phone || !dob || !nationality || !education || !occupation || !country)
        return res.status(400).json({ message: "please fill all the mandatory fields" });

    // password validation
    const isPasswordSecure = (password) => {
        const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        return re.test(password);
    };
    if (!isPasswordSecure(password))
        return res.status(400).json({ message: "enter valid password" });


    // check for duplicate emails in the db
    const duplicate = await student.findOne({ email });
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await student.create({
            name,
            email,
            phone,
            dob,
            password: hashedPwd,
            whatsapp,
            nationality,
            education,
            presentOccupation: occupation,
            countryOfResidence: country,
            language,
        });

        console.log(result);

        res.status(201).json({ success: `New student user ${result} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewStudent };
