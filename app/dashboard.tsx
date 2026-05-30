import React, { useState } from "react";

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { BarChart, PieChart } from "react-native-chart-kit";

import {
  mockAvanceProyectos,
  mockDepartamentos,
  mockDistribucionEstado,
  mockPeriodos,
  mockRestriccionesArea,
  mockSaludFinanciera,
  mockSummary,
} from "../mock/dashboard";

const screenWidth = Dimensions.get("window").width;

const COLORS = {
  primary: "#2563EB",
  danger: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  background: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  textLight: "#64748B",
  border: "#E2E8F0",
};

interface MetricCardProps {
  titulo: string;
  valor: string;
  subtitulo: string;
  color: string;
  badge?: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const MetricCard = ({
  titulo,
  valor,
  subtitulo,
  color,
  badge,
  icon,
}: MetricCardProps) => (
  <View style={styles.metricCard}>
    <View style={styles.metricTop}>
      <View
        style={[
          styles.metricIcon,
          {
            backgroundColor: `${color}15`,
          },
        ]}
      >
        <Ionicons name={icon} size={22} color={color} />
      </View>

      {badge && <Text style={[styles.badge, { color }]}>{badge}</Text>}
    </View>

    <Text style={styles.metricTitulo}>{titulo}</Text>

    <Text style={[styles.metricValor, { color }]}>{valor}</Text>

    <Text style={styles.metricSubtitulo}>{subtitulo}</Text>
  </View>
);

interface FiltroSelectorProps {
  opciones: {
    label: string;
    value: string;
  }[];

  seleccionado: string;

