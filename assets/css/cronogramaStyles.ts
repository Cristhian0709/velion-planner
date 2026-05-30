import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  /* HEADER */

  header: {
    paddingTop: 58,
    paddingHorizontal: 22,
    marginBottom: 30,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,
    shadowRadius: 4,

    elevation: 3,
  },

  smallText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1.2,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 3,
  },

  subtitle: {
    marginTop: 14,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },

  /* SECTION */

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    paddingHorizontal: 22,
    marginBottom: 14,

    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.8,
  },

  /* PROJECTS */

  projectCard: {
    width: 180,
    backgroundColor: "#FFFFFF",
    marginLeft: 22,
    borderRadius: 24,
    padding: 18,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 3,
  },

  projectCardActive: {
    backgroundColor: "#0F172A",
  },

  projectCode: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 10,
  },

  projectName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  projectTasks: {
    marginTop: 12,
    fontSize: 13,
    color: "#64748B",
  },

  activeText: {
    color: "#FFFFFF",
  },

  /* TABLE */

  tableContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 22,
    borderRadius: 24,
    overflow: "hidden",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 3,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0F172A",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },

  tableHeaderText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
  },

  taskColumn: {
    flex: 1.8,
    paddingRight: 10,
  },

  dateColumn: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  frenteText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  sectorText: {
    marginTop: 5,
    fontSize: 13,
    color: "#64748B",
  },

  partidaText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },

  dateBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 95,
    alignItems: "center",
  },

  dateBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  /* DETAIL */

  detailCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 22,
    borderRadius: 24,
    padding: 22,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 3,
  },

  detailTask: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 16,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    marginBottom: 20,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  progressContainer: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressBar: {
    height: 10,
    borderRadius: 20,
  },

  progressText: {
    marginTop: 10,
    marginBottom: 24,

    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 20,
  },
});
