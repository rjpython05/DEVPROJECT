import type { BoardDefinition } from "../../types/monday.js";

export const componenteBoard: BoardDefinition = {
  key: "componente",
  name: "Board Componente",
  description: "Tareas específicas por componente. Se crea uno por cada componente del proyecto.",
  level: "operativo",
  pmiDomains: ["Equipo", "Trabajo", "Entrega"],
  groups: [
    { id: "en_progreso", title: "En Progreso", color: "#fdab3d" },
    { id: "pendiente", title: "Pendiente", color: "#579bfc" },
    { id: "completado", title: "Completado", color: "#00c875" },
    { id: "bloqueado", title: "Bloqueado", color: "#e2445c" },
  ],
  columns: [
    { id: "descripcion", title: "Descripción", type: "long_text" },
    { id: "actividad_poa", title: "Actividad POA", type: "connect_boards", description: "Link a la actividad del POA" },
    { id: "resultado_ml", title: "Resultado Marco Lógico", type: "connect_boards", description: "Resultado que impacta" },
    { id: "responsable", title: "Responsable", type: "people" },
    { id: "fecha_inicio", title: "Fecha Inicio", type: "date" },
    { id: "fecha_fin", title: "Fecha Fin", type: "date" },
    { id: "estado", title: "Estado", type: "status" },
    { id: "prioridad", title: "Prioridad", type: "status" },
    { id: "pct_avance", title: "% Avance", type: "numbers" },
    { id: "entregable", title: "Entregable", type: "text", description: "Producto esperado de esta tarea" },
    { id: "criterio_aceptacion", title: "Criterio de Aceptación", type: "long_text" },
    { id: "documentos", title: "Documentos", type: "file" },
    { id: "dependencias", title: "Dependencias", type: "dependency" },
  ],
  statusLabels: {
    estado: [
      { index: 0, label: "Pendiente", color: "#579bfc" },
      { index: 1, label: "En Progreso", color: "#fdab3d" },
      { index: 2, label: "En Revisión", color: "#a25ddc" },
      { index: 3, label: "Completado", color: "#00c875" },
      { index: 4, label: "Bloqueado", color: "#e2445c" },
    ],
    prioridad: [
      { index: 0, label: "Alta", color: "#e2445c" },
      { index: 1, label: "Media", color: "#fdab3d" },
      { index: 2, label: "Baja", color: "#579bfc" },
    ],
  },
};
