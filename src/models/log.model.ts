import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  id: String,
  data_hora: Date,
  car_id: String,
});

logSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
let Log: mongoose.Model<any>;

if (mongoose.models.Log) {
  Log = mongoose.models.Log;
} else {
  Log = mongoose.model("Log", logSchema);
}

export default Log;
