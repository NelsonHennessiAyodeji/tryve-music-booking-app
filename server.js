require("dotenv").config();
require("express-async-errors"); // This allows asynchronous functions to be used in route handlers without explicit error handling
const app = require("./app");
const connectDatabse = require("./database/database");

const port = process.env.PORT || 3000;

// Start method, if the database has any faults the application WILL not run!
app.listen(port, async () => {
  try {
    await connectDatabse(process.env.MONGO_URI);
    console.log(`Server is online and listening on port ${port}`);
  } catch (error) {
    throw new Error(error.message);
  }
});
