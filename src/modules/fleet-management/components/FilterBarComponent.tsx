"use client"

import { Search, Plus } from "lucide-react"
import { Input } from "../../../common/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../common/ui/select"
import { fuelTypeOptions, statusOptions } from "./forms/VehicleDetailsFormComponent"
import { Button } from "../../../common/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../common/ui/dropdown-menu"


interface FilterBarProps {
  brandFilter: string
  setBrandFilter: (value: string) => void
  modelFilter: string
  setModelFilter: (value: string) => void
  plateFilter: string
  setPlateFilter: (value: string) => void
  fuelTypeFilter: string
  setFuelTypeFilter: (value: string) => void
  mileageFilter: string
  setMileageFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  clearFilters: () => void
  onAddVehicleClick: () => void
  onImportClick: () => void
}

export function FilterBar({
  brandFilter,
  setBrandFilter,
  modelFilter,
  setModelFilter,
  plateFilter,
  setPlateFilter,
  fuelTypeFilter,
  setFuelTypeFilter,
  mileageFilter,
  setMileageFilter,
  statusFilter,
  setStatusFilter,
  clearFilters,
  onAddVehicleClick,
  onImportClick,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Input
        placeholder="Marca"
        value={brandFilter}
        onChange={(e) => setBrandFilter(e.target.value)}
        className="w-full md:w-auto"
      />
      <Input
        placeholder="Modelo"
        value={modelFilter}
        onChange={(e) => setModelFilter(e.target.value)}
        className="w-full md:w-auto"
      />
      <Input
        placeholder="Patente"
        value={plateFilter}
        onChange={(e) => setPlateFilter(e.target.value)}
        className="w-full md:w-auto"
      />
      <Select value={fuelTypeFilter} onValueChange={setFuelTypeFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Tipo de Combustible" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {fuelTypeOptions.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Kilometraje"
        value={mileageFilter}
        onChange={(e) => setMileageFilter(e.target.value)}
        className="w-full md:w-auto"
      />
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Estado Actual" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={clearFilters} className="gap-2">
        <Search className="h-4 w-4" />
        Buscar
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Añadir Vehículo
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onAddVehicleClick}>Añadir manualmente</DropdownMenuItem>
          <DropdownMenuItem onClick={onImportClick}>Importar desde Excel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

