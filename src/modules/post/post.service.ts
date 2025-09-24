import { Prisma } from '@prisma/client'
import { prisma } from '../../config/db'

const createPostIntoDB = async (payload: Prisma.PostCreateInput) => {
	const result = await prisma.post.create({
		data: payload,
	})
	return result
}

type PostQuery = {
	page?: number
	limit?: number
	search?: string
	isFeatured?: boolean
	tags: string[]
}

const getAllPostFromDB = async ({
	page = 1,
	limit = 10,
	search,
	isFeatured,
	tags,
}: PostQuery) => {
	const skip = (page - 1) * limit
	const where: any = {
		AND: [
			search && {
				OR: [
					{
						title: {
							contains: search,
							mode: 'insensitive',
						},
					},
					{
						content: {
							contains: search,
							mode: 'insensitive',
						},
					},
				],
			},
			typeof isFeatured === 'boolean' && { isFeatured },
			tags.length > 0 && { tags: { hasEvery: tags } },
		].filter(Boolean),
	}
	const result = await prisma.post.findMany({
		skip,
		take: limit,
		where,
	})
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
