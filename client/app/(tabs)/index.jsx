import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CameraComponent from "../../components/Camera";
import { Drawer } from "../../components/Drawer";
import DrawerContent from "../../components/CameraDrawer/DrawerContent";
import { Note } from "../../components/Note";

export default function CameraScreen() {
  const [photo, setPhoto] = useState(null);
  const [closed, setClosed] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <CameraComponent
          setClosed={setClosed}
          onCapture={(photo) => setPhoto(photo)}
          setPhoto={setPhoto}
        />
      </View>
      <Note title="Saved" setOpen={setOpen} open={open} duration={500} />
      <Drawer
        closed={closed}
        setClosed={setClosed}
        height={850}
        title={"New Post"}
      >
        <DrawerContent setOpen={setOpen} setClosed={setClosed} image={photo} />
      </Drawer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
