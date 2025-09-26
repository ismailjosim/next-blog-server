import { Router } from 'express'
import { PostController } from './post.controller'

const router = Router()

router.get('/stats', PostController.getBlogStat)

router.post('/', PostController.createPost)
router.get('/', PostController.getAllPost)
router.get('/:userId', PostController.getAllUserPost)
router.get('/single/:id', PostController.getSinglePost)
router.patch('/:id', PostController.updatePost)
router.delete('/:id', PostController.deletePost)

// show stats

export const PostRoutes = router
