const mongoose = require('mongoose');
const mongoURI= "mongodb+srv://Adhithyaa:adhi@adhithyaa.k4o655v.mongodb.net/?retryWrites=true&w=majority"


const startDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('📦 connected to MongoDB');
  } catch (err) {
    console.error('❌ error connecting to MongoDB:', err.message);
  }
};

const stopDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('📦 disconnected from MongoDB');
  } catch (err) {
    console.error('❌ error disconnecting from MongoDB:', err.message);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
}

module.exports = { startDatabase, stopDatabase, isConnected };