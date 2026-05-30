import React, { useState } from "react";

import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

import { styles } from "../assets/css/cronogramaStyles";

import { Ionicons } from "@expo/vector-icons";

import { mockProjects, mockTasks, Task } from "../mock/cronograma";

export default function CronogramaScreen() {
  const [selectedTask, setSelectedTask] = useState<Task>(mockTasks[0]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Cronograma</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Seguimiento y control de actividades
        </Text>
      </View>

      {/* PROYECTOS */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROYECTOS</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockProjects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={[
                styles.projectCard,

                project.active && styles.projectCardActive,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.projectCode,

                  project.active && styles.activeText,
                ]}
              >
                {project.code}
              </Text>

              <Text
                style={[
                  styles.projectName,

                  project.active && styles.activeText,
                ]}
              >
                {project.name}
              </Text>

              <Text
                style={[
                  styles.projectTasks,

                  project.active && styles.activeText,
                ]}
              >
                {project.tasks} tareas
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* TABLA */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CRONOGRAMA GENERAL</Text>

        <View style={styles.tableContainer}>
          {/* HEADER TABLA */}

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1.8 }]}>TAREAS</Text>

            <Text style={[styles.tableHeaderText, { flex: 1 }]}>FECHAS</Text>
          </View>

          {/* FILAS */}

          {mockTasks.map((task, index) => (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.tableRow,

                index !== mockTasks.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: "#E2E8F0",
                },
              ]}
              onPress={() => setSelectedTask(task)}
              activeOpacity={0.7}
            >
              {/* IZQUIERDA */}

              <View style={styles.taskColumn}>
                <Text style={styles.frenteText}>{task.frente}</Text>

                <Text style={styles.sectorText}>{task.sector}</Text>

                <Text style={styles.partidaText}>{task.partida}</Text>
              </View>

              {/* DERECHA */}

              <View style={styles.dateColumn}>
                <View
                  style={[
                    styles.dateBadge,
                    {
                      backgroundColor: task.color,
                    },
                  ]}
                >
                  <Text style={styles.dateBadgeText}>{task.startDate}</Text>
                </View>

                <View
                  style={[
                    styles.dateBadge,
                    {
                      backgroundColor: task.color,
                      marginTop: 8,
                    },
                  ]}
                >
                  <Text style={styles.dateBadgeText}>{task.endDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* DETALLE */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DETALLE DE TAREA</Text>

        <View style={styles.detailCard}>
          {/* TITULO */}

          <Text style={styles.detailTask}>{selectedTask.partida}</Text>

          {/* STATUS */}

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: selectedTask.color,
              },
            ]}
          >
            <Text style={styles.statusText}>{selectedTask.status}</Text>
          </View>

          {/* PROGRESO */}

          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${selectedTask.progress}%`,
                  backgroundColor: selectedTask.color,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {selectedTask.progress}% completado
          </Text>

          {/* GRID */}

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Frente</Text>

              <Text style={styles.infoValue}>{selectedTask.frente}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Sector</Text>

              <Text style={styles.infoValue}>{selectedTask.sector}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Fecha Inicio</Text>

              <Text style={styles.infoValue}>{selectedTask.startDate}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Fecha Fin</Text>

              <Text style={styles.infoValue}>{selectedTask.endDate}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Responsable</Text>

              <Text style={styles.infoValue}>{selectedTask.responsable}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Prioridad</Text>

              <Text style={styles.infoValue}>{selectedTask.prioridad}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Estado</Text>

              <Text style={styles.infoValue}>{selectedTask.status}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Avance</Text>

              <Text style={styles.infoValue}>{selectedTask.progress}%</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
