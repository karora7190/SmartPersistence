import { default as persistence, persistenceModel } from "../models/persistence";
import { Request, Response, NextFunction } from "express";



export let savePersistenceModel = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.partnerCode);
    let partnerCode = req.body.partnerCode;
    let contactCode = req.body.contactCode;
    let documentType = req.body.documentType;
    persistence.find({ $and: [ { 'documentType': documentType} ,{'contactCode' : contactCode}] }).exec((err,result)=>{
    if(err){
        return next(err);
    }
    if(result.length > 0){
        console.log(result);
        persistence.update({ $and: [ { 'documentType': documentType} ,{'contactCode' : contactCode}] },{
            events : req.body.events
        },(err,update)=>{
            if (err) { return next(err); }
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({ "msg": "Persistence Model updated Successfully" });
        });
    }
    else{
        const actionModel = new persistence({
            partnerCode: req.body.partnerCode,
            contactCode: req.body.contactCode,
            documentType: req.body.documentType,
            dateModified : new Date(),
            events : req.body.events
          });
          actionModel.save((err) => {
            if (err) { return next(err); }
            res.setHeader("Access-Control-Allow-Origin", "*");
          res.json({ "msg": "Persistence Model Saved Successfully" });
          });
    }
});
};
export let getPersistenceModel = (req: Request, res: Response, next: NextFunction) => {
    let partnerCode = req.body.partnerCode;
    let contactCode = req.body.contactCode;
    let documentType = req.body.documentType;

    persistence.find({ $and: [ { 'documentType': documentType} ,
        {'contactCode' : contactCode}] }).exec((err,result)=>{
        if(err){
            return next(err);
        }
        if(result){
            console.log(result);
            res.setHeader("Access-Control-Allow-Origin", "*");
            return res.json(result);
        }
    });
};