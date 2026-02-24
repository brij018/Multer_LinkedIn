import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  bio: String,
  profileImage: String,
  introVideo: String,
  projectImages: [String],
  pdf: String,
});

const profile = mongoose.model("profileModel", profileSchema);

export default profile;
