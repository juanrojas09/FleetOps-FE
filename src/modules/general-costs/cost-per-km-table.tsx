"use client"

import { Button } from "../../common/ui/button"
import { Card, CardContent } from "../../common/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../common/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../common/ui/table"
import { MoreHorizontal } from "lucide-react"

interface CostPerKmTableProps {
  selectedVehicles: string[]
}

// Restructured data with brands as main objects
const costPerKmData = [
  {
    brand: "MERCEDES",
    kmRecorridos: 3920,
    costoPorKm: 1126.63,
  },
  {
    brand: "FORD",
    kmRecorridos: 3820,
    costoPorKm: 1138.43,
  },
  {
    brand: "IVECO",
    kmRecorridos: 3920,
    costoPorKm: 1138.43,
  },
  {
    brand: "RENAULT",
    kmRecorridos: 3920,
    costoPorKm: 1136.55,
  },
]

export function CostPerKmTable({ selectedVehicles }: CostPerKmTableProps) {
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
  const filteredData = costPerKmData.filter((item) => selectedVehicles.includes(item.brand))

  // Calculate averages for the selected vehicles
  const calculateAverages = () => {
    if (filteredData.length === 0) return { kmRecorridos: 0, costoPorKm: 0 }

    const totalKm = filteredData.reduce((sum, item) => sum + item.kmRecorridos, 0)
    const avgKm = totalKm / filteredData.length

    const totalCost = filteredData.reduce((sum, item) => sum + item.costoPorKm, 0)
    const avgCost = totalCost / filteredData.length

    return {
      kmRecorridos: avgKm,
      costoPorKm: avgCost,
    }
  }

  const averages = calculateAverages()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Costo x Km</h2>
          <p className="text-sm text-gray-500">Análisis de costo por kilómetro recorrido segmentado por marca</p>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow>
                <TableHead className="text-white">Marca</TableHead>
                <TableHead className="text-white text-right">Km Recorridos</TableHead>
                <TableHead className="text-white text-right">Costo por Km</TableHead>
                <TableHead className="text-white w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.brand}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.kmRecorridos)}</TableCell>
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
                <TableRow className="font-bold bg-gray-100">
                  <TableCell>PROMEDIO</TableCell>
                  <TableCell className="text-right">{formatNumber(averages.kmRecorridos)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(averages.costoPorKm)}</TableCell>
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
