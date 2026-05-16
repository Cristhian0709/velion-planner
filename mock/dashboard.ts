
export interface DashboardSummary {
  totalProyectos: number;
  avancePromedio: number; // porcentaje 0-100
  tareasRetrasadas: number;
  costoAcumulado: number; // en millones
  presupuestoTotal: number; // en millones
}

/** Datos para lo que son graficos de barras*/
export interface ChartDataPoint {
  label: string;
  value: number;
}

/** Restricción por área */
export interface RestriccionArea {
  area: string;
  criticas: number;
  abiertas: number;
}

/** Salud financiera */
export interface SaludFinanciera {
  porcentajeUtilizado: number;
  presupuestoTotal: number;
  costoActual: number;
}

//Datos MOCK

// Para hacer las API y reemplazar get
export const mockSummary: DashboardSummary = {
  totalProyectos: 14,
  avancePromedio: 75,
  tareasRetrasadas: 0,
  costoAcumulado: 0.0,
  presupuestoTotal: 0.0,
};


 // Datos para gráfico de barras — avance por proyecto.
 
export const mockAvanceProyectos: ChartDataPoint[] = [
  { label: "Proy A", value: 90 },
  { label: "Proy B", value: 75 },
  { label: "Proy C", value: 60 },
  { label: "Proy D", value: 45 },
  { label: "Proy E", value: 80 },
];

// Datos para gráfico de pastel — distribución por estado

export const mockDistribucionEstado: ChartDataPoint[] = [
  { label: "En curso", value: 8 },
  { label: "Completado", value: 4 },
  { label: "Retrasado", value: 2 },
];

// Datos para gráfico de áreas apiladas — restricciones por área.

export const mockRestriccionesArea: RestriccionArea[] = [
  { area: "Desarrollo", criticas: 5, abiertas: 3 },
  { area: "Diseño", criticas: 2, abiertas: 4 },
  { area: "QA", criticas: 1, abiertas: 2 },
  { area: "DevOps", criticas: 3, abiertas: 1 },
];

//Sa lud financiera
export const mockSaludFinanciera: SaludFinanciera = {
  porcentajeUtilizado: 0,
  presupuestoTotal: 0.0,
  costoActual: 0.0,
};

//para filtros 

export const mockPeriodos = [
  { label: "Últimos 30 días", value: "30d" },
  { label: "Últimos 3 meses", value: "3m" },
  { label: "Este año", value: "1y" },
];

//filtros

export const mockDepartamentos = [
  { label: "Todos", value: "all" },
  { label: "Desarrollo", value: "dev" },
  { label: "Diseño", value: "design" },
  { label: "QA", value: "qa" },
];