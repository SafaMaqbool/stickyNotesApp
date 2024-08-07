import { Client,Databases } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.ITE_PROJECT_ID);


  const databases = new Databases(Client)

  export {client,databases}