export interface IS3Service {
  uploadFile(bucketName: string, key: string, file: Buffer, contentType: string): Promise<string>;
  uploadFiles(bucketName: string, files: { [key: string]: { buffer: Buffer, contentType: string } }): Promise<{ [key: string]: string }>;
}
