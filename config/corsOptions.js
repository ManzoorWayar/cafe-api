const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:3001",
	"http://localhost:3002",
	"http://192.168.157.244:3000",
	"https://rahanet.netlify.app",
	"https://rahanetisp.netlify.app",
]

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error("Not allowed by CORS"))
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
}

export { corsOptions }
