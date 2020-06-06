import { Platform } from "react-native";
import * as firebase from "firebase";

import ApiKeys from "../constants/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}

export const storageRef = firebase.storage().ref();

const _processImage = (url) => {
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
    .child("images/test/" + imageName)
    .put(blob)
    .then(() => {
      console.log("Image Succesfully Uploaded");
    })
    .catch((err) => {
      console.log("ERROR UPLOADING IMAGE", err);
    });
};

export const downloadImageFromFireBase = (res) => {
  return storageRef
    .child("images/" + res.imageName)
    .getDownloadURL()
    .then((url) => {
      console.log("Image Succesfully Downloaded");
      return url;
    })
    .catch((err) => {
      console.log("ERROR DOWNLOADING IMAGE", err);
    });
};
