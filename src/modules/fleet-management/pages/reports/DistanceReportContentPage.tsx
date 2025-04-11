
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"
import { Pencil, Trash2 } from "lucide-react"



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
      patente: "MFJ 072",
      fecha: "04/7/2025",
      distanciaSemanal: 15,
      distanciaMensual: 24,
      horasDeUso: 12,
      cantidadViajes: 4,
      litrosConsumidos: 31,
      servicioAsignado: "BCA",
      responsable: "Juan Gomez",
      costoEstimado: 120000,
    },
  ]

  // Datos para el gráfico de uso vs distancia
  const monthlyUsageData = [
    { month: "Ene", trips: 12, distance: 600 },
    { month: "Feb", trips: 18, distance: 700 },
    { month: "Mar", trips: 10, distance: 400 },
    { month: "Abr", trips: 25, distance: 1000 },
    { month: "May", trips: 9, distance: 300 },
    { month: "Jun", trips: 6, distance: 200 },
  ]

  // Datos para el gráfico de uso del vehículo (días activos vs inactivos)
  const vehicleUsageData = [
    { name: "Días Activos", value: 29 },
    { name: "Días Inactivos", value: 71 },
  ]

  const COLORS = ["#22c55e", "#ef4444"]

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Distancia Recorrida Total */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1">
              Distancia Recorrida Total
              <span className="float-right">Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-bold mb-2">543 KM</div>
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">-26%</div>
              <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
            </div>
          </CardContent>
        </Card>

        {/* Distancia Promedio por viaje */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1">
              Distancia Promedio por viaje
              <span className="float-right">Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-bold mb-2">120KM</div>
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">+27%</div>
              <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
            </div>
          </CardContent>
        </Card>

        {/* Viajes Totales */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1">
              Viajes Totales
              <span className="float-right">Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-bold mb-2">54</div>
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">+26%</div>
              <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
            </div>
          </CardContent>
        </Card>

        {/* Responsable del auto */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1">
              Responsable del auto
              <span className="float-right">Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-bold mb-2">Juan Gomez</div>
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">+26%</div>
              <span className="text-xs text-gray-500 ml-2">del mes pasado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico combinado: Uso vs. Distancia recorrida */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1">Uso vs. Distancia Recorrida - Vehículo</div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 1000]} tickFormatter={(value) => `${value}`} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "trips") return [`${value}`, "Cantidad de viajes"]
                      if (name === "distance") return [`${value} km`, "KM recorridos"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="trips" name="Cantidad de viajes" fill="#4f86f7" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="distance"
                    name="KM recorridos"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de uso del vehículo (actividad diaria) */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1">Uso del Vehículo en March 2024</div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {vehicleUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de registros detallados */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Patente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Distancia Semanal (km)</TableHead>
                  <TableHead>Distancia Mensual (km)</TableHead>
                  <TableHead>Horas de Uso</TableHead>
                  <TableHead>Cantidad de viajes</TableHead>
                  <TableHead>Litros Consumidos</TableHead>
                  <TableHead>Servicio Asignado</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Costo Estimado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tripsData.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>{trip.id}</TableCell>
                    <TableCell>{trip.patente}</TableCell>
                    <TableCell>{trip.fecha}</TableCell>
                    <TableCell>{trip.distanciaSemanal}</TableCell>
                    <TableCell>{trip.distanciaMensual}</TableCell>
                    <TableCell>{trip.horasDeUso}</TableCell>
                    <TableCell>{trip.cantidadViajes}</TableCell>
                    <TableCell>{trip.litrosConsumidos}</TableCell>
                    <TableCell>{trip.servicioAsignado}</TableCell>
                    <TableCell>{trip.responsable}</TableCell>
                    <TableCell>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-center">
                        {formatCurrency(trip.costoEstimado)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Pencil size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
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
