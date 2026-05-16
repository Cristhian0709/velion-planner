
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import {
  mockSummary,
  mockAvanceProyectos,
  mockDistribucionEstado,
  mockRestriccionesArea,
  mockSaludFinanciera,
  mockPeriodos,
  mockDepartamentos,
} from "../mock/dashboard";

const screenWidth = Dimensions.get("window").width;

const COLORS = {
  primary: "#1565C0",
  danger: "#E53935",
  warning: "#FB8C00",
  success: "#43A047",
  background: "#F5F6FA",
  card: "#FFFFFF",
  text: "#1A1A2E",
  textLight: "#6B7280",
  border: "#E5E7EB",
};

interface MetricCardProps {
  titulo: string;
  valor: string;
  subtitulo: string;
  color: string;
  badge?: string;
}

const MetricCard = ({ titulo, valor, subtitulo, color, badge }: MetricCardProps) => (
  <View style={[styles.card, styles.metricCard]}>
    {badge && (
      <Text style={[styles.badge, { color }]}>{badge}</Text>
    )}
    <Text style={styles.metricTitulo}>{titulo}</Text>
    <Text style={[styles.metricValor, { color }]}>{valor}</Text>
    <Text style={styles.metricSubtitulo}>{subtitulo}</Text>
  </View>
);


  // FILTROS 
 
interface FiltroSelectorProps {
  opciones: { label: string; value: string }[];
  seleccionado: string;
  onSelect: (value: string) => void;
}

const FiltroSelector = ({ opciones, seleccionado, onSelect }: FiltroSelectorProps) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {opciones.map((op) => (
      <TouchableOpacity
        key={op.value}
        style={[
          styles.filtroBtn,
          seleccionado === op.value && styles.filtroBtnActivo,
        ]}
        onPress={() => onSelect(op.value)}
        accessibilityRole="button"
        accessibilityLabel={`Filtrar por ${op.label}`}
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

// Pantalla Princioal

export default function Dashboard() {

  // Estado de filtros
  const [periodo, setPeriodo] = useState("30d");
  const [departamento, setDepartamento] = useState("all");

  // Datos del resumen
  const summary = mockSummary;
  const saludFinanciera = mockSaludFinanciera;

  // Datos para gráfico de barras
  const barData = {
    labels: mockAvanceProyectos.map((d) => d.label),
    datasets: [{ data: mockAvanceProyectos.map((d) => d.value) }],
  };

  // Datos para gráfico de pastel
  const pieData = mockDistribucionEstado.map((d, i) => ({
    name: d.label,
    population: d.value,
    color: [COLORS.primary, COLORS.success, COLORS.danger][i],
    legendFontColor: COLORS.text,
    legendFontSize: 12,
  }));

  // Configuración base de gráficos
  const chartConfig = {
    backgroundGradientFrom: COLORS.card,
    backgroundGradientTo: COLORS.card,
    color: (opacity = 1) => `rgba(21, 101, 192, ${opacity})`,
    labelColor: () => COLORS.textLight,
    barPercentage: 0.6,
    decimalPlaces: 0,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* ── Para la exportar datos ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.exportBtn} accessibilityRole="button" accessibilityLabel="Exportar datos">
          <Text style={styles.exportBtnText}>↑ Exportar</Text>
        </TouchableOpacity>
      </View>

      {/* ── Filtros ── */}
      <View style={styles.filtrosRow}>
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

      {/* ── Tarjetas de métricas ── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsRow}>
        <MetricCard
          titulo="TOTAL PROYECTOS"
          valor={String(summary.totalProyectos)}
          subtitulo="Activos en el sistema"
          color={COLORS.primary}
          badge="Total"
        />
        <MetricCard
          titulo="AVANCE PROMEDIO"
          valor={`${summary.avancePromedio}%`}
          subtitulo=""
          color={COLORS.success}
          badge="General"
        />
        <MetricCard
          titulo="TAREAS RETRASADAS"
          valor={String(summary.tareasRetrasadas)}
          subtitulo="Requieren intervención crítica"
          color={COLORS.danger}
          badge="Atención"
        />
        <MetricCard
          titulo="COSTO ACUMULADO"
          valor={`$${summary.costoAcumulado.toFixed(1)}M`}
          subtitulo={`Presupuesto total: $${summary.presupuestoTotal.toFixed(1)}M`}
          color={COLORS.warning}
          badge="0%"
        />
      </ScrollView>

      {/* ── Gráfico de barras — Avance por proyecto ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Avance por Proyecto</Text>
        <BarChart
          data={barData}
          width={screenWidth - 48}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix="%"
        />
      </View>

      {/* ── Gráfico de pastel — Distribución por estado ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Distribución por Estado</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 48}
          height={180}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="16"
        />
      </View>

      {/* ── Restricciones por área ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Distribución de restricciones por área</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.danger }]} />
            <Text style={styles.legendText}>Críticas</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.legendText}>Abiertas</Text>
          </View>
        </View>
        {mockRestriccionesArea.map((item) => (
          <View key={item.area} style={styles.restriccionRow}>
            <Text style={styles.restriccionLabel}>{item.area}</Text>
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
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${(item.abiertas / 10) * 100}%`,
                    backgroundColor: COLORS.primary,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* ── Salud financiera ── */}
      <View style={[styles.card, styles.saludCard]}>
        <Text style={styles.cardTitle}>Salud financiera</Text>
        <Text style={styles.saludSubtitulo}>Ejecución presupuestal real del portafolio.</Text>
        <View style={styles.saludCircle}>
          <Text style={styles.saludPorcentaje}>{saludFinanciera.porcentajeUtilizado}%</Text>
          <Text style={styles.saludUtilizado}>UTILIZADO</Text>
        </View>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  exportBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  exportBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  // Filtros
  filtrosRow: {
    marginBottom: 16,
    gap: 8,
  },
  filtroGroup: {
    marginBottom: 8,
  },
  filtroLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "600",
    marginBottom: 4,
  },
  filtroBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: COLORS.card,
  },
  filtroBtnActivo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filtroBtnText: {
    fontSize: 13,
    color: COLORS.text,
  },
  filtroBtnTextActivo: {
    color: "#fff",
    fontWeight: "600",
  },

  // Métricas
  metricsRow: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  metricCard: {
    width: 160,
    marginRight: 12,
  },
  badge: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4,
  },
  metricTitulo: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: "600",
    marginBottom: 4,
  },
  metricValor: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  metricSubtitulo: {
    fontSize: 11,
    color: COLORS.textLight,
  },

  // Gráficos
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  chart: {
    borderRadius: 8,
  },

  // Leyenda
  legendRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textLight,
  },

  // Restricciones
  restriccionRow: {
    marginBottom: 10,
  },
  restriccionLabel: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 4,
    fontWeight: "600",
  },
  barContainer: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },

  // Salud financiera
  saludCard: {
    alignItems: "center",
  },
  saludSubtitulo: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 16,
    textAlign: "center",
  },
  saludCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  saludPorcentaje: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  saludUtilizado: {
    fontSize: 9,
    color: COLORS.textLight,
    fontWeight: "600",
  },
});