const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");
const validUrl = require("valid-url");
const validator = require("../validator/validations");


const createCompany = async (req, res) => {
    try {
        const { name, email, logoLink, website } = req.body;

        // checking if user does not enters any data
        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, message: "No data provided" }) }

        // checking for name 
        if (!(validator.isValid(name))) { return res.status(400).send({ status: false, message: "please enter name" }) }

        const duplicateCompanyName = await companyModel({ name: name })
        if (!duplicateCompanyName) return res.status(400).send({ status: true, Message: "This Company Name is Already taken" })

        // checking for email
        if (!(validator.isValid(email))) { return res.status(400).send({ status: false, message: "please enter email" }) }
        if (!(validator.isEmailValid(email))) { return res.status(400).send({ status: false, message: "please enter valid Email" }) }

        const duplicateEmail = await companyModel.findOne({ email: email });
        if (duplicateEmail) { return res.status(400).send({ status: false, message: "Email is already exist" }) };

        if (!logoLink) return res.status(400).send({ status: false, Message: "logoLink is required....." });

        if (!website) return res.status(400).send({ status: false, Message: "website is required....." });
        if (!validUrl.isWebUri(website)) return res.status(400).send({ status: false, Message: "website should be valid" })

        const newCompany = await companyModel.create(req.body)
        res.status(200).send({ status: "success", Message: "New Company is Added", data: newCompany })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;

        // checking weather id is valid or not
        if (!validator.isValidObjectId(companyId)) {
            return res.status(400).send({ status: false, message: "Invalid userId." })
        }
        let result = await companyModel.findById(companyId);
        if (!result) {
            return res.status(404).send({ status: false, message: "No company Found" });
        }
        res.status(200).send({ status: true, data: result })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;

        let { name, email, logoLink, webSite } = req.body;


        const updatedData = {}

        // checking weather id is valid or not
        if (!validator.isValidObjectId(companyId)) {
            return res.status(400).send({ status: false, message: "Invalid userId." })
        }
        let result = await companyModel.findById(companyId);
        if (!result) {
            return res.status(404).send({ status: false, message: "No company Found" });
        }
        // checking if user does not enters any data
        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, message: "No data provided" }) }

        // checking for name 
        if (name) {
            if (!(validator.isValid(name))) { return res.status(400).send({ status: false, message: "please enter name" }) }
            updatedData["name"] = name
        }
        const duplicateCompanyName = await companyModel({ name: name })
        if (!duplicateCompanyName) return res.status(400).send({ status: true, Message: "This Company Name is Already taken" })

        if (email) {
            if (!(validator.isEmailValid(email))) { return res.status(400).send({ status: false, message: "please enter last name" }) }

            const duplicateEmail = await employeeModel.findOne({ email: email });
            if (duplicateEmail) { return res.status(400).send({ status: false, message: "Email is already exist" }) };

            updatedData["email"] = email;
        }
        if (logoLink) {
            if (!logoLink) return res.status(400).send({ status: false, Message: "logoLink is required....." });
            updatedData["logoLink"] = logoLink;
        }
        if (webSite) {
            if (!webSite) return res.status(400).send({ status: false, Message: "website is required....." });
            if (!validUrl.isWebUri(webSite)) return res.status(400).send({ status: false, Message: "website should be valid" })
            updatedData["website"] = webSite;

        }


        let updateUser = await companyModel.findByIdAndUpdate({ _id: companyId }, { ...req.body }, { new: true })
        res.status(200).send({ status: true,message:"Data Updated Successfully", data: updateUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        if (!validator.isValidObjectId(companyId)) {
            return res.status(400).send({ status: false, message: "Valid companyId is required" })
        }
        let checkUserId = await companyModel.findById(companyId)
        if (!checkUserId) return res.status(404).send({ status: false, message: "company not found" });

        const deleteCompany = await companyModel.deleteOne({ _id: companyId })
        return res.status(200).send({ status: true, message: "Delete Company Data successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createCompany, getCompany, updateCompany,deleteCompany }