"use client"

import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"


interface CargoReportContentProps {
  vehicle: Vehicle
  periodType: string
  month: number
  year: number
}

export function CargoReportContentPage({ vehicle, periodType, month, year }: CargoReportContentProps) {
  // Datos simulados para el reporte
  const cargoData = [
    {
      id: 1,
      date: "05/03/2025",
      type: "Materiales de construcción",
      weight: 2500,
      origin: "Buenos Aires",
      destination: "Rosario",
      distance: 300,
      driver: "Fernando Perez",
      cost: 30000,
    },
    {
      id: 2,
      date: "12/03/2025",
      type: "Productos alimenticios",
      weight: 1800,
      origin: "Rosario",
      destination: "Córdoba",
      distance: 400,
      driver: "Carlos Gutierrez",
      cost: 40000,
    },
    {
      id: 3,
      date: "18/03/2025",
      type: "Equipamiento industrial",
      weight: 3200,
      origin: "Córdoba",
      destination: "Buenos Aires",
      distance: 700,
      driver: "Fernando Perez",
      cost: 70000,
    },
    {
      id: 4,
      date: "25/03/2025",
      type: "Materiales de construcción",
      weight: 2800,
      origin: "Buenos Aires",
      destination: "Mar del Plata",
      distance: 400,
      driver: "Carlos Gutierrez",
      cost: 40000,
    },
  ]

  // Datos para el gráfico de tipos de carga
  const cargoTypeData = [
    { name: "Materiales de construcción", value: 5300, color: "#f59e0b" },
    { name: "Productos alimenticios", value: 1800, color: "#10b981" },
    { name: "Equipamiento industrial", value: 3200, color: "#3b82f6" },
  ]

  // Datos para el gráfico de peso por viaje
  const weightPerTripData = [
    { id: 1, weight: 2500, distance: 300 },
    { id: 2, weight: 1800, distance: 400 },
    { id: 3, weight: 3200, distance: 700 },
    { id: 4, weight: 2800, distance: 400 },
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

  // Calcular totales y promedios
  const totalWeight = cargoData.reduce((sum, item) => sum + item.weight, 0)
  const totalTrips = cargoData.length
  const totalDistance = cargoData.reduce((sum, item) => sum + item.distance, 0)
  const totalCost = cargoData.reduce((sum, item) => sum + item.cost, 0)
  const avgWeightPerTrip = totalWeight / totalTrips
  const costPerTon = totalCost / (totalWeight / 1000)

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
                <path d="M12 22V2"></path>
                <path d="M17 22H7"></path>
                <path d="M20 7H4"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Peso Total</p>
              <p className="text-2xl font-bold">{totalWeight} kg</p>
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
                <path d="M8 6v6"></path>
                <path d="M8 16h.01"></path>
                <path d="M16 6h.01"></path>
                <path d="M16 10h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M16 18h.01"></path>
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Viajes con Carga</p>
              <p className="text-2xl font-bold">{totalTrips}</p>
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
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                <path d="M12 3v6"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Peso Promedio</p>
              <p className="text-2xl font-bold">{avgWeightPerTrip.toFixed(0)} kg</p>
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
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Costo por Tonelada</p>
              <p className="text-2xl font-bold">{formatCurrency(costPerTon)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Tipo de Carga</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cargoTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {cargoTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} kg`, "Peso"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peso por Viaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weightPerTripData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" label={{ value: "Viaje #", position: "insideBottom", offset: -5 }} />
                  <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "weight") return [`${value} kg`, "Peso"]
                      if (name === "distance") return [`${value} km`, "Distancia"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="weight" name="Peso" fill="#f59e0b" />
                  <Bar yAxisId="right" dataKey="distance" name="Distancia" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Cargas Transportadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo de Carga</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Distancia</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Conductor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargoData.map((cargo) => (
                  <TableRow key={cargo.id}>
                    <TableCell>{cargo.date}</TableCell>
                    <TableCell>{cargo.type}</TableCell>
                    <TableCell>{cargo.weight} kg</TableCell>
                    <TableCell>{cargo.origin}</TableCell>
                    <TableCell>{cargo.destination}</TableCell>
                    <TableCell>{cargo.distance} km</TableCell>
                    <TableCell>{formatCurrency(cargo.cost)}</TableCell>
                    <TableCell>{cargo.driver}</TableCell>
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

