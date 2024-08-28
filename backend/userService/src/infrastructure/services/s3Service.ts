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
}
