"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const persistenceConfigSchema = new mongoose.Schema({
    partnerCode: String,
    persistenceFlag: Boolean
}, { timestamps: true });
const persistenceConfig = mongoose.model("PersistenceConfig", persistenceConfigSchema);
exports.default = persistenceConfig;
//# sourceMappingURL=persistenceConfig.js.map