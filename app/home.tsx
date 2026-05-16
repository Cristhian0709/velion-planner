import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a Velion Planner</Text>
      <TouchableOpacity onPress={() => router.push("/dashboard")} style={styles.btn}>
        <Text style={styles.btnText}>Ir al Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  btn: { backgroundColor: "#1565C0", padding: 14, borderRadius: 10 },
  btnText: { color: "#fff", fontWeight: "bold" },
});