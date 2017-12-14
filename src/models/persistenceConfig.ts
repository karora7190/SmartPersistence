import * as mongoose from "mongoose";

export type persistenceConfigModel = mongoose.Document & {
  partnerCode: string,
  persistenceFlag: boolean
};
const persistenceConfigSchema = new mongoose.Schema({
    partnerCode : String,
    persistenceFlag: Boolean
  }, { timestamps: true });


  const persistenceConfig = mongoose.model("PersistenceConfig", persistenceConfigSchema);
  export default persistenceConfig;