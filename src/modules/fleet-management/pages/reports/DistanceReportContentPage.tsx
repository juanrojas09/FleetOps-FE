
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"



interface DistanceReportContentProps {
  vehicle: Vehicle
  periodType: string
  month: number
  year: number
}

export function DistanceReportContentPage({ vehicle, periodType, month, year }: DistanceReportContentProps) {
  // Datos simulados para el reporte
  const tripsData = [
    {
      id: 1,
      date: "05/03/2025",
      origin: "Buenos Aires",
      destination: "Rosario",
      distance: 300,
      driver: "Fernando Perez",
      fuelCost: 30000,
      duration: 3.5,
    },
    {
      id: 2,
      date: "12/03/2025",
      origin: "Rosario",
      destination: "Córdoba",
      distance: 400,
      driver: "Carlos Gutierrez",
      fuelCost: 40000,
      duration: 4,
    },
    {
      id: 3,
      date: "18/03/2025",
      origin: "Córdoba",
      destination: "Buenos Aires",
      distance: 700,
      driver: "Fernando Perez",
      fuelCost: 70000,
      duration: 7.5,
    },
    {
      id: 4,
      date: "25/03/2025",
      origin: "Buenos Aires",
      destination: "Mar del Plata",
      distance: 400,
      driver: "Carlos Gutierrez",
      fuelCost: 40000,
      duration: 4.5,
    },
  ]

  // Datos para el gráfico de distancia mensual
  const monthlyDistanceData = [
    { month: "Ene", distance: 1200, trips: 4 },
    { month: "Feb", distance: 1500, trips: 5 },
    { month: "Mar", distance: 1800, trips: 4 },
    { month: "Abr", distance: 1300, trips: 3 },
    { month: "May", distance: 1600, trips: 4 },
    { month: "Jun", distance: 1400, trips: 3 },
  ]

  // Datos para el gráfico de costo por km
  const costPerKmData = [
    { month: "Ene", costPerKm: 100 },
    { month: "Feb", costPerKm: 105 },
    { month: "Mar", costPerKm: 110 },
    { month: "Abr", costPerKm: 108 },
    { month: "May", costPerKm: 112 },
    { month: "Jun", costPerKm: 115 },
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
  const totalDistance = tripsData.reduce((sum, item) => sum + item.distance, 0)
  const totalTrips = tripsData.length
  const totalFuelCost = tripsData.reduce((sum, item) => sum + item.fuelCost, 0)
  const avgCostPerKm = totalFuelCost / totalDistance
  const totalDuration = tripsData.reduce((sum, item) => sum + item.duration, 0)
  const avgSpeed = totalDistance / totalDuration

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <path d="M12 2v8"></path>
                <path d="m4.93 10.93 1.41 1.41"></path>
                <path d="M2 18h2"></path>
                <path d="M20 18h2"></path>
                <path d="m19.07 10.93-1.41 1.41"></path>
                <path d="M22 22H2"></path>
                <path d="m16 6-4 4-4-4"></path>
                <path d="M16 18a4 4 0 0 0-8 0"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Distancia Total</p>
              <p className="text-2xl font-bold">{totalDistance} km</p>
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
              <p className="text-sm font-medium">Viajes Realizados</p>
              <p className="text-2xl font-bold">{totalTrips}</p>
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
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Costo por Km</p>
              <p className="text-2xl font-bold">{formatCurrency(avgCostPerKm)}</p>
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
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Velocidad Promedio</p>
              <p className="text-2xl font-bold">{avgSpeed.toFixed(0)} km/h</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distancia Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyDistanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "distance") return [`${value} km`, "Distancia"]
                      if (name === "trips") return [`${value}`, "Viajes"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="distance" name="Distancia" fill="#ef4444" />
                  <Bar yAxisId="right" dataKey="trips" name="Viajes" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolución Costo por Km</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costPerKmData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, "Costo por Km"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="costPerKm"
                    name="Costo por Km"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Viajes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Distancia</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Conductor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tripsData.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>{trip.date}</TableCell>
                    <TableCell>{trip.origin}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>{trip.distance} km</TableCell>
                    <TableCell>{trip.duration} h</TableCell>
                    <TableCell>{formatCurrency(trip.fuelCost)}</TableCell>
                    <TableCell>{trip.driver}</TableCell>
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

