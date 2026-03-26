import RecruiterProfile from "../../models/RecruiterProfile.js";

export const createRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingProfile = await RecruiterProfile.findOne({ user: userId });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Recruiter profile already exists ",
      });
    }

    const profile = await RecruiterProfile.create({
      user: userId,
      ...req.body,
    });

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

export const getRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await RecruiterProfile.findOne({ user: userId }).populate(
      "user",
      "name email role",
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found!",
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

export const updateRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedProfile = await RecruiterProfile.findOneAndUpdate(
      { user: userId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

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

export const deleteRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedProfile = await RecruiterProfile.findOneAndDelete({
      user: userId,
    });

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

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
