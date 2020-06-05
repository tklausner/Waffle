import { Platform } from "react-native";
import * as firebase from "firebase";

export const storage = firebase.storage();

const getImageLocalPath = (res) => {
  const { path, uri } = res;
  return Platform.OS === "android" ? path : uri;
};

const createStorageReferenceToImage = (res) => {
  const { imageName } = res;
  return storage.ref(imageName);
};

export const uploadImageToFireBase = (res) => {
  const imageSource = getImageLocalPath(res);
  const storageRef = createStorageReferenceToImage(res);
  return storageRef.putFile(imageSource);
};
