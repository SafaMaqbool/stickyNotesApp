import { Client as SDK_Client, Databases as SDK_Databases } from "appwrite";

const client = new SDK_Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

const database = new SDK_Databases(client);

export { client, database };
