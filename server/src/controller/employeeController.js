const employeeModel = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const validator = require("../validator/validations");


const register = async (req, res) => {
    try {
        const data = req.body

        let { firstName, lastName, email, phone, password } = req.body
        console.log(data)

        // checking if user does not enters any data
        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, message: "No data provided" }) }

        // checking for fname 
        if (!(validator.isPresent(firstName))) { return res.status(400).send({ status: false, message: "please enter first name" }) }

        // checking for lname 
        if (!(validator.isValid(lastName))) { return res.status(400).send({ status: false, message: "please enter last name" }) }

        // checking for email
        if (!(validator.isValid(email))) { return res.status(400).send({ status: false, message: "please enter email" }) }
        if (!(validator.isEmailValid(email))) { return res.status(400).send({ status: false, message: "please enter valid Email" }) }

        const duplicateEmail = await employeeModel.findOne({ email: email });
        if (duplicateEmail) { return res.status(400).send({ status: false, message: "Email is already exist" }) };

        // checking for phone
        if (!(validator.isValid(phone))) { return res.status(400).send({ status: false, message: "please enter phone no." }) }

        if (!(validator.isPhoneValid(phone))) { return res.status(400).send({ status: false, message: "please enter valid phone" }) }

        const duplicatePhone = await employeeModel.findOne({ phone: data.phone });
        if (duplicatePhone) { return res.status(400).send({ status: false, message: "phone is already exist" }) };

        // checking for password
        if (!password) return res.status(400).send({ status: false, message: "please enter password" })

        if (!validator.validPassword(password)) {
            return res.status(400).send({ status: false, message: 'Password should be of minimum 8 characters & maximum 15 characters' })
        }

        const result = await employeeModel.create(data)
        res.status(201).send({ status: true, message: "User created successfully", data: result })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const logIn = async (req, res) => {
    try {
        let { email, password } = req.body

        const user = await employeeModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).send({ status: false, message: "email or password is not correct" });
        }
        let token = jwt.sign({
            userId: user._id.toString(),
            iat: Math.floor(Date.now() / 1000)
        }, process.env.SECRET_KEY);
        console.log(token);

        res.cookie("employee", token, {
            expiresIn: new Date(Date.now() + 2592000000),
            httpOnly: true
        });

        res.status(200).send({ status: true, message: "User Logged in Successfully", data: { userId: user._id, token: token } });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getEmployee = async (req, res) => {
    try {
        let userId = req.params.userId

        // checking weather id is valid or not
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId." })
        }
        let result = await employeeModel.findById(userId)
        if (!result) {
            return res.status(404).send({ status: false, message: "No user Found" });
        }
        res.status(200).send({ status: true, data: result })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const data = req.body
        const userIdFromParams = req.params.userId;
        let { firstName, lastName, email, phone, password } = req.body;

        const updatedData = {};

        if (!validator.isValidObjectId(userIdFromParams)) {
            return res.status(400).send({ status: false, message: "Valid userId is required" })
        }

        let checkUserId = await employeeModel.findById(userIdFromParams)
        if (!checkUserId) return res.status(404).send({ status: false, message: "employee not found" });

        if (firstName) {
            if (!(validator.isValid(firstName))) { return res.status(400).send({ status: false, message: "please enter first name" }) }

            updatedData["firstName"] = firstName;
        }

        if (lastName) {
            if (!(validator.isValid(lastName))) { return res.status(400).send({ status: false, message: "please enter last name" }) }

            updatedData["lastName"] = lastName;
        }
        if (email) {
            if (!(validator.isEmailValid(email))) { return res.status(400).send({ status: false, message: "please enter last name" }) }

            const duplicateEmail = await employeeModel.findOne({ email: email });
            if (duplicateEmail) { return res.status(400).send({ status: false, message: "Email is already exist" }) };

            updatedData["email"] = email;
        }
        if (phone) {
            if (!(validator.isPhoneValid(phone))) { return res.status(400).send({ status: false, message: "please enter valid phone" }) }

            const duplicatePhone = await employeeModel.findOne({ phone: phone });
            if (duplicatePhone) { return res.status(400).send({ status: false, message: "phone is already exist" }) };

            updatedData["phone"] = phone;
        }
        if (password) {
            // checking for password
            if (!password) return res.status(400).send({ status: false, message: "please enter password" })

            if (!validator.validPassword(password)) {
                return res.status(400).send({ status: false, message: 'Password should be of minimum 8 characters & maximum 15 characters' })
            }
            updatedData["password"] = phone;
        }
        let updateUser = await employeeModel.findByIdAndUpdate({ _id: userIdFromParams }, { ...data }, { new: true })
        res.status(200).send({ status: true, data: updateUser })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const userIdFromParams = req.params.userId;

        if (!validator.isValidObjectId(userIdFromParams)) {
            return res.status(400).send({ status: false, message: "Valid userId is required" })
        }
        let checkUserId = await employeeModel.findById(userIdFromParams)
        if (!checkUserId) return res.status(404).send({ status: false, message: "employee not found" });

        const deleteEmployee = await employeeModel.deleteOne({_id:userIdFromParams})
        return res.status(200).send({status:true, message:"Delete Employee Data Successfully"})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { register, logIn, getEmployee, updateEmployee, deleteEmployee }