
import express from "express"
import path from "path"
import cors from "cors"
import xss from "xss-clean"
import dotenv from "dotenv"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"

import pcRoutes from "./routes/pc.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import connectDB from "./config/database.js"
import { corsOptions } from "./config/corsOptions.js"
import localization from "./middleware/localization.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

// Load env vars
dotenv.config()

// Connect to database
connectDB()

// Initialize Express
const app = express()

// Prevent XSS attacks
app.use(xss())
app.use(cors(corsOptions))

// Set security headers
app.use(helmet())

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

// Sanitize data
app.use(mongoSanitize())

// Multil-language
app.use(localization)

app.get("/", (req, res) => {
	return res.send("Roman-net-> api")
})

// Mount routers
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1", pcRoutes)

// Make static dir
const __dirname = path.resolve()
app.use("/locals", express.static(path.join(__dirname, "/locals")))

// Error Handling Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.APP_PORT || 5000

app.listen(PORT, () =>
	console.log(
		`Server is running on ${process.env.NODE_ENV} modes, on port: ${PORT}`
	)
)
