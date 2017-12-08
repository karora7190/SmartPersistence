"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const persistenceSchema = new mongoose.Schema({
    partnerCode: String,
    contactCode: String,
    documentType: String,
    documentCode: String,
    dateModified: Date,
    events: JSON
}, { timestamps: true });
const persistence = mongoose.model("Persistence", persistenceSchema);
exports.default = persistence;
//# sourceMappingURL=persistence.js.map