"use client"

import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/ui/table"
import { Badge } from "../../../../common/ui/badge"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"
import { Pencil, Trash2 } from "lucide-react"


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
      patente: vehicle.plate,
      fecha: "04/03/2025",
      distancia: 300,
      costeEstimado: 120000,
      tnTransportadas: 24,
      cantidadViajes: 1,
      precioLitro: 1315,
      litrosConsumidos: 45.5,
    },
  ]

  // Datos para el gráfico de litros y distancia por viaje con carga
  const litersAndDistanceData = [
    { viaje: "Viaje 1", litros: 400, distancia: 300, toneladas: 50 },
    { viaje: "Viaje 2", litros: 300, distancia: 250, toneladas: 45 },
    { viaje: "Viaje 3", litros: 450, distancia: 320, toneladas: 70 },
    { viaje: "Viaje 4", litros: 350, distancia: 280, toneladas: 55 },
  ]

  // Datos para el gráfico de litros por tonelada transportada
  const litersPerTonData = [
    { viaje: "Viaje 1", litrosPorTonelada: 6.5 },
    { viaje: "Viaje 2", litrosPorTonelada: 7.2 },
    { viaje: "Viaje 3", litrosPorTonelada: 6.2 },
    { viaje: "Viaje 4", litrosPorTonelada: 6.8 },
  ]

  // Datos para el gráfico de km por tonelada vs costo estimado
  const kmPerTonVsCostData = [
    { viaje: "Viaje 1", kmPorTonelada: 6.0, costoEstimado: 120000 },
    { viaje: "Viaje 2", kmPorTonelada: 5.5, costoEstimado: 150000 },
    { viaje: "Viaje 3", kmPorTonelada: 4.5, costoEstimado: 100000 },
    { viaje: "Viaje 4", kmPorTonelada: 5.0, costoEstimado: 130000 },
  ]

  // Datos para el gráfico de rendimiento por tonelada
  const performancePerTonData = [
    { viaje: "Viaje 1", rendimiento: 3.8 },
    { viaje: "Viaje 2", rendimiento: 5.5 },
    { viaje: "Viaje 3", rendimiento: 3.5 },
    { viaje: "Viaje 4", rendimiento: 4.5 },
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico: Litros y Distancia por Viaje con Carga Transportada */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 flex justify-between">
              <span>Litros y Distancia por Viaje con Carga Transportada</span>
              <span>Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={litersAndDistanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="viaje" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[40, 70]} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "litros") return [`${value} L`, "Litros"]
                      if (name === "distancia") return [`${value} km`, "Distancia"]
                      if (name === "toneladas") return [`${value} Tn`, "Toneladas"]
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="litros" name="Litros" fill="#f59e0b" />
                  <Bar yAxisId="left" dataKey="distancia" name="Distancia (km)" fill="#3b82f6" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="toneladas"
                    name="Toneladas"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico: Litros por Tonelada Transportada */}
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 flex justify-between">
              <span>Litros por Tonelada Transportada</span>
              <span>Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={litersPerTonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="viaje" />
                  <YAxis domain={[0, 8]} />
                  <Tooltip formatter={(value) => [`${value} L/Tn`, "Litros por Tonelada"]} />
                  <Legend />
                  <Bar dataKey="litrosPorTonelada" name="Litros por Tonelada" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium">Costo Promedio por tonelada:</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-medium">3000$</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Coste Real vs Coste Estimado */}
        <Card className="overflow-hidden col-span-1">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 flex justify-between">
              <span>Coste Real vs Coste Estimado</span>
              <span>Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="text-xs font-medium mb-1">Km realizados en el período</div>
                <div className="text-xl font-bold">400</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-medium mb-1">Precio del litro promedio en el período</div>
                <div className="text-xl font-bold">1315$</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-medium mb-1">Km estimados a realizar en el período</div>
                <div className="text-xl font-bold">340</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Costo Real:</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-medium">60.000$</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Costo Estimado:</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-medium">50.000$</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico: Kilómetros por Tonelada vs Costo Estimado del Viaje */}
        <Card className="overflow-hidden col-span-1">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 flex justify-between">
              <span>Kilómetros por Tonelada vs Costo Estimado del Viaje</span>
              <span>Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={kmPerTonVsCostData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="viaje" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "kmPorTonelada") return [`${value} km/Tn`, "Km por Tonelada"]
                      if (name === "costoEstimado") return [formatCurrency(value as number), "Costo Estimado"]
                      return [value, name]
                    }}
                  />
                  <Bar yAxisId="left" dataKey="kmPorTonelada" name="Km por Tonelada" fill="#3b82f6" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="costoEstimado"
                    name="Costo Estimado"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico: Rendimiento (Km/L) ajustado por Tonelada */}
        <Card className="overflow-hidden col-span-1">
          <CardHeader className="p-0">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 flex justify-between">
              <span>Rendimiento (Km/L) ajustado por Tonelada</span>
              <span>Mes</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performancePerTonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="viaje" />
                  <YAxis domain={[3, 6]} />
                  <Tooltip formatter={(value) => [`${value} km/L`, "Rendimiento"]} />
                  <Line
                    type="monotone"
                    dataKey="rendimiento"
                    name="Rendimiento"
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
                  <TableHead>Distancia (Google)</TableHead>
                  <TableHead>Coste estimado</TableHead>
                  <TableHead>Tn transportadas</TableHead>
                  <TableHead>Cantidad de viajes</TableHead>
                  <TableHead>Precio por litro en este período</TableHead>
                  <TableHead>Litros consumidos estimado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargoData.map((cargo) => (
                  <TableRow key={cargo.id}>
                    <TableCell>{cargo.id}</TableCell>
                    <TableCell>{cargo.patente}</TableCell>
                    <TableCell>{cargo.fecha}</TableCell>
                    <TableCell>{cargo.distancia} km</TableCell>
                    <TableCell>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-center">
                        {formatCurrency(cargo.costeEstimado)}
                      </div>
                    </TableCell>
                    <TableCell>{cargo.tnTransportadas}</TableCell>
                    <TableCell>{cargo.cantidadViajes}</TableCell>
                    <TableCell>{formatCurrency(cargo.precioLitro)}</TableCell>
                    <TableCell>{cargo.litrosConsumidos} L</TableCell>
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
