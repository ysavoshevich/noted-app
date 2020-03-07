const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const basicObj = {
  entries: [
    {
      _id: false,
      author: String,
      title: String,
      description: String,
      link: String,
      position: Number,
      id: String
    }
  ]
};
// {type: String, required: true}
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    dataObj: {
      books: basicObj,
      music: basicObj,
      movies: basicObj,
      articles: basicObj
    }
  },
  { minimize: false }
);

module.exports = User = mongoose.model("users", UserSchema);
