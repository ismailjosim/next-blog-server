import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
	try {
		const result = await AuthService.loginWithEmailAndPasswordInToDB(req.body)
		res.status(201).json({
			status: true,
			data: result,
			message: 'User Logged In Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}
const signInWithGoogle = async (req: Request, res: Response) => {
	try {
		const result = await AuthService.signInWithGoogleDB(req.body)
		res.status(201).json({
			status: true,
			data: result,
			message: 'User Logged In Successfully',
		})
	} catch (error) {
		console.log(error)
	}
}

export const AuthController = {
	loginWithEmailAndPassword,
	signInWithGoogle,
}
