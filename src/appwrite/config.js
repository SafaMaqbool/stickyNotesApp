import { Client as SDK_Client, Databases as SDK_Databases } from "appwrite";

const client = new SDK_Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new SDK_Databases(client);

const collections = [
  {
    name: "notes",
    id: import.meta.env.VITE_COLLECTION_NOTES_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
];

export { client, databases, collections };
