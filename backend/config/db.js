const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // Attempt to connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    }catch(error){
        // Log an error message if the connection fails
        console.log("Connection to MongoDB failed: ",error.message);
        process.exit(1);
    }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;