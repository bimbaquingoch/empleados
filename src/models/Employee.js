import { model, models, Schema } from "mongoose";

const schemaEmpleado = new Schema(
  {
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
      trim: true,
    },
    cedula: {
      type: Number,
      required: [true, "Cedula is required"],
      unique: true,
      minlength: [9, "Cedula must be 10 characters"],
      maxlength: 10,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [40, "Name must be less than 40 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [40, "Name must be less than 40 characters"],
    },
    birthday: {
      type: String,
      // required: true,
    },
    img: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Employee || model("Employee", schemaEmpleado);
