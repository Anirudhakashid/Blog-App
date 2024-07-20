import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite";

export class fileService {
  client = new Client();
  bucket; // Storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectid);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketid,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  async deletefile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketid, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketid, fileId);
  }
}

const fileservice = new fileService();
export default fileservice;
