import {v2 as cloudinary} from "cloudinary";
const connectCloudinary = async () => {
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_secret:process.env.CLOUDINARY_API_SECRET,
            api_key:process.env.CLOUDINARY_API_KEY,
        })

    }catch(error){
        console.log("ERROR occured in cloudinary", error.message);
       
    }
}
export default connectCloudinary;
