import multer from 'multer';
import { ErrorHandler } from '../error';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];

    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file) {
    cb(null, true);
  } else {
    cb(new ErrorHandler(404, 'Video file should not be empty'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export default upload;
