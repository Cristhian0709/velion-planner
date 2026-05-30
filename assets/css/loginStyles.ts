import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#031424",
  },

  header: {
    paddingTop: 45,
    paddingBottom: 40,
    alignItems: "center",
  },

  logoRow: {
    flexDirection: "column",
    alignItems: "center",
  },

  logo: {
    width: 105, // Incrementado un poco para darle más presencia
    height: 105,
    resizeMode: "contain",
    marginBottom: 15,
  },

  brandName: {
    color: "#fff",
    fontSize: 28, // Ligeramente más grande para que haga juego con el logo
    fontWeight: "bold",
    letterSpacing: 0.3,
  },

  formCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 35,
    paddingTop: 40,
  },

  title: {
    fontSize: 26, // Hecho un poco más grande
    fontWeight: "bold",
    color: "#031424",
    textAlign: "center",
    marginBottom: 25, // Mayor separación del primer input
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 12, // Subido un punto de tamaño
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    paddingLeft: 6,
  },

  input: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16, // Más espaciado vertical interno
    paddingHorizontal: 22,
    borderRadius: 35,
    marginBottom: 22,
    borderWidth: 1.5,
    borderColor: "#CBD5E1", // Tono gris un poco más claro y limpio
    color: "#031424",
    fontSize: 15,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingLeft: 10,
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
    backgroundColor: "#031424",
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  footerInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },

  noAccount: {
    color: "#64748B",
    fontSize: 13,
    marginRight: 4,
  },

  tiText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#031424",
  },

  legalRow: {
    marginTop: 50, // CAMBIADO: Evita irse hasta el extremo inferior; se pega más al formulario
    marginBottom: 20,
    alignItems: "center",
  },

  legalText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569", // Ajustado para que se lea perfectamente
    letterSpacing: 0.5,
  },
});
