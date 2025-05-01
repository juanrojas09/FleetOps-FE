"use client"

import { Button } from "../../common/ui/button"
import { Card, CardContent } from "../../common/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../common/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../common/ui/table"
import { MoreHorizontal, Plus } from "lucide-react"

interface GeneralCostsTableProps {
  selectedVehicles: string[]
}

// Sample data based on the provided image - transposed as requested
const generalCostsData = [
  {
    brand: "MERCEDES",
    chofer: 1380000.0,
    seguroCamion: 270200.0,
    seguroBatea: 86200.0,
    impuestoMuni: 50000.0,
    impuestoMuniBatea: 11498.0,
    impuestoDGR: 46800.0,
    impuestoDGRBatea: 1600.0,
    combustible: 1995073.0,
    mantenimiento: 575000.0,
  },
  {
    brand: "FORD",
    chofer: 1380000.0,
    seguroCamion: 140000.0,
    seguroBatea: 79600.0,
    impuestoMuni: 54000.0,
    impuestoMuniBatea: 4400.0,
    impuestoDGR: 0.0,
    impuestoDGRBatea: 900.0,
    combustible: 1664600.0,
    mantenimiento: 620000.0,
  },
  {
    brand: "IVECO",
    chofer: 1380000.0,
    seguroCamion: 479040.0,
    seguroBatea: 0.0,
    impuestoMuni: 138700.0,
    impuestoMuniBatea: 0.0,
    impuestoDGR: 53200.0,
    impuestoDGRBatea: 0.0,
    combustible: 450000.0,
    mantenimiento: 250000.0,
  },
  {
    brand: "RENAULT",
    chofer: 1380000.0,
    seguroCamion: 320000.0,
    seguroBatea: 0.0,
    impuestoMuni: 95000.0,
    impuestoMuniBatea: 0.0,
    impuestoDGR: 42000.0,
    impuestoDGRBatea: 0.0,
    combustible: 1250000.0,
    mantenimiento: 380000.0,
  },
]

// Calculate totals for each brand
const calculateBrandTotals = (data: typeof generalCostsData) => {
  return data.map((brand) => {
    const total =
      brand.chofer +
      brand.seguroCamion +
      brand.seguroBatea +
      brand.impuestoMuni +
      brand.impuestoMuniBatea +
      brand.impuestoDGR +
      brand.impuestoDGRBatea +
      brand.combustible +
      brand.mantenimiento
    return { ...brand, total }
  })
}

// Calculate totals for each concept
const calculateConceptTotals = (data: typeof generalCostsData) => {
  return {
    chofer: data.reduce((sum, brand) => sum + brand.chofer, 0),
    seguroCamion: data.reduce((sum, brand) => sum + brand.seguroCamion, 0),
    seguroBatea: data.reduce((sum, brand) => sum + brand.seguroBatea, 0),
    impuestoMuni: data.reduce((sum, brand) => sum + brand.impuestoMuni, 0),
    impuestoMuniBatea: data.reduce((sum, brand) => sum + brand.impuestoMuniBatea, 0),
    impuestoDGR: data.reduce((sum, brand) => sum + brand.impuestoDGR, 0),
    impuestoDGRBatea: data.reduce((sum, brand) => sum + brand.impuestoDGRBatea, 0),
    combustible: data.reduce((sum, brand) => sum + brand.combustible, 0),
    mantenimiento: data.reduce((sum, brand) => sum + brand.mantenimiento, 0),
    total: data.reduce(
      (sum, brand) =>
        sum +
        brand.chofer +
        brand.seguroCamion +
        brand.seguroBatea +
        brand.impuestoMuni +
        brand.impuestoMuniBatea +
        brand.impuestoDGR +
        brand.impuestoDGRBatea +
        brand.combustible +
        brand.mantenimiento,
      0,
    ),
  }
}

const dataWithTotals = calculateBrandTotals(generalCostsData)
const conceptTotals = calculateConceptTotals(generalCostsData)

export function GeneralCostsTable({ selectedVehicles }: GeneralCostsTableProps) {
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

  // Filter data based on selected vehicles
  const filteredData = dataWithTotals.filter((item) => selectedVehicles.includes(item.brand))

  return (
    <Card className="p-4">
      <CardContent >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Datos Generales</h2>
          <Button className="gap-2 bg-gray-900 hover:bg-gray-800">
            <Plus className="h-4 w-4" />
            Agregar Concepto
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow>
                <TableHead className="text-white">Marca</TableHead>
                <TableHead className="text-white text-right">Chofer</TableHead>
                <TableHead className="text-white text-right">Seguro Camión</TableHead>
                <TableHead className="text-white text-right">Seguro Batea</TableHead>
                <TableHead className="text-white text-right">Impuesto Muni</TableHead>
                <TableHead className="text-white text-right">Impuesto Muni Batea</TableHead>
                <TableHead className="text-white text-right">Impuesto DGR</TableHead>
                <TableHead className="text-white text-right">Impuesto DGR Batea</TableHead>
                <TableHead className="text-white text-right">Combustible</TableHead>
                <TableHead className="text-white text-right">Mantenimiento</TableHead>
                <TableHead className="text-white text-right">Total</TableHead>
                <TableHead className="text-white w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.brand}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.chofer)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.seguroCamion)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.seguroBatea)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.impuestoMuni)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.impuestoMuniBatea)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.impuestoDGR)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.impuestoDGRBatea)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.combustible)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.mantenimiento)}</TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(item.total)}</TableCell>
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
              <TableRow className="font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.chofer)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.seguroCamion)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.seguroBatea)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.impuestoMuni)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.impuestoMuniBatea)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.impuestoDGR)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.impuestoDGRBatea)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.combustible)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.mantenimiento)}</TableCell>
                <TableCell className="text-right">{formatCurrency(conceptTotals.total)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
