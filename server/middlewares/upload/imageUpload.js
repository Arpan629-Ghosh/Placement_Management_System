import multer from "multer";

const storage = multer.memoryStorage();

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only JPEG, PNG, JPG, and WebP image files are allowed"),
        false,
      );
    }
  },
});

export default imageUpload;
