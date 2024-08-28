import AWS from "aws-sdk";
import { BadRequestError } from "tune-up-library";
require("dotenv").config();

export class S3Service {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
      region: process.env.S3_BUCKET_REGION,
    });

    this.s3 = new AWS.S3();
  }

  async uploadFile(
    bucketName: string,
    key: string,
    file: Buffer,
    contentType: string
  ): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      throw new BadRequestError("error in s3" + error);
    }
  }

  async uploadFiles(
    bucketName: string,
    files: { [key: string]: { buffer: Buffer; contentType: string } }
  ): Promise<{ [key: string]: string }> {
    const uploadPromises = Object.keys(files).map(async (key) => {
      const { buffer, contentType } = files[key];
      try {
        const location = await this.uploadFile(
          bucketName,
          `${Date.now()}-${key}`,
          buffer,
          contentType
        );
        return { key, location };
      } catch (error) {
        throw new BadRequestError("error in s3" + error);
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      return results.reduce(
        (acc: { [key: string]: string }, { key, location }) => {
          acc[key] = location;
          return acc;
        },
        {}
      );
    } catch (error) {
      throw new BadRequestError("error in s3" + error);
    }
  }

  async uploadImageArray(
    bucketName: string,
    files: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    }[]
  ): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      const { originalname, buffer, mimetype } = file;
      const key = `${Date.now()}-${originalname}`;
      try {
        const location = await this.uploadFile(
          bucketName,
          key,
          buffer,
          mimetype
        );
        return location;
      } catch (error) {
        throw new BadRequestError("error in s3" + error);
      }
    });

    try {
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      throw new BadRequestError("error in s3" + error);
    }
  }
}
