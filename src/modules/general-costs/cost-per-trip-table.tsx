"use client"

import { Button } from "../../common/ui/button"
import { Card, CardContent } from "../../common/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../common/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../common/ui/table"
import { MoreHorizontal } from "lucide-react"

interface CostPerTripTableProps {
  selectedVehicles: string[]
}

// Restructured data with brands as rows and concepts as columns
const costPerTripData = [
  {
    brand: "MERCEDES",
    viajesRealizados: 9450,
    costoPorKm: 1126.63,
  },
  {
    brand: "FORD",
    viajesRealizados: 10540,
    costoPorKm: 1126.63,
  },
  {
    brand: "IVECO",
    viajesRealizados: 9048,
    costoPorKm: 1126.63,
  },
  {
    brand: "RENAULT",
    viajesRealizados: 9048,
    costoPorKm: 1126.63,
  },
]

// Calculate averages
const calculateAverages = (data: typeof costPerTripData, selectedVehicles: string[]) => {
  const filteredData = data.filter((item) => selectedVehicles.includes(item.brand))

  if (filteredData.length === 0) return { avgViajesRealizados: 0, avgCostoPorKm: 0 }

  const totalViajes = filteredData.reduce((sum, item) => sum + item.viajesRealizados, 0)
  const avgViajes = totalViajes / filteredData.length

  const totalCosto = filteredData.reduce((sum, item) => sum + item.costoPorKm, 0)
  const avgCosto = totalCosto / filteredData.length

  return {
    avgViajesRealizados: avgViajes,
    avgCostoPorKm: avgCosto,
  }
}

export function CostPerTripTable({ selectedVehicles }: CostPerTripTableProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  // Format number
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("es-AR").format(value)
  }

  // Filter data based on selected vehicles
  const filteredData = costPerTripData.filter((item) => selectedVehicles.includes(item.brand))

  // Calculate averages for the selected vehicles
  const averages = calculateAverages(costPerTripData, selectedVehicles)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Costo x Viaje</h2>
          <p className="text-sm text-gray-500">Análisis de costo por viaje segmentado por marca</p>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow>
                <TableHead className="text-white">Marca</TableHead>
                <TableHead className="text-white text-right">Viajes Realizados</TableHead>
                <TableHead className="text-white text-right">Costo por Km</TableHead>
                <TableHead className="text-white w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.brand}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.viajesRealizados)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.costoPorKm)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length > 0 && (
                <TableRow className="font-bold ">
                  <TableCell>PROMEDIO</TableCell>
                  <TableCell className="text-right">{formatNumber(averages.avgViajesRealizados)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(averages.avgCostoPorKm)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
