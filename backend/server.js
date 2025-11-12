const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const searchRoutes = require("./routes/search.route");
const { notFound, errorHandler } = require("./middleware/error");

dotenv.config();

const app = express();

// Security & parsing
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api", searchRoutes);

// error middleware
app.use(notFound);
app.use(errorHandler);

// Server
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
