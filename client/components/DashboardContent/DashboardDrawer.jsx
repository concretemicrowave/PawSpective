import { StyleSheet, View } from "react-native";
import { Drawer } from "../Drawer";
import CameraComponent from "../Camera";

export default function DashboardDrawer({ closed, setClosed }) {
  return (
    <Drawer header={false} closed={closed} setClosed={setClosed} title="Update">
      <View style={styles.container}>
        <CameraComponent update={true} />
      </View>
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
