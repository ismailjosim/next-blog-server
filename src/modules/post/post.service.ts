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
		orderBy: {
			createdAt: 'desc',
		},
	})
	const total = await prisma.post.count({ where })
	return {
		data: result,
		pagination: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	}
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
	const [updatePost, result] = await prisma.$transaction([
		prisma.post.update({
			where: { id },
			data: {
				viewCount: {
					increment: 1,
				},
			},
		}),
		prisma.post.findUnique({
			where: { id },
			include: { author: true },
		}),
	])

	return result
}

const updatePostIntoDB = async (id: number, data: Partial<any>) => {
	return prisma.post.update({ where: { id }, data })
}
const deletePostFromDB = async (id: number) => {
	return prisma.post.delete({ where: { id } })
}
const getBlogStatFromDB = async () => {
	return await prisma.$transaction(async (tx) => {
		const aggregates = await tx.post.aggregate({
			_count: true,
			_sum: { viewCount: true },
			_avg: { viewCount: true },
			_max: { viewCount: true },
			_min: { viewCount: true },
		})
		const featuredCount = await tx.post.count({
			where: {
				isFeatured: true,
			},
		})
		const topFeaturedPost = await tx.post.findFirst({
			where: {
				isFeatured: true,
			},
			orderBy: {
				viewCount: 'desc',
			},
		})

		const lastWeek = new Date()
		lastWeek.setDate(lastWeek.getDate() - 7)

		const lastWeekPostCount = await tx.post.count({
			where: {
				createdAt: {
					gte: lastWeek,
				},
			},
		})

		return {
			stats: {
				totalPost: aggregates._count ?? 0,
				totalViews: aggregates._sum.viewCount ?? 0,
				avgViews: aggregates._avg.viewCount ?? 0,
				maxViews: aggregates._max.viewCount ?? 0,
				minViews: aggregates._min.viewCount ?? 0,
			},
			featured: {
				count: featuredCount,
				topPost: topFeaturedPost,
			},
			lastWeekPostCount,
		}
	})
}

export const PostService = {
	createPostIntoDB,
	getAllPostFromDB,
	getAllUserPostFromDB,
	getSinglePostFromDB,
	updatePostIntoDB,
	deletePostFromDB,
	getBlogStatFromDB,
}
