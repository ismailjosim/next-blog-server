import { Prisma } from '@prisma/client'
import { prisma } from '../../config/db'

const createUserIntoDB = async (payload: Prisma.UserCreateInput) => {
	const result = await prisma.user.create({
		data: payload,
	})
	console.log(result)
	return result
}

const getAllUsersFromDB = async () => {
	const result = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			name: true,
			phone: true,
			picture: true,
			createdAt: true,
			updatedAt: true,
			role: true,
			status: true,
			isVerified: true,
		},
	})
	return result
}

const getSingleUserFromDB = async (id: number) => {
	const result = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
	})
	return result
}

export const UserServices = {
	createUserIntoDB,
	getAllUsersFromDB,
	getSingleUserFromDB,
}
