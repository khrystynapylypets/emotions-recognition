import { Router } from 'express';
import withAuth from '../configurations/authMiddleware';
import { uploadVideo, getAllVideos, deleteVideo } from '../controllers/videoController';
import upload from '../configurations/multer';

const router = new Router();

router.post('/', [ withAuth, upload.single('videoFile') ], uploadVideo);
router.get('/', withAuth, getAllVideos);
router.delete('/:id', withAuth, deleteVideo);

export default router;
