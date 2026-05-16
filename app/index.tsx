import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";

import { loginUser } from "../services/authService";

export default function Login() {
  // Estado para guardar el correo
  const [correo, setCorreo] = useState("");

  // Estado para guardar la contraseña
  const [password, setPassword] = useState("");

  // Función encargada de validar login
  const ingresar = () => {
    // Validar campos vacíos
    if (!correo || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    // Validar usuario usando service
    const usuarioEncontrado = loginUser(correo, password);

    // Validar autenticación
    if (usuarioEncontrado) {
      router.push("/home");
    } else {
      Alert.alert("Error", "Datos incorrectos");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.brandName}>Velion Planner</Text>
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formCard}>
        <Text style={styles.title}>Acceso a Portafolio</Text>

        <Text style={styles.subtitle}>
          Ingrese sus credenciales corporativas.
        </Text>

        {/* Correo */}
        <Text style={styles.label}>CORREO ELECTRÓNICO</Text>

        <TextInput
          placeholder="nombre@velion.com"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Contraseña */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>CONTRASEÑA</Text>

          <TouchableOpacity>
            <Text style={styles.linkText}>Recuperar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Checkbox */}
        <View style={styles.checkboxRow}>
          <View style={styles.checkbox} />

          <Text style={styles.checkboxLabel}>Mantener sesión abierta</Text>
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={styles.button}
          onPress={ingresar}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Ingresar →</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerInfo}>
          <Text style={styles.noAccount}>¿No tiene una cuenta?</Text>

          <TouchableOpacity>
            <Text style={styles.tiText}>Contacte a TI</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legalRow}>
          <Text style={styles.legalText}>
            PRIVACIDAD · TÉRMINOS · SEGURIDAD
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  header: {
    paddingVertical: 60,
    alignItems: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  brandName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  formCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 30,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 8,
  },

  linkText: {
    fontSize: 11,
    color: "#3B82F6",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    marginRight: 10,
  },

  checkboxLabel: {
    fontSize: 13,
    color: "#64748B",
  },

  button: {
    backgroundColor: "#0F172A",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  footerInfo: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },

  noAccount: {
    color: "#64748B",
  },

  tiText: {
    fontWeight: "bold",
    color: "#1E293B",
  },

  legalRow: {
    marginTop: "auto",
    marginBottom: 20,
    alignItems: "center",
  },

  legalText: {
    fontSize: 10,
    color: "#94A3B8",
    letterSpacing: 1,
  },

  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});
