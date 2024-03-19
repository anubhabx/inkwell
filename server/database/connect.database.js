import mongoose from "mongoose";

export const connectDatabase = (MONGO_URI) => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
