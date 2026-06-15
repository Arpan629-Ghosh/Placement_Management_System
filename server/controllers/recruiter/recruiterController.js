import RecruiterProfile from "../../models/RecruiterProfile.js";
import cloudinary from "../../config/cloudinary.js";

/* =========================================
   CREATE PROFILE
========================================= */
export const createRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingProfile = await RecruiterProfile.findOne({
      user: userId,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Recruiter profile already exists",
      });
    }

    let companyLogo = {};

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "pms/recruiter-logos",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(req.file.buffer);
      });

      companyLogo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const profile = await RecruiterProfile.create({
      user: userId,
      ...req.body,
      companyLogo,
    });

    await profile.populate("user", "name email role");

    res.status(201).json({
      success: true,
      message: "Recruiter profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =========================================
   GET PROFILE
========================================= */
export const getRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await RecruiterProfile.findOne({
      user: userId,
    }).populate("user", "name email role");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =========================================
   UPDATE PROFILE
========================================= */
export const updateRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await RecruiterProfile.findOne({
      user: userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      // delete old logo
      if (profile.companyLogo?.public_id) {
        await cloudinary.uploader.destroy(profile.companyLogo.public_id);
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "pms/recruiter-logos",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(req.file.buffer);
      });

      updateData.companyLogo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedProfile = await RecruiterProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    ).populate("user", "name email role");

    res.status(200).json({
      success: true,
      message: "Recruiter profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =========================================
   DELETE PROFILE
========================================= */
export const deleteRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await RecruiterProfile.findOne({
      user: userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    if (profile.companyLogo?.public_id) {
      await cloudinary.uploader.destroy(profile.companyLogo.public_id);
    }

    await RecruiterProfile.findOneAndDelete({
      user: userId,
    });

    res.status(200).json({
      success: true,
      message: "Recruiter profile deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
