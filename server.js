require("dotenv").config();
require("express-async-errors");
const app = require("./app");
const connectDatabse = require("./database/database");

const port = process.env.PORT || 3000;

// Start method, if the databse has any faults the application WILL not run!
app.listen(port, () => {
  try {
    connectDatabse(process.env.MONGO_URI);
    console.log(`Server is online and listening on port ${port}`);
  } catch (error) {
    throw new Error(error.message);
  }
});
