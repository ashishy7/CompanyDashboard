import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 50,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "companies",
    required: true,
  },
});
EmployeeSchema.index({ name: 1, phoneNo: 1 }, { unique: true });
export default model("employees", EmployeeSchema);