  onSelect: (value: string) => void;
}

const FiltroSelector = ({
  opciones,
  seleccionado,
  onSelect,
}: FiltroSelectorProps) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {opciones.map((op) => (
      <TouchableOpacity
        key={op.value}
        style={[
          styles.filtroBtn,
          seleccionado === op.value && styles.filtroBtnActivo,
        ]}
        onPress={() => onSelect(op.value)}
      >
        <Text
          style={[
            styles.filtroBtnText,
            seleccionado === op.value && styles.filtroBtnTextActivo,
          ]}
        >
          {op.label}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default function Dashboard() {
  const [periodo, setPeriodo] = useState("30d");

  const [departamento, setDepartamento] = useState("all");

  const [menuVisible, setMenuVisible] = useState(false);

  const summary = mockSummary;

  const saludFinanciera = mockSaludFinanciera;

  const barData = {
    labels: mockAvanceProyectos.map((d) => d.label),

    datasets: [
      {
        data: mockAvanceProyectos.map((d) => d.value),
      },
    ],
  };

  const pieData = mockDistribucionEstado.map((d, i) => ({
    name: d.label,

    population: d.value,

    color: [COLORS.primary, COLORS.success, COLORS.danger][i],

    legendFontColor: COLORS.text,

    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundGradientFrom: COLORS.card,

    backgroundGradientTo: COLORS.card,

    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,

    labelColor: () => COLORS.textLight,

    decimalPlaces: 0,

    barPercentage: 0.6,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible(!menuVisible)}
          >
            <Ionicons name="menu" size={28} color="#0F172A" />
          </TouchableOpacity>

          <Text style={styles.headerSub}>PORTAFOLIO EJECUTIVO</Text>

          <Text style={styles.headerTitle}>Panel Ejecutivo</Text>

          <Text style={styles.headerDescription}>
            Resumen ejecutivo del portafolio y seguimiento general de proyectos.
          </Text>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.exportBtn}>
              <Ionicons name="download-outline" size={18} color="#FFFFFF" />

              <Text style={styles.exportBtnText}>Exportar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FILTROS */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Filtros</Text>

          <View style={styles.filtroGroup}>
            <Text style={styles.filtroLabel}>PERÍODO</Text>

            <FiltroSelector
              opciones={mockPeriodos}
              seleccionado={periodo}
              onSelect={setPeriodo}
            />
          </View>

          <View style={styles.filtroGroup}>
            <Text style={styles.filtroLabel}>DEPARTAMENTO</Text>

            <FiltroSelector
              opciones={mockDepartamentos}
              seleccionado={departamento}
              onSelect={setDepartamento}
            />
          </View>
        </View>

        {/* MÉTRICAS */}

        <Text style={styles.sectionTitle}>Indicadores Principales</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.metricsRow}
        >
          <MetricCard
            titulo="PROYECTOS"
            valor={String(summary.totalProyectos)}
            subtitulo="Activos actualmente"
            color={COLORS.primary}
            badge="Total"
            icon="briefcase-outline"
          />

          <MetricCard
            titulo="AVANCE"
            valor={`${summary.avancePromedio}%`}
            subtitulo="Promedio general"
            color={COLORS.success}
            badge="General"
            icon="trending-up-outline"
          />

          <MetricCard
            titulo="RETRASOS"
            valor={String(summary.tareasRetrasadas)}
            subtitulo="Tareas críticas"
            color={COLORS.danger}
            badge="Atención"
            icon="alert-circle-outline"
          />

          <MetricCard
            titulo="COSTO"
            valor={`$${summary.costoAcumulado.toFixed(1)}M`}
            subtitulo="Costo acumulado"
            color={COLORS.warning}
            badge="Finanzas"
            icon="cash-outline"
          />
        </ScrollView>

        {/* BARRAS */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Avance por Proyecto</Text>

          <BarChart
            data={barData}
            width={screenWidth - 80}
            height={240}
            yAxisLabel=""
            yAxisSuffix="%"
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>

        {/* PIE */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estado General</Text>

          <PieChart
            data={pieData}
            width={screenWidth - 80}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
          />
        </View>

        {/* RESTRICCIONES */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restricciones por Área</Text>

          {mockRestriccionesArea.map((item) => (
            <View key={item.area} style={styles.restriccionRow}>
              <View style={styles.restriccionHeader}>
                <Text style={styles.restriccionLabel}>{item.area}</Text>

                <Text style={styles.restriccionValue}>
                  {item.criticas} críticas
                </Text>
              </View>

              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${(item.criticas / 10) * 100}%`,
                      backgroundColor: COLORS.danger,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* SALUD */}

        <View style={[styles.card, styles.saludCard]}>
          <Text style={styles.cardTitle}>Salud Financiera</Text>

          <Text style={styles.saludSubtitulo}>
            Estado presupuestal consolidado del portafolio.
          </Text>

          <View style={styles.saludCircle}>
            <Text style={styles.saludPorcentaje}>
              {saludFinanciera.porcentajeUtilizado}%
            </Text>

            <Text style={styles.saludUtilizado}>UTILIZADO</Text>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* MENU */}

      {menuVisible && (
        <View style={styles.overlay}>
          <View style={styles.sideMenu}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Velion Planner</Text>

              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);

                router.push("/cronograma");
              }}
            >
              <Ionicons name="calendar-outline" size={20} color="#2563EB" />

              <Text style={styles.menuText}>Cronograma</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={20} color="#2563EB" />

              <Text style={styles.menuText}>Configuración</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 80,
  },

  /* HEADER */

  header: {
    marginBottom: 24,
    position: "relative",
  },

  headerSub: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 6,
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    paddingRight: 80,
  },

  headerDescription: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    paddingRight: 50,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },

  exportBtn: {
    backgroundColor: COLORS.primary,

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 16,

    flexDirection: "row",
    alignItems: "center",

    marginLeft: "auto",
  },

  exportBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft: 8,
  },

  menuButton: {
    position: "absolute",

    top: 0,
    right: 0,

    width: 56,
    height: 56,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,

    zIndex: 999,
  },

  /* GENERAL */

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 18,
  },

  card: {
    backgroundColor: COLORS.card,

    borderRadius: 28,

    padding: 22,

    marginBottom: 22,

    shadowColor: "#000",

    shadowOpacity: 0.04,
    shadowRadius: 6,

    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 18,
  },

  /* FILTROS */

  filtroGroup: {
    marginBottom: 16,
  },

  filtroLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 1,
  },

  filtroBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 14,

    paddingHorizontal: 16,
    paddingVertical: 10,

    marginRight: 10,

    backgroundColor: COLORS.card,
  },

  filtroBtnActivo: {
    backgroundColor: COLORS.primary,

    borderColor: COLORS.primary,
  },

  filtroBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  filtroBtnTextActivo: {
    color: "#FFFFFF",
  },

  /* METRICS */

  metricsRow: {
    marginBottom: 22,
  },

  metricCard: {
    width: 220,

    marginRight: 14,

    borderRadius: 28,

    padding: 22,

    backgroundColor: "#FFFFFF",

    shadowColor: "#000",

    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 3,
  },

  metricTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  metricIcon: {
    width: 50,
    height: 50,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    fontSize: 11,
    fontWeight: "700",
  },

  metricTitulo: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 1,
  },

  metricValor: {
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 10,
  },

  metricSubtitulo: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },

  /* CHART */

  chart: {
    borderRadius: 16,
  },

  /* RESTRICCIONES */

  restriccionRow: {
    marginBottom: 18,
  },

  restriccionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  restriccionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  restriccionValue: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  barContainer: {
    height: 10,
    backgroundColor: COLORS.border,

    borderRadius: 10,

    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 10,
  },

  /* SALUD */

  saludCard: {
    alignItems: "center",
  },

  saludSubtitulo: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 22,
  },

  saludCircle: {
    width: 140,
    height: 140,

    borderRadius: 70,

    borderWidth: 12,

    borderColor: COLORS.border,

    justifyContent: "center",
    alignItems: "center",
  },

  saludPorcentaje: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },

  saludUtilizado: {
    marginTop: 4,

    fontSize: 11,
    fontWeight: "700",

    letterSpacing: 1,

    color: "#64748B",
  },

  /* MENU */

  overlay: {
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: "rgba(0,0,0,0.25)",

    justifyContent: "flex-start",

    alignItems: "flex-end",
  },

  sideMenu: {
    width: 280,
    height: "100%",

    backgroundColor: "#FFFFFF",

    paddingTop: 70,
    paddingHorizontal: 22,

    shadowColor: "#000",

    shadowOffset: {
      width: -3,
      height: 0,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 10,
  },

  menuHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 34,
  },

  menuTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 18,

    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  menuText: {
    marginLeft: 14,

    fontSize: 15,
    fontWeight: "600",

    color: "#334155",
  },
});
