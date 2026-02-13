import catchAsyncError from "../middlewares/catchAsyncError.middleware.js"
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import { getReceiverSocketId, io } from "../utils/socket.js";

export const getAllUsers = catchAsyncError(async(req, res, next) => {
    const user = req.user;
    const filteredUsers = await User.find({_id: {$ne: user._id}}).select("-password -email -createdAt -updatedAt -__v");
    res.status(200).json({
        success: true,
        users: filteredUsers,
    });
});
export const getMessage = catchAsyncError(async(req, res, next) => {
    const receiverId = req.params.id;
    const myId = req.user._id;
    const receiver = await User.findById(receiverId).select("-password -email -createdAt -updatedAt -__v");
    if(!receiver) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    };
    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: receiverId },
            { senderId: receiverId, receiverId: myId },
        ]
    }).sort({ createdAt: 1 });
    res.status(200).json({
        success: true,
        messages,
        receiver,
    });
});
export const sendMessage = catchAsyncError(async(req, res, next) => {
    const text = req.body.text;
    const media = req?.files?.media;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    const receiver = await User.findById(receiverId).select("-password -email -createdAt -updatedAt -__v");
    if(!receiver) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    const sanatizedText = text?.trim() || "";
    if(!sanatizedText && !media) {
        return res.status(400).json({
            success: false,
            message: "Message cannot be empty",
        });
    }
    let mediaUrl = "";

    if(media) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(
                media.tempFilePath,
                {
                    resource_type: "auto",
                    folder: "chat-app-media",
                    transformation:[
                        { width: 1080, height: 1080, crop: "limit" },
                        { quality: "auto" },
                        { fetch_format: "auto" },
                    ]
                }
            );
            mediaUrl = uploadResponse?.secure_url; 
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload media. Plz try again later.",
            })
        }
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text: sanatizedText,
        media: mediaUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }
    res.status(200).json({
        newMessage,
    });
});