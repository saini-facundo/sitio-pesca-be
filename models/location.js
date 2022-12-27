const { Schema, model } = require("mongoose");

const LocationSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  description: {
    type: String,
  },
  visits: {
    type: Number,
  },
  fishes: {
    type: [String],
  },
  places: {
    type: [String],
  },
  active: {
    type: Boolean,
  },
});

LocationSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Location", LocationSchema);
