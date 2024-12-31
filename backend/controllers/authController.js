const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Library for password hashing
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens (JWT)

const register = async (req, res) => {
    const { name, email, password, role } = req.body; // Extract user details from the request body

    const existingUser = await User.findOne({ email }); // Check if a user with the provided email already exists
    if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the user's password before saving it to the database
    
    const user = new User({ name, email, password: hashedPassword, role }); // Create a new user document
    await user.save();

    return res.status(201).json({ message: 'User successfully registered' });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Find the user by email
    if(!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
    if(!isMatch) return res.status(400).send('Invalid Credentials');

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET); // Generate a JWT token for authentication
    res.json({ token });
};

module.exports = { register, login }; // Export authentication controller functions