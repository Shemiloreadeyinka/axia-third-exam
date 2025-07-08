const KYC = require('../models/KYC')
const User= require( '../models/User')
exports.createKyc= async (req,res)=>{
    const {id} = req.user
    const data = req.body

    const checkKyc = await KYC.findById({user: id})
    if (checkKyc) return res.send('kyc already exists')
    try {
        const newKyc = await new KYC({user:id,...data })
        const savedKyc=await newKyc.save

        await User.findByIdAndUpdate(id,{kyc:savedKyc.id},{new:true})
        
        res.status(200).json({message:'kyc createdn successfully'})
        } catch (error) {
        res.status(500).json({message:error})
        
    } 
}

exports.getOneKyc= async (req,res)=>{
    const {kycid}= req.params
    try {
        const kyc= await KYC.findById(kycid).populate('user')
        res.status(200).json({message:'kyc fetched successfully', kyc})
    } catch (error) {
        res.json({message:error})
    }

}