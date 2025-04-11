"use client"

import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "../../../../common/ui/button"
import { useState } from "react"


interface MaintenanceReportContentProps {
  vehicle: Vehicle
  periodType: string
  month: number
  year: number
}


export function MaintenanceReportContentPage({ vehicle, periodType, month, year }: MaintenanceReportContentProps) {
  const [viewType, setViewType] = useState<"monthly" | "annual">("monthly")

  // Datos simulados para el reporte
  const maintenanceData = [
    {
      id: 1,
      plate: "MFJ 072",
      date: "04/07/2025",
      type: "SERVICE VEHICULOS",
      description: "Compra de filtros",
      laborCost: 32000,
      partsCost: 32000,
      totalCost: 64000,
      kmAtMoment: 121000,
    },
    {
      id: 2,
      plate: "MFJ 072",
      date: "12/03/2025",
      type: "Reparación",
      description: "Reparación de frenos",
      laborCost: 35000,
      partsCost: 65000,
      totalCost: 100000,
      kmAtMoment: 118500,
    },
    {
      id: 3,
      plate: "MFJ 072",
      date: "20/01/2025",
      type: "Mantenimiento Preventivo",
      description: "Revisión general",
      laborCost: 30000,
      partsCost: 20000,
      totalCost: 50000,
      kmAtMoment: 115000,
    },
    {
      id: 4,
      plate: "MFJ 072",
      date: "15/12/2024",
      type: "Cambio de Neumáticos",
      description: "Cambio de 2 neumáticos delanteros",
      laborCost: 15000,
      partsCost: 120000,
      totalCost: 135000,
      kmAtMoment: 112000,
    },
  ]

  // Datos para el gráfico de mantenimiento por mes con kilometraje
  const maintenanceByMonthData = [
    { month: "Ene", count: 3, mileage: 115000 },
    { month: "Feb", count: 2, mileage: 117000 },
    { month: "Mar", count: 1, mileage: 118500 },
    { month: "Abr", count: 2, mileage: 120000 },
    { month: "May", count: 1, mileage: 121000 },
    { month: "Jun", count: 0, mileage: 121000 },
    { month: "Jul", count: 0, mileage: 121000 },
    { month: "Ago", count: 0, mileage: 121000 },
    { month: "Sep", count: 0, mileage: 121000 },
    { month: "Oct", count: 0, mileage: 121000 },
    { month: "Nov", count: 0, mileage: 121000 },
    { month: "Dic", count: 0, mileage: 121000 },
  ]

  // Datos para el gráfico de evolución de costos
  const costEvolutionData = [
    { date: "2024-10", cost: 180000 },
    { date: "2024-11", cost: 220000 },
    { date: "2024-12", cost: 135000 },
    { date: "2025-01", cost: 50000 },
    { date: "2025-02", cost: 150000 },
    { date: "2025-03", cost: 300000 },
    { date: "2025-04", cost: 210000 },
  ]

  // Datos para el gráfico de frecuencia entre mantenimientos
  const frequencyData = [
    { range: "25.0", frequency: 1, trend: 0.5 },
    { range: "27.5", frequency: 0, trend: 0.6 },
    { range: "30.0", frequency: 2, trend: 0.8 },
    { range: "32.5", frequency: 0, trend: 1.0 },
    { range: "35.0", frequency: 0, trend: 0.9 },
    { range: "37.5", frequency: 0, trend: 0.8 },
    { range: "40.0", frequency: 1, trend: 0.6 },
    { range: "42.5", frequency: 0, trend: 0.5 },
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
  const annualCost = 60000 // Simulado para el ejemplo

  // Filtrar datos según el tipo de vista (mensual/anual)
  const filteredMaintenanceData = maintenanceData.filter((item) => {
    if (viewType === "monthly") {
      const itemDate = new Date(item.date.split("/").reverse().join("-"))
      return itemDate.getMonth() + 1 === month && itemDate.getFullYear() === year
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Historial de Intervenciones</h2>
        <div className="flex space-x-2">
          <Button
            variant={viewType === "monthly" ? "default" : "outline"}
            onClick={() => setViewType("monthly")}
            className="h-8"
          >
            Mensual
          </Button>
          <Button
            variant={viewType === "annual" ? "default" : "outline"}
            onClick={() => setViewType("annual")}
            className="h-8"
          >
            Anual
          </Button>
        </div>
      </div>

      {/* Tabla resumen de intervenciones */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo Intervención</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Costo Intervención</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMaintenanceData.length > 0 ? (
              filteredMaintenanceData.map((intervention) => (
                <TableRow key={intervention.id}>
                  <TableCell>{intervention.date}</TableCell>
                  <TableCell>{intervention.type}</TableCell>
                  <TableCell>{intervention.description}</TableCell>
                  <TableCell>{formatCurrency(intervention.totalCost)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No hay intervenciones para el período seleccionado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Indicadores de resumen de costo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium mb-1">Costo Anual</span>
          <div className="bg-green-100 text-green-800 py-2 px-4 rounded text-center font-bold">
            {formatCurrency(annualCost)}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium mb-1">Costo Total</span>
          <div className="bg-yellow-100 text-yellow-800 py-2 px-4 rounded text-center font-bold">
            {formatCurrency(totalCost)}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico: líneas de mantenimiento por mes */}
        <Card>
          <CardHeader className="bg-gray-900 text-white py-2 px-4">
            <CardTitle className="text-sm font-medium">
              Uso vs Mantenimiento - Vehículo {vehicle.plate}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={maintenanceByMonthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" name="Intervenciones" fill="#8884d8" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="mileage"
                    name="Kilometraje"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico: Evolución de costos */}
        <Card>
          <CardHeader className="bg-gray-900 text-white py-2 px-4">
            <CardTitle className="text-sm font-medium">
              Evolución de Costos de Mantenimiento - Vehículo {vehicle.plate}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costEvolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), "Costo"]} />
                  <Line type="monotone" dataKey="cost" name="Costo ($)" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico: Frecuencia entre mantenimientos */}
        <Card>
          <CardHeader className="bg-gray-900 text-white py-2 px-4">
            <CardTitle className="text-sm font-medium">
              Frecuencia entre mantenimientos - Vehículo {vehicle.plate}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" label={{ value: "Días entre mantenimientos", position: "bottom" }} />
                  <YAxis label={{ value: "Cantidad de ocurrencias", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Bar dataKey="frequency" name="Frecuencia" fill="#82b1ff" />
                  <Line type="monotone" dataKey="trend" name="Tendencia" stroke="#8884d8" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grilla detallada de intervenciones */}
      <Card>
        <CardHeader className="bg-gray-900 text-white py-2 px-4">
          <CardTitle className="text-sm font-medium">Detalle de Intervenciones</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Patente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo de intervención</TableHead>
                  <TableHead>Gasto mano de obra</TableHead>
                  <TableHead>Costo Repuestos</TableHead>
                  <TableHead>Detalle</TableHead>
                  <TableHead>Km al momento</TableHead>
                  <TableHead>Costo Total</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceData.map((intervention) => (
                  <TableRow key={intervention.id}>
                    <TableCell>{intervention.id}</TableCell>
                    <TableCell>{intervention.plate}</TableCell>
                    <TableCell>{intervention.date}</TableCell>
                    <TableCell>{intervention.type}</TableCell>
                    <TableCell>{formatCurrency(intervention.laborCost)}</TableCell>
                    <TableCell>{formatCurrency(intervention.partsCost)}</TableCell>
                    <TableCell>{intervention.description}</TableCell>
                    <TableCell>{intervention.kmAtMoment.toLocaleString()}</TableCell>
                    <TableCell className="bg-blue-100">{formatCurrency(intervention.totalCost)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-2">
            <div className="text-sm text-gray-500">
              Rows per page: <span className="font-medium">100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

