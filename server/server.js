import app from "./app.js";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, NODE_ENV, PORT } from "./env.js";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} in ${NODE_ENV} mode.`);
})
