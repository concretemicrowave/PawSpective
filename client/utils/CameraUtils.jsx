import * as FileSystem from "expo-file-system";

const takePhoto = async (camera, onCapture) => {
  if (camera) {
    const photo = await camera.takePictureAsync();
    onCapture(photo);
  }
};

const deleteImage = async (uri) => {
  try {
    if (uri.startsWith("file://")) {
      await FileSystem.deleteAsync(uri);
    } else {
      console.log("URI is not a local file.");
    }
  } catch (error) {
    console.error("Error deleting the image: ", error);
  }
};

const uriToBase64 = async (uri) => {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};

export { takePhoto, deleteImage, uriToBase64 };
