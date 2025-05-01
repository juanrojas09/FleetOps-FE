"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"



interface AlertsReportContentProps {
  vehicle: Vehicle
  periodType: string
  month: number
  year: number
}

export function AlertsReportContentPage({ vehicle, periodType, month, year }: AlertsReportContentProps) {
  // Datos simulados para el reporte
  const alertsData = [
    {
      id: 1,
      type: "ITV",
      description: "Vencimiento de ITV",
      dueDate: "15/04/2025",
      daysRemaining: 30,
      status: "Pendiente",
      priority: "Alta",
    },
    {
      id: 2,
      type: "Mantenimiento",
      description: "Cambio de aceite",
      dueDate: "10/05/2025",
      daysRemaining: 55,
      status: "Pendiente",
      priority: "Media",
    },
    {
      id: 3,
      type: "Neumáticos",
      description: "Revisión de presión de neumáticos",
      dueDate: "01/04/2025",
      daysRemaining: 16,
      status: "Pendiente",
      priority: "Baja",
    },
    {
      id: 4,
      type: "Seguro",
      description: "Renovación de seguro",
      dueDate: "30/06/2025",
      daysRemaining: 106,
      status: "Pendiente",
      priority: "Alta",
    },
  ]

  // Datos para el gráfico de tipos de alertas
  const alertTypeData = [
    { name: "ITV", value: 1, color: "#ef4444" },
    { name: "Mantenimiento", value: 1, color: "#f59e0b" },
    { name: "Neumáticos", value: 1, color: "#10b981" },
    { name: "Seguro", value: 1, color: "#3b82f6" },
  ]

  // Datos para el gráfico de prioridades
  const priorityData = [
    { name: "Alta", value: 2, color: "#ef4444" },
    { name: "Media", value: 1, color: "#f59e0b" },
    { name: "Baja", value: 1, color: "#10b981" },
  ]

  // Función para obtener el color de la etiqueta de prioridad
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Media":
        return "bg-amber-100 text-amber-800"
      case "Baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para obtener el color de la etiqueta de estado
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800"
      case "En proceso":
        return "bg-blue-100 text-blue-800"
      case "Pendiente":
        return "bg-amber-100 text-amber-800"
      case "Vencido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calcular totales
  const totalAlerts = alertsData.length
  const highPriorityAlerts = alertsData.filter((alert) => alert.priority === "Alta").length
  const mediumPriorityAlerts = alertsData.filter((alert) => alert.priority === "Media").length
  const lowPriorityAlerts = alertsData.filter((alert) => alert.priority === "Baja").length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Total Novedades</p>
              <p className="text-2xl font-bold">{totalAlerts}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Prioridad Alta</p>
              <p className="text-2xl font-bold">{highPriorityAlerts}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-600"
              >
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Prioridad Media</p>
              <p className="text-2xl font-bold">{mediumPriorityAlerts}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Prioridad Baja</p>
              <p className="text-2xl font-bold">{lowPriorityAlerts}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alertTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {alertTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Prioridad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Novedades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Fecha Límite</TableHead>
                  <TableHead>Días Restantes</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertsData.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.type}</TableCell>
                    <TableCell>{alert.description}</TableCell>
                    <TableCell>{alert.dueDate}</TableCell>
                    <TableCell>{alert.daysRemaining}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(alert.status)}>{alert.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadgeColor(alert.priority)}>{alert.priority}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

