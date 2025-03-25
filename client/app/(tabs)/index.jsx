import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import CameraComponent from "../../components/Camera";
import { Drawer } from "../../components/Drawer";
import DrawerContent from "../../components/CameraDrawer/DrawerContent";

export default function CameraScreen() {
  const [photo, setPhoto] = useState(null);
  const [closed, setClosed] = useState(true);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CameraComponent
          setClosed={setClosed}
          onCapture={(photo) => setPhoto(photo)}
          setPhoto={setPhoto}
        />
      </SafeAreaView>
      <Drawer
        closed={closed}
        setClosed={setClosed}
        height={850}
        title={"New Post"}
      >
        <DrawerContent setClosed={setClosed} image={photo} />
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
  message: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "white",
  },
});
