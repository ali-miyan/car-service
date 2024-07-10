export interface IS3Service {
  uploadFile(
    bucketName: string,
    key: string,
    file: Buffer,
    contentType: string
  ): Promise<string>;
}
