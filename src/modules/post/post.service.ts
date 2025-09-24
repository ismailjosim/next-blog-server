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

const getSinglePostFromDB = async (id: number) => {
	const result = await prisma.post.findUnique({
		where: { id },
		include: { author: true },
	})
	return result
}

const updatePostIntoDB = async (id: number, data: Partial<any>) => {
	return prisma.post.update({ where: { id }, data })
}
const deletePostFromDB = async (id: number) => {
	return prisma.post.delete({ where: { id } })
}

export const PostService = {
	createPostIntoDB,
	getAllPostFromDB,
	getAllUserPostFromDB,
	getSinglePostFromDB,
	updatePostIntoDB,
	deletePostFromDB,
}
