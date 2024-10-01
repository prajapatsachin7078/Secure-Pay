import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Account } from "../models/account.model.js";
export const register = async (req, res) => {
    // console.log(req.body);
    const { username, password, firstName, lastName } = req.body.data;
    try {
        // verify if user already exist ?
        const user = await User.findOne({ username });
        if (user) {
            return res.json({
                message: "User already exist! Try another username.."
            })
        }
        // Hash password before saving it to the db 
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create/save new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        })
        	/// ----- Create new account ------
        const userId = newUser._id;
        await Account.create({
            userId,
            balance: 1 + Math.random() * 100000
        })
        res.json({
            message: "User registered successfully.."
        })

    } catch (error) {
        console.log("Signup Error: ", error);
        res.status(404)
            .json({
                message: "Internal Server error.."
            })
    }
}
export const login = async (req, res) => {
    const { username, password } = req.body.data;
    try {
        // Check if user exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User is not registered! Register first.",
                errorType: "USER_NOT_FOUND"
            });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Wrong password. Try again.",
                errorType: "WRONG_PASSWORD"
            });
        }

        // Generate token
        const userToken = { userID: user._id };
        const token = jwt.sign(userToken, process.env.SECRET_KEY);

        // Set cookie
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true,
            httpOnly:true
        });
        const account = await Account.findOne({userId:user._id});
        user = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
            balance: account.balance
        }
        return res.status(200).json({
            message: "Login successful.",
            user
        });
    } catch (error) {
        console.log("Login Error: ", error);
        res.status(500).json({
            message: "Error in login. Internal server issue.",
            errorType: "INTERNAL_SERVER_ERROR"
        });
    }
};

export const updateProfile = async(req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const userID = req.id;
    
    try {
        const user =  await User.findById(userID);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        if(username)user.username=username;
        if(password)user.password=password;
        if(firstName)user.firstName=firstName;
        if(lastName)user.lastName=lastName;

        await user.save();
        return res.status(200).json({
            message:"Profile updated successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Update failed.."
        })
    }

}
export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({message:'Log out successfully..'});

}
export const getUsers = async (req, res) => {
    const userId = req.id; // Assuming req.id contains the current user's ID
    const filter = req.query.filter || "";

    try {
        // Find users with the specified filter
        let users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } }, // Case-insensitive search
                { lastName: { "$regex": filter, "$options": "i" } }
            ],
            _id: { $ne: userId } // Exclude the current user
        });

        res.json({
            user: users.map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Couldn't get users...Internal server issue.."
        });
    }
};

export const profile = async(req,res)=>{
    const userId = req.id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                error: "Invalid User.."
            })
        }
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}