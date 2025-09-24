import { Prisma } from '@prisma/client'
import { prisma } from '../../config/db'

const createPostIntoDB = async (payload: Prisma.PostCreateInput) => {
	const result = await prisma.post.create({
		data: payload,
	})
	return result
}

const getAllPostFromDB = async () => {
	const result = await prisma.post.findMany()
	return result
}

const getAllUserPostFromDB = async (userId: number) => {
	const result = await prisma.post.findMany({
		where: {
			authorId: userId,
		},
	})
	return result
}

export const PostService = {
	createPostIntoDB,
	getAllPostFromDB,
	getAllUserPostFromDB,
}
