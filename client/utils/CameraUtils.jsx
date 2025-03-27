import * as FileSystem from "expo-file-system";

const takePhoto = async (code, setPhoto, onCapture) => {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    );

    if (!response.ok) {
      console.error("Failed to fetch product data:", response.status);
      return;
    }

    const productData = await response.json();

    onCapture(productData);
    setPhoto(productData);
  } catch (error) {
    console.error("Error fetching product data:", error);
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
