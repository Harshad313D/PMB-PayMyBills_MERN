import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (e) {
        throw new Error("Error occurred while generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // get user data
    const { fullName, email, username, password } = req.body;
    // enter all fields
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
    }
    // create user object entry in db
    const user = await User.create({ fullName, email, username, password });
    // remove password and refresh toekn from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    // check for user creation
    if (!user) {
        return res.status(400).json({ message: "User registration failed" });
    }
// return response
    return res.status(201).json({ message: "User registered successfully", data: createdUser });
});

// const loginUser = asyncHandler(async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and Password are required" });
//     }

//     const user = await User.findOne({ email: username });
//     if (!user) {
//         return res.status(404).json({ message: "User does not exist" });
//     }

//     const isPasswordValid = await user.isPasswordCorrect(password);
//     if (!isPasswordValid) {
//         return res.status(401).json({ message: "Invalid password" });
//     }

//     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//     const options = { httpOnly: true, secure: true };

//     return res
//         .status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", refreshToken, options)
//         .json({ message: "User logged in successfully", data: loggedInUser, accessToken, refreshToken });
// });



const loginUser = asyncHandler(async (req, res) => {
    // get user data from req.body
    const { email, username, password } = req.body;
    // data required
    if (!username && !email) {
        return res.status(400).json({ message: "Username or email is required" });
    }

    // find user by username or email
    const user = await User.findOne({
        $or:[{username},{email}]  
    }) 
    // if user doesnt exist
    if (!user) {
        return res.status(404).json({ message: "User does not exist" });
    }
    // validate the pasword
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    // generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    // const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    };

    // Set the tokens as cookies and return them in the response for easier access during testing
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message: "User logged in successfully",
            data:user,
            // loggedInUser,
             
            accessToken,    // Include accessToken in response
            refreshToken,   // Include refreshToken in response
        });
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const options = { httpOnly: true, secure: true };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User logged out successfully" });
});

const getUserProfile = async(req, res) => {
  try{
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password")
    res.status(200).json({filteredUsers}) 
  }catch(err){
    console.error(err);
    return res.status(500).json({error:"server error"})
  }

}

export { registerUser, loginUser, logoutUser, generateAccessAndRefreshTokens, getUserProfile };
