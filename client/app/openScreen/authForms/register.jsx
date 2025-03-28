import { StyleSheet } from "react-native";
import { Icon } from "../../../components/Icon";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import * as Updates from "expo-updates";
import {
  ThemedText,
  ThemedInput,
  ThemedButton,
  ThemedView,
} from "@/components/ThemedComponents";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { BackLink } from "../../../components/BackLink";

export default function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(null);
  const { register } = useAuth();

  useEffect(() => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    setDisabled(!(email.trim() && password.trim() && isValidEmail(email)));
  }, [email, password]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ gestureEnabled: false });
    }, [navigation]),
  );

  const handleRegister = async () => {
    const data = await register(name, email, password);

    if (data.success) {
      try {
        await Updates.reloadAsync();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <BackLink />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          <Icon size={20} icon={faUserPlus} />
          <ThemedText type="subtitle">Register</ThemedText>
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <ThemedInput
            required
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
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
            title="Create Account"
            disabled={disabled}
            onPress={handleRegister}
            borderRadius={50}
          />
        </ThemedView>
      </ThemedView>
    </>
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
