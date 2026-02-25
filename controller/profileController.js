import Profile from "../model/profileModel.js";
import HttpError from "../middleware/HttpError.js";

import fs from "fs";
import path from "path";

const createProfile = async (req, res, next) => {
  try {
    const profile = await Profile.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      profileImage: req.files.profileImage?.[0]?.path,
      introVideo: req.files.introVideo?.[0]?.path,
      pdf: req.files.pdf?.[0]?.path,
      projectImages: req.files.projectImages?.map((files) => files.path) || [],
    });
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getSingleProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// const deleteProfile = async (req, res, next) => {
//   try {
//     const profile = await Profile.findById(req.params.id);

//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }
//     if(profile.profileImage){
//       fs.unlinkSync(profile.profileImage)
//     }

//     res.status(200).json({
//       success: true,
//       message: "Profile deleted successfully",
//     });
//   } catch (error) {
//     next(new HttpError(error.message, 500));
//   }
// };

export default {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  // deleteProfile,
};
