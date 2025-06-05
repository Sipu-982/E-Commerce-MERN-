const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Database connected...");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); 
    }
};

module.exports = mongoDB;
