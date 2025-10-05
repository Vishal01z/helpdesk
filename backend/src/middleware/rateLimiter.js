const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60000,
  max: process.env.RATE_LIMIT_MAX || 60,
  handler: (req, res) => res.status(429).json({ error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests" } })
});
app.use(limiter);
