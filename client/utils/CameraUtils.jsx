export const takePhoto = async (camera, onCapture) => {
  if (camera) {
    const photo = await camera.takePictureAsync();
    onCapture(photo);
  }
};
