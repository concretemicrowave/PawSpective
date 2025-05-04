import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Drawer } from "../Drawer";
import CameraComponent from "../Camera";
import { usePhoto } from "../../context/PhotoContext";

export default function DashboardDrawer({ closed, setClosed }) {
  const { setUpdate } = usePhoto();

  useEffect(() => {
    setUpdate(!closed);
  }, [closed, setUpdate]);

  return (
    <Drawer header={false} closed={closed} setClosed={setClosed} title="Update">
      <View style={styles.container}>{!closed && <CameraComponent />}</View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
