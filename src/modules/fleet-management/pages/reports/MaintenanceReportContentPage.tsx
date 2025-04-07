"use client"

import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"


interface MaintenanceReportContentProps {
  vehicle: Vehicle
  periodType: string
  month: number
  year: number
}

export function MaintenanceReportContentPage({ vehicle, periodType, month, year }: MaintenanceReportContentProps) {
  // Datos simulados para el reporte
  const maintenanceData = [
    {
      id: 1,
      date: "05/03/2025",
      type: "Cambio de Aceite",
      description: "Cambio de aceite y filtros",
      laborCost: 25000,
      partsCost: 45000,
      totalCost: 70000,
      status: "Finalizado",
      operator: "Fernando Perez",
    },
    {
      id: 2,
      date: "12/03/2025",
      type: "Reparación",
      description: "Reparación de frenos",
      laborCost: 35000,
      partsCost: 65000,
      totalCost: 100000,
      status: "Finalizado",
      operator: "Carlos Gutierrez",
    },
    {
      id: 3,
      date: "20/03/2025",
      type: "Mantenimiento Preventivo",
      description: "Revisión general",
      laborCost: 30000,
      partsCost: 20000,
      totalCost: 50000,
      status: "Finalizado",
      operator: "Fernando Perez",
    },
    {
      id: 4,
      date: "28/03/2025",
      type: "Cambio de Neumáticos",
      description: "Cambio de 2 neumáticos delanteros",
      laborCost: 15000,
      partsCost: 120000,
      totalCost: 135000,
      status: "En proceso",
      operator: "Carlos Gutierrez",
    },
  ]

  // Datos para el gráfico de distribución de costos
  const costDistributionData = [
    { name: "Mano de Obra", value: 105000, color: "#3b82f6" },
    { name: "Repuestos", value: 250000, color: "#f59e0b" },
  ]

  // Datos para el gráfico de tipos de intervenciones
  const interventionTypesData = [
    { name: "Cambio de Aceite", value: 1, color: "#10b981" },
    { name: "Reparación", value: 1, color: "#ef4444" },
    { name: "Mantenimiento Preventivo", value: 1, color: "#8b5cf6" },
    { name: "Cambio de Neumáticos", value: 1, color: "#f97316" },
  ]

  // Datos para el gráfico de costos por tipo
  const costsByTypeData = [
    { name: "Cambio de Aceite", cost: 70000 },
    { name: "Reparación", cost: 100000 },
    { name: "Mantenimiento Preventivo", cost: 50000 },
    { name: "Cambio de Neumáticos", cost: 135000 },
  ]

  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace("ARS", "$")
  }

  // Calcular totales
  const totalCost = maintenanceData.reduce((sum, item) => sum + item.totalCost, 0)
  const totalLaborCost = maintenanceData.reduce((sum, item) => sum + item.laborCost, 0)
  const totalPartsCost = maintenanceData.reduce((sum, item) => sum + item.partsCost, 0)
  const completedInterventions = maintenanceData.filter((item) => item.status === "Finalizado").length
  const inProgressInterventions = maintenanceData.filter((item) => item.status === "En proceso").length

  // Función para obtener el color de la etiqueta de estado
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Finalizado":
        return "bg-green-100 text-green-800"
      case "En proceso":
        return "bg-amber-100 text-amber-800"
      case "Pendiente":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Costo Total</p>
              <p className="text-2xl font-bold">{formatCurrency(totalCost)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
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
                className="text-blue-600"
              >
                <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h6.9c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V3.6c0-.4-.2-.8-.5-1.1-.3-.3-.7-.5-1.1-.5Z"></path>
                <path d="M6 4v16"></path>
                <path d="M10 4v16"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Mano de Obra</p>
              <p className="text-2xl font-bold">{formatCurrency(totalLaborCost)}</p>
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
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Repuestos</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPartsCost)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
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
                className="text-purple-600"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Intervenciones</p>
              <p className="text-2xl font-bold">
                {completedInterventions} / {maintenanceData.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Costos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {costDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(value as number), "Costo"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Costos por Tipo de Intervención</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costsByTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), "Costo"]} />
                  <Bar dataKey="cost" name="Costo" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Intervenciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Mano de Obra</TableHead>
                  <TableHead>Repuestos</TableHead>
                  <TableHead>Costo Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Operario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceData.map((intervention) => (
                  <TableRow key={intervention.id}>
                    <TableCell>{intervention.date}</TableCell>
                    <TableCell>{intervention.type}</TableCell>
                    <TableCell>{intervention.description}</TableCell>
                    <TableCell>{formatCurrency(intervention.laborCost)}</TableCell>
                    <TableCell>{formatCurrency(intervention.partsCost)}</TableCell>
                    <TableCell>{formatCurrency(intervention.totalCost)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(intervention.status)}>{intervention.status}</Badge>
                    </TableCell>
                    <TableCell>{intervention.operator}</TableCell>
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

