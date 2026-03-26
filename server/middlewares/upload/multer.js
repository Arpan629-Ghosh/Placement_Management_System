// import multer from "multer";

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF files are allowed"), false);
//     }
//   },
// });

// export default upload;

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // temp folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .pdf
    cb(null, `resume_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

export default upload;
