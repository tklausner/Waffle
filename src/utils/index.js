import { Platform } from "react-native";
import * as firebase from "firebase";
import * as FileSystem from "expo-file-system";

import ApiKeys from "../constants/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}

export const loadCache = () => {
  FileSystem.readDirectoryAsync(FileSystem.cacheDirectory + "test/").catch(
    () => {
      FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + "test");
    }
  );
};

export const storageRef = firebase.storage().ref();

export const _processImage = (url) => {
  const imageName = url.substring(
    url.lastIndexOf("/") + 1,
    url.lastIndexOf(".")
  );

  return imageName;
};

export const uploadImageToFireBase = async (res) => {
  const response = await fetch(res.uri);
  const blob = await response.blob();
  const imageName = _processImage(res.uri);
  return storageRef
    .child("images/test" + imageName)
    .put(blob)
    .then(() => {
      console.log("Image Succesfully Uploaded");
      return true;
    })
    .catch((err) => {
      console.log("ERROR UPLOADING IMAGE", err);
      return false;
    });
};
