const express =require( "express");
const { createKyc, getOneKyc } = require("../controllers/kycController.js");

const router = express.Router();

router.post('/createkyc', createKyc);
router.get('/getKyc/:kycid', getOneKyc);

module.exports= router;