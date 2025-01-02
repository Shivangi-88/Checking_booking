const mongoose = require('mongoose');

// Database connection string
const connectionString = "mongodb://localhost:27017/appointments"; 

// Connect to the database
const connectDB = async () => {
  try {
    // Establish connection
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,      // Use the new URL parser (recommended)
      useUnifiedTopology: true,  // Use the new topology engine (recommended)
          // Ensure that indexes are created (deprecated options, will be auto handled by Mongoose in future versions)
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Exit the process if MongoDB connection fails
  }
};

// Export the connection function to use in other files
module.exports = connectDB;

