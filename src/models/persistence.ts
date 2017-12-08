import * as mongoose from "mongoose";

export type persistenceModel = mongoose.Document & {
  partnerCode : string,
  contactCode : string,
  documentType : string,
  documentCode : string,
  dateModified : Date,
  events : JSON
};
const persistenceSchema = new mongoose.Schema({
    partnerCode : String,
    contactCode : String,
    documentType : String,
    documentCode : String,
    dateModified : Date,
    events : JSON
  }, { timestamps: true });


  const persistence = mongoose.model("Persistence", persistenceSchema);
  export default persistence;