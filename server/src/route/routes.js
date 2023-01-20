const { Router } = require('express');
const express = require('express');
const {register,logIn,getEmployee,updateEmployee,deleteEmployee} = require("../controller/employeeController")
const {createCompany,getCompany,updateCompany,deleteCompany} = require("../controller/companyController")
const { authentication, authorization } = require("../Auth/auth")

const router = express.Router();

router.post('/register',register);
router.post('/login',logIn);
router.get('/getEmployee/:userId',authentication,getEmployee);
router.put('/updateEmployee/:userId',authentication,authorization,updateEmployee);
router.delete('/deleteEmployee/:userId',authentication,authorization,deleteEmployee);

router.post("/newCompany",createCompany);
router.get('/getCompany/:companyId',getCompany);
router.put('/updateCompany/:companyId',updateCompany);
router.delete('/deleteCompany/:companyId',deleteCompany);






module.exports = router;