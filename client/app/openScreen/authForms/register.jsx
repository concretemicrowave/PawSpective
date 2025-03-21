import { StyleSheet } from "react-native";
import { Icon } from "../../../components/Icon";
import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import {
  ThemedText,
  ThemedInput,
  ThemedButton,
  ThemedView,
} from "@/components/ThemedComponents";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(null);
  const { register } = useAuth();

  useEffect(() => {
    if (email.trim("") && password.trim("")) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleRegister = () => {
    register(email, password);
    navigation.navigate("(tabs)");
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Icon size={20} icon={faUserPlus} />
        <ThemedText type="subtitle">Register</ThemedText>
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <ThemedInput
          required
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <ThemedInput
          required
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        <ThemedButton
          color="primary"
          title="Create Account"
          disabled={disabled}
          onPress={handleRegister}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "left",
    paddingBottom: 20,
    padding: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    width: "100%",
    marginTop: 12,
  },
  input: {
    marginBottom: 10,
  },
});
