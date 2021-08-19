const models = require('../models/user')
const Joi = require('joi');

const schema = Joi.object({
    id : Joi.alternatives().try(Joi.string(), Joi.number()),
    fname: Joi.string().min(1).required(),
    lname: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(3).required()
    })

module.exports = {
    createuser: async (req, res) => {
        const data = req.body;
      try{
        const value = await schema.validateAsync(data);
        models.createUser(value, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    message: "Something went wrong"
                })
            } return res.status(200).json({
                message: "User has been created"
            })
        })
      }catch(e){
        res.status(400).send(`Validation error: ${e.details.map(x => x.message).join(', ')}`)    
     }
        
    },
    getusers: (req, res) => {
        models.getusers((err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    message: "Something went wrong"
                })
            } return res.status(200).json({
                data: result
            })
        })
    },

    updateuser: async (req, res) => {
        const data = req.body;
        try{
        const value = await schema.validateAsync(data);
        models.updateuser(value, (err,result)=> {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    message: "Something went wrong"
                })
            } else {
                return res.status(200).json({
                    message: "User Updated"
                })
            }
        })
      }catch(e){
        res.status(400).send(`Validation error: ${e.details.map(x => x.message).join(', ')}`)    
      }
    },
    deleteusers: (req, res) => {
        let id = req.params.id;
        models.deleteusers(id, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    message: "Something went wrong"
                })
            } return res.status(200).json({
                message: "User has been deleted"
            })
        })
    }
}