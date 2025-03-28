import {
  ThemedView,
  ThemedInput,
  ThemedButton,
} from "@/components/ThemedComponents";
import { StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "expo-router";
import * as Updates from "expo-updates";

export default function Login() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email.trim() && password.trim()));
  }, [email, password]);

  const handleLogin = async () => {
    const data = await login(email, password);

    if (data.success) {
      try {
        await Updates.reloadAsync();
      } catch (error) {
        console.error("Error:", error);
      }
    }
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
      />
      <ThemedInput
        required
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ThemedButton
        color="primary"
        title="Login"
        disabled={disabled}
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
