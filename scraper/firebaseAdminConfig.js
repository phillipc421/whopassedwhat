import { initializeApp, applicationDefault } from "firebase-admin/app";

export const app = initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://whopassedwhat-default-rtdb.firebaseio.com",
});
