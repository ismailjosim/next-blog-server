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
		// const result = await
		res.status(201).json({
			status: true,
			data: null,
			message: 'All User Data Retrieved Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}

const getSinglePost = async (req: Request, res: Response) => {
	try {
		res.status(201).json({
			status: true,
			data: null,
			message: 'All User Data Retrieved Successfully',
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

export const PostController = {
	createPost,
	getAllPost,
	getSinglePost,
	getAllUserPost,
}
