import { Schema, model } from "mongoose";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      required: true,
      maxlength: 13,
      minlength: 10,
    },
    hashed_password: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    salt: String,
  },
  { timestamps: true }
);
CompanySchema.virtual("password")
  .set(function (plainPassword) {
    this._password = plainPassword;
    this.salt = uuidv4();
    this.hashed_password = this.securePassword(plainPassword);
    console.log(this.hashed_password);
  })
  .get(function () {
    return this._password;
  });

CompanySchema.methods = {
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto.pbkdf2Sync(plainPassword, this.salt, 1000, 64, "sha512");
    } catch (exception) {
      console.log(exception);
      return "";
    }
  },
  authenticate: function (plainPassword) {
    return (
      this.securePassword(plainPassword).toString() === this.hashed_password
    );
  },
};
export default model("companies", CompanySchema);
