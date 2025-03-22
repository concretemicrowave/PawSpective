import {
  ThemedView,
  ThemedInput,
  ThemedButton,
} from "@/components/ThemedComponents";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "expo-router";

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
      navigation.reset({
        index: 0,
        routes: [{ name: "(tabs)" }],
      });
    }
  };

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
