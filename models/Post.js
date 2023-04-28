////////////////////////////////////////////////////////////////////////////////
// Define Mongoose
////////////////////////////////////////////////////////////////////////////////
const { model, models, Schema } = require("mongoose");
const commentSchema = require("./Comment");

////////////////////////////////////////////////////////////////////////////////
// Creates the Post schema
////////////////////////////////////////////////////////////////////////////////
const postSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "Pet", require: true },
    mediaUrl: { type: String, default: "" },
    content: { type: String, require: true, minLength: 1, maxLength: 1000 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

////////////////////////////////////////////////////////////////////////////////
// Creates a virtual that returns the total of reactions
////////////////////////////////////////////////////////////////////////////////
postSchema.virtual("likes").get(function () {
  return this.likedBy.length;
});

postSchema.set("toJSON", { virtuals: true });

export default models.Post || model("Post", postSchema);
