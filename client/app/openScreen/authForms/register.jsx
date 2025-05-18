import { StyleSheet, Alert } from "react-native";
import { Icon } from "@/components/Icon";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import * as Updates from "expo-updates";
import {
  ThemedText,
  ThemedView,
  ThemedInput,
  ThemedButton,
} from "@/components/ThemedComponents";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { BackLink } from "@/components/BackLink";

export default function Register() {
  const { register } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    setDisabled(
      !(name.trim() && email.trim() && password.trim() && isValidEmail(email)),
    );
  }, [name, email, password]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ gestureEnabled: false });
    }, [navigation]),
  );

  const handleRegister = async () => {
    setLoading(true);
    const data = await register(name, email, password);
    setLoading(false);

    if (data.success) {
      try {
        await Updates.reloadAsync();
      } catch (error) {
        console.error("Error reloading app:", error);
      }
    } else {
      Alert.alert("Registration Failed", data.message || "Please try again.");
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
            editable={!loading}
          />
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
            title="Create Account"
            disabled={disabled || loading}
            loading={loading}
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
    width: "100%",
    marginBottom: 10,
  },
});
