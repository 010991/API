const Joi=require('joi');


module.exports.api2= Joi.object({
    
   
        source: Joi.string().required(),
        target: Joi.string().required(),
       amount: Joi.number().required().min(0)
        
        
  
});














