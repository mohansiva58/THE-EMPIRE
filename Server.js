const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myown', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB (mystore - myown)');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// Define a Mongoose schema and model
const AddressSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  street: String,
  city: String,
  postalCode: String,
  paymentOption: String,
  paymentProof: String, // Path to the uploaded file
  orderedItem: {
    id: String,
    price: Number,
    img: String,
  },
});

const Address = mongoose.model('own', AddressSchema);

// API route to save address with file upload
app.post('/save-address', upload.single('paymentProof'), async (req, res) => {
  try {
    console.log("Data received:", req.body);
    
    const addressData = new Address({
      ...req.body,
      paymentProof: req.file ? `/uploads/${req.file.filename}` : '',
      orderedItem: JSON.parse(req.body.orderedItem) // Parse the ordered item
    });
    
    await addressData.save();
    res.status(200).send({ message: 'Address saved successfully' });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).send({ message: 'Error saving address', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
