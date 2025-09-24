import { Request, Response } from 'express'
import { PostService } from './post.service'

const createPost = async (req: Request, res: Response) => {
	try {
		const result = await PostService.createPostIntoDB(req.body)
		res.status(201).json({
			status: true,
			data: result,
			message: 'Create Post Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}
const getAllPost = async (req: Request, res: Response) => {
	try {
		const result = await PostService.getAllPostFromDB()
		res.status(201).json({
			status: true,
			data: result,
			message: 'All User Data Retrieved Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}

const getSinglePost = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const result = await PostService.getSinglePostFromDB(id)
		res.status(201).json({
			status: true,
			data: null,
			message: 'Post Details Retrieved Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}
const getAllUserPost = async (req: Request, res: Response) => {
	try {
		const userId = Number(req.params.userId)
		const result = await PostService.getAllUserPostFromDB(userId)
		res.status(201).json({
			status: true,
			data: result,
			message: 'All User Data Retrieved Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}
const updatePost = async (req: Request, res: Response) => {
	try {
		const postId = Number(req.params.id)
		const data = req.body
		const result = await PostService.updatePostIntoDB(postId, data)
		res.status(201).json({
			status: true,
			data: result,
			message: 'Post Updated Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}
const deletePost = async (req: Request, res: Response) => {
	try {
		const postId = Number(req.params.id)
		const result = await PostService.deletePostFromDB(postId)
		res.status(201).json({
			status: true,
			data: result,
			message: 'Post Deleted Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}

export const PostController = {
	createPost,
	getAllPost,
	getSinglePost,
	getAllUserPost,
	updatePost,
	deletePost,
}
