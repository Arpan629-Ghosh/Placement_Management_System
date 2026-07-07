import Job from "../../models/Job.js";
import Application from "../../models/Application.js";
import StudentProfile from "../../models/StudentProfile.js";
import { rankCandidates } from "../../recommendation/candidateRanking.service.js";

export const getRankedApplicants = async (req, res) => {
  try {
    const recruiterUserId = req.user.id;
    const { jobId } = req.params;

    /*
    ======================================================
    Fetch Job
    ======================================================
    */

    const job = await Job.findById(jobId)
      .populate({
        path: "recruiter",
        populate: {
          path: "user",
          select: "_id",
        },
      })
      .lean();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    /*
    ======================================================
    Authorization
    ======================================================
    */

    if (job.recruiter.user._id.toString() !== recruiterUserId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    /*
    ======================================================
    Fetch Applications
    ======================================================
    */

    const applications = await Application.find({
      job: jobId,
    })
      .populate("student", "name email")
      .lean();

    if (!applications.length) {
      return res.status(200).json({
        success: true,
        totalApplicants: 0,
        rankedCandidates: [],
      });
    }

    /*
    ======================================================
    Fetch Student Profiles
    ======================================================
    */

    const userIds = applications.map((application) => application.student._id);

    const profiles = await StudentProfile.find({
      user: { $in: userIds },
    }).lean();

    /*
    ======================================================
    Build Profile Map
    ======================================================
    */

    const profileMap = new Map();

    profiles.forEach((profile) => {
      profileMap.set(profile.user.toString(), profile);
    });

    /*
    ======================================================
    Merge Profile + User + Application
    ======================================================
    */

    const candidates = [];

    applications.forEach((application) => {
      const profile = profileMap.get(application.student._id.toString());

      // Resume not analyzed yet
      if (!profile?.resumeAnalysis) return;

      candidates.push({
        ...profile,

        user: application.student,

        applicationId: application._id,

        applicationStatus: application.status,

        appliedAt: application.appliedAt,
      });
    });

    /*
    ======================================================
    AI Ranking
    ======================================================
    */

    const rankedCandidates = rankCandidates(candidates, job.jobAnalysis);

    /*
    ======================================================
    Response
    ======================================================
    */

    return res.status(200).json({
      success: true,
      totalApplicants: applications.length,
      analyzedCandidates: rankedCandidates.length,
      rankedCandidates,
    });
  } catch (error) {
    console.error("Candidate Ranking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
