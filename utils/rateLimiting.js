import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 mins
  max: 100,
  message: "Too many requests, please try again after 2 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default limiter;
