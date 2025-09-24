import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
	try {
		const result = await UserServices.createUserIntoDB(req.body)
		res.status(201).json({
			status: true,
			data: result,
			message: 'User Created Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}
const getAllUser = async (req: Request, res: Response) => {
	try {
		const result = await UserServices.getAllUsersFromDB()
		res.status(201).json({
			status: true,
			data: result,
			message: 'All User Data Retrieved Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}
const getSingleUser = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.id)
		const result = await UserServices.getSingleUserFromDB(userId)
		res.status(201).json({
			status: true,
			data: result,
			message: 'User Info Retrieved Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}

export const userController = {
	createUser,
	getAllUser,
	getSingleUser,
}
