"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persistence_1 = require("../models/persistence");
exports.savePersistenceModel = (req, res, next) => {
    console.log(req.body.partnerCode);
    let partnerCode = req.body.partnerCode;
    let contactCode = req.body.contactCode;
    let documentType = req.body.documentType;
    persistence_1.default.find({ $and: [{ 'documentType': documentType }, { 'contactCode': contactCode }] }).exec((err, result) => {
        if (err) {
            return next(err);
        }
        if (result.length > 0) {
            console.log(result);
            persistence_1.default.update({ $and: [{ 'documentType': documentType }, { 'contactCode': contactCode }] }, {
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
};
exports.getPersistenceModel = (req, res, next) => {
    let partnerCode = req.body.partnerCode;
    let contactCode = req.body.contactCode;
    let documentType = req.body.documentType;
    persistence_1.default.find({ $and: [{ 'documentType': documentType },
            { 'contactCode': contactCode }] }).exec((err, result) => {
        if (err) {
            return next(err);
        }
        if (result) {
            console.log(result);
            return res.json(result);
        }
    });
};
//# sourceMappingURL=persistenceController.js.map