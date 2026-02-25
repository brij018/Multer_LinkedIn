import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFiles = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/heic",
    "pdf/pdf",
    "video/mp4",
  ];

  if (!allowedFiles.includes(file.mimetype)) {
    res.status(400).json({ message: "Invalid File Type" });
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 20 * 1024 * 1024 },
});

export default upload;
