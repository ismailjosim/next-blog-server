import { Router } from 'express'
import { PostController } from './post.controller'

const router = Router()

router.post('/', PostController.createPost)
router.get('/', PostController.getAllPost)
router.get('/:userId', PostController.getAllUserPost)
router.get('/:id', PostController.getSinglePost)

export const PostRoutes = router
