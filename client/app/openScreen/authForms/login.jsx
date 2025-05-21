import {
  ThemedView,
  ThemedInput,
  ThemedButton,
} from "@/components/ThemedComponents";
import { StyleSheet, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";

export default function Login() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDisabled(!(email.trim() && password.trim()));
  }, [email, password]);

  const handleLogin = async () => {
    setLoading(true);
    const data = await login(email, password);
    if (!data.success) {
      Alert.alert("Login Failed", data.message || "Please try again.");
    }
    router.replace("(tabs)");
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ gestureEnabled: false });
    }, [navigation]),
  );

  return (
    <ThemedView style={styles.inputContainer}>
      <ThemedInput
        required
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <ThemedInput
        required
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <ThemedButton
        color="primary"
        title="Login"
        disabled={disabled}
        loading={loading}
        onPress={handleLogin}
        borderRadius={50}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginTop: 12,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
});
