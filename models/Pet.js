////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const { model, models, Schema } = require("mongoose");
const Post = require("./Post");

////////////////////////////////////////////////////////////////////////////////
//  Creates the Pet schema
////////////////////////////////////////////////////////////////////////////////
const petSchema = new Schema(
  {
    name: { type: String, require: true, min: 3, max: 20 },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    type: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, default: null },
    location: { type: String, default: "" },
    avatar: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    following: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

////////////////////////////////////////////////////////////////////////////////
//  Ensures the email is unique upon creation
////////////////////////////////////////////////////////////////////////////////
petSchema.path("email").validate(async (email) => {
  const emailFind = await models.Pet.findOne({ email });
  return emailFind ? false : true;
}, "Email is already being used.");

//Updated to allow export of Pet ********By Tinashe
export default models.Pet || model("Pet", petSchema);
