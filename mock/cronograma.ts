export type Task = {
  id: string;
  frente: string;
  sector: string;
  partida: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
  color: string;
  responsable: string;
  prioridad: string;
};

export const mockProjects = [
  {
    id: "1",
    name: "Proyecto Alpha",
    code: "PRY-001",
    tasks: 6,
    active: true,
  },

  {
    id: "2",
    name: "Proyecto Beta",
    code: "PRY-002",
    tasks: 4,
    active: false,
  },

  {
    id: "3",
    name: "Proyecto Gamma",
    code: "PRY-003",
    tasks: 8,
    active: false,
  },
];

export const mockTasks: Task[] = [
  {
    id: "1",
    frente: "Frente Norte",
    sector: "Sector A",
    partida: "Movimiento de Tierra",
    startDate: "10/03/2026",
    endDate: "25/03/2026",
    progress: 100,
    status: "Cumplido",
    color: "#10B981",
    responsable: "Ing. Carlos Ruiz",
    prioridad: "Alta",
  },

  {
    id: "2",
    frente: "Frente Oeste",
    sector: "Sector B",
    partida: "Excavación",
    startDate: "02/04/2026",
    endDate: "18/04/2026",
    progress: 60,
    status: "En proceso",
    color: "#3B82F6",
    responsable: "Ing. Javier Torres",
    prioridad: "Media",
  },

  {
    id: "3",
    frente: "Frente Sur",
    sector: "Sector C",
    partida: "Compactación",
    startDate: "01/05/2026",
    endDate: "15/05/2026",
    progress: 25,
    status: "Atrasado",
    color: "#EF4444",
    responsable: "Ing. Miguel Ramos",
    prioridad: "Alta",
  },

  {
    id: "4",
    frente: "Frente Central",
    sector: "Sector D",
    partida: "Instalación de Tuberías",
    startDate: "08/06/2026",
    endDate: "28/06/2026",
    progress: 80,
    status: "En proceso",
    color: "#F59E0B",
    responsable: "Ing. Roberto Silva",
    prioridad: "Media",
  },

  {
    id: "5",
    frente: "Frente Este",
    sector: "Sector E",
    partida: "Nivelación de Terreno",
    startDate: "12/07/2026",
    endDate: "30/07/2026",
    progress: 100,
    status: "Cumplido",
    color: "#14B8A6",
    responsable: "Ing. Luis Herrera",
    prioridad: "Baja",
  },
];
