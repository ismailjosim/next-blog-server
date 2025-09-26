import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { UserRoutes } from './modules/user/user.routes'
import { PostRoutes } from './modules/post/post.routes'
import { AuthRoutes } from './modules/auth/auth.routes'

const app = express()

// Middleware
app.use(cors())
app.use(compression())
app.use(express.json())

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
)

app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/post', PostRoutes)

// Default route for testing
app.get('/', (_req, res) => {
	res.send('API is running')
})

// 404 Handler
app.use((req, res, next) => {
	res.status(404).json({
		success: false,
		message: 'Route Not Found',
	})
})

export default app
