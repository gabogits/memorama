import mongoose from "mongoose";
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_MONGO}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB conectada");
  } catch (error) {
    console.log("hubo un error", error);
    process.exit(1);
  }
};

export default connectDB;
