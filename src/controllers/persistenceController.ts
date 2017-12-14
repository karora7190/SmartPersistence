import { default as persistence, persistenceModel } from "../models/persistence";
import { default as persistenceConfig, persistenceConfigModel } from "../models/persistenceConfig";
import { Request, Response, NextFunction } from "express";

export let savePersistenceModel = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.partnerCode);
    const persistenceOnOff =  false;
    const partnerCode = req.body.partnerCode;
    const contactCode = req.body.contactCode;
    const documentType = req.body.documentType;
    persistenceConfig.find({"partnerCode" : partnerCode}).exec((err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length > 0) {
        if (result[0].persistenceFlag) {
            persistence.find({ $and: [ { "documentType": documentType} , {"contactCode" : contactCode}] }).exec((err, result) => {
            if (err) {
                return next(err);
            }
            if (result.length > 0) {
                console.log(result);
                persistence.update({ $and: [ { "documentType": documentType} , {"contactCode" : contactCode}] }, {
                    events : req.body.events
                }, (err, update) => {
                    if (err) { return next(err); }
                    res.json({ "msg": "Persistence Model updated Successfully" });
                });
            }
            else {
                const actionModel = new persistence({
                    partnerCode: req.body.partnerCode,
                    contactCode: req.body.contactCode,
                    documentType: req.body.documentType,
                    dateModified : new Date(),
                    events : req.body.events
                });
                actionModel.save((err) => {
                    if (err) { return next(err); }
                res.json({ "msg": "Persistence Model Saved Successfully" });
                });
            }
        });
    }
    else {
        res.json({"msg": "Persistence is off"});
    }
}
else {
    res.json({"msg": "No Configuration found for this Buyer partner code"});
}
});
};
export let getPersistenceModel = (req: Request, res: Response, next: NextFunction) => {
    const persistenceOnOff = false;
    const partnerCode = req.body.partnerCode;
    const contactCode = req.body.contactCode;
    const documentType = req.body.documentType;
    persistenceConfig.find({"partnerCode" : partnerCode}).exec((err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length > 0) {
        if (result[0].persistenceFlag) {
            persistence.find({ $and: [ { "documentType": documentType} ,
                {"contactCode" : contactCode}] }).exec((err, result) => {
                if (err) {
                    return next(err);
                }
                if (result) {
                    console.log(result);
                    res.setHeader("Access-Control-Allow-Origin": "*");
                    return res.json(result);
                }
            });
        }
        else {
            res.json({"msg": "Persistence is off"});
        }
    }
    else {
        res.json({"msg": "No Configuration found for this Buyer partner code"});
    }
});
};