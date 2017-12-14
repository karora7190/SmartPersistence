"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persistence_1 = require("../models/persistence");
const persistenceConfig_1 = require("../models/persistenceConfig");
exports.savePersistenceModel = (req, res, next) => {
    console.log(req.body.partnerCode);
    const persistenceOnOff = false;
    const partnerCode = req.body.partnerCode;
    const contactCode = req.body.contactCode;
    const documentType = req.body.documentType;
    persistenceConfig_1.default.find({ "partnerCode": partnerCode }).exec((err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length > 0) {
            if (result[0].persistenceFlag) {
                persistence_1.default.find({ $and: [{ "documentType": documentType }, { "contactCode": contactCode }] }).exec((err, result) => {
                    if (err) {
                        return next(err);
                    }
                    if (result.length > 0) {
                        console.log(result);
                        persistence_1.default.update({ $and: [{ "documentType": documentType }, { "contactCode": contactCode }] }, {
                            events: req.body.events
                        }, (err, update) => {
                            if (err) {
                                return next(err);
                            }
                            res.json({ "msg": "Persistence Model updated Successfully" });
                        });
                    }
                    else {
                        const actionModel = new persistence_1.default({
                            partnerCode: req.body.partnerCode,
                            contactCode: req.body.contactCode,
                            documentType: req.body.documentType,
                            dateModified: new Date(),
                            events: req.body.events
                        });
                        actionModel.save((err) => {
                            if (err) {
                                return next(err);
                            }
                            res.json({ "msg": "Persistence Model Saved Successfully" });
                        });
                    }
                });
            }
            else {
                res.json({ "msg": "Persistence is off" });
            }
        }
        else {
            res.json({ "msg": "No Configuration found for this Buyer partner code" });
        }
    });
};
exports.getPersistenceModel = (req, res, next) => {
    const persistenceOnOff = false;
    const partnerCode = req.body.partnerCode;
    const contactCode = req.body.contactCode;
    const documentType = req.body.documentType;
    persistenceConfig_1.default.find({ "partnerCode": partnerCode }).exec((err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length > 0) {
            if (result[0].persistenceFlag) {
                persistence_1.default.find({ $and: [{ "documentType": documentType },
                        { "contactCode": contactCode }] }).exec((err, result) => {
                    if (err) {
                        return next(err);
                    }
                    if (result) {
                        console.log(result);
                        return res.json(result);
                    }
                });
            }
            else {
                res.json({ "msg": "Persistence is off" });
            }
        }
        else {
            res.json({ "msg": "No Configuration found for this Buyer partner code" });
        }
    });
};
//# sourceMappingURL=persistenceController.js.map