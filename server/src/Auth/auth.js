const jwt = require('jsonwebtoken');
const validator = require("../validator/validations");
const employeeModel = require('../models/employeeModel');


const authentication = function (req, res, next) {
    const authHeader = req.headers.token || req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        console.log(token);

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {

            if (err)
                return res.status(401).send({ status: false, message: "Token is not valid!" });

            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).send({ status: false, message: "You are not authenticated!" });
    }
};

const authorization = async (req, res, next) => {
    try {
        if (!validator.isValidObjectId(req.params.userId))
            return res.status(400).send({ status: false, message: "userId is not valid" });


        let user = await employeeModel.findById(req.params.userId);

        if (!user) {
            return res.status(404).send({ status: false, message: "user does not exists" });
        }
        else if (req.user.userId != req.params.userId) {
            return res.status(403).send({ status: false, message: "You are not authorized!" });
        }
        next();
    } catch (error) {

    }
}





module.exports = { authentication, authorization };
