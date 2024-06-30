import express ,{Request,Response} from "express";
import compnayRoute from "./infrastructure/express/routes";
import connectDB from "./infrastructure/db/mongoConfig";
import { errorHandlingMiddleware } from "tune-up-library";
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
require('dotenv').config()

// AWS.config.update({
//   accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
//   secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
//   region: 'ap-south-1',
// });

const s3 = new AWS.S3();

const PORT = 3001;

const app = express();

app.use(express.json());
app.use("/api/company", compnayRoute);

// app.post('/api/company/register', upload.array('image', 2), async (req:any, res) => {
  
//   console.log(req.files,req.body); 

//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ message: 'No files were uploaded.' });
//   }
  
//   const files = req.files;

//   const uploadFile = async (file: { buffer: any; mimetype: any; }) => {
//     const params = {
//       Bucket: 'tune-up',
//       Key: `${Date.now()}-${uuidv4()}`,
//       Body: file.buffer,
//       ContentType: file.mimetype
//     };

//     try {
//       const uploadResult = await s3.upload(params).promise();
//       return uploadResult.Location;
//     } catch (err) {
//       console.error('Error uploading file:', err);
//       throw new Error('Failed to upload file to S3');
//     }
//   };

//   try {
//     const uploadPromises = files.map(uploadFile);
//     const fileUrls = await Promise.all(uploadPromises);

//     res.status(200).json({ message: 'Files uploaded successfully.', fileUrls });
//   } catch (err) {
//     console.error('Error uploading files:', err);
//     res.status(500).json({ message: 'Failed to upload files.' });
//   }
// });



app.use(errorHandlingMiddleware)

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
