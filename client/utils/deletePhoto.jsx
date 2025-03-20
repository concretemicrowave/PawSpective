import * as FileSystem from "expo-file-system";

export const deleteImage = async (uri) => {
  console.log("eafaef");
  try {
    if (uri.startsWith("file://")) {
      await FileSystem.deleteAsync(uri);
      console.log("Image deleted successfully.");
    } else {
      console.log("URI is not a local file.");
    }
  } catch (error) {
    console.error("Error deleting the image: ", error);
  }
};
