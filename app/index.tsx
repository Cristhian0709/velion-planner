import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";
import { styles } from "../assets/css/loginStyles";
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
      router.push("/dashboard");
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

        {/* Correo */}
        <Text style={styles.label}>CORREO ELECTRÓNICO</Text>

        <TextInput
          placeholder="nombre@velion.com"
          placeholderTextColor="#0c1829"
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Contraseña */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>CONTRASEÑA</Text>
        </View>

        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

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
