import { Prisma } from '@prisma/client'
import { prisma } from '../../config/db'

const loginWithEmailAndPasswordInToDB = async ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	if (!user) {
		throw new Error('User Not Found')
	}
	if (password === user.password) {
		return user
	} else {
		throw new Error('Password does not match')
	}
}

const signInWithGoogleDB = async (payload: Prisma.UserCreateInput) => {
	let user = await prisma.user.findUnique({
		where: {
			email: payload.email,
		},
	})
	if (!user) {
		user = await prisma.user.create({
			data: payload,
		})
	}

	return user
}

export const AuthService = {
	loginWithEmailAndPasswordInToDB,
	signInWithGoogleDB,
}
