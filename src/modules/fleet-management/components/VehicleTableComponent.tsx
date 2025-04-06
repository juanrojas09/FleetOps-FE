"use client"

import { MoreHorizontal, Edit, Trash, MapPin, Droplets, PenToolIcon as Tool } from "lucide-react"
import { Vehicle } from "../../../models/Types/VehicleFleetTypes"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../common/ui/table"
import { Badge } from "../../../common/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../common/ui/dropdown-menu"
import { Button } from "../../../common/ui/button"


interface VehicleTableProps {
  vehicles: Vehicle[]
  onEdit: (vehicle: Vehicle) => void
  onDelete: (id: number) => void
}

export function VehicleTable({ vehicles, onEdit, onDelete }: VehicleTableProps) {
  // Function to get the status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Operativo":
        return "bg-green-100 text-green-800"
      case "En mantenimiento":
        return "bg-amber-100 text-amber-800"
      case "Fuera de servicio":
        return "bg-red-100 text-red-800"
      case "En reparación":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Patente</TableHead>
            <TableHead>Tipo de combustible</TableHead>
            <TableHead>Kilometraje</TableHead>
            <TableHead>Últ actividad registrada</TableHead>
            <TableHead>Estado actual</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.plate}</TableCell>
                <TableCell>{vehicle.fuelType}</TableCell>
                <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                <TableCell>
                  <span className="text-sm">
                    {vehicle.lastActivity.date} ({vehicle.lastActivity.type})
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(vehicle.status)}>{vehicle.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <VehicleActions
                      vehicle={vehicle}
                      onEdit={() => onEdit(vehicle)}
                      onDelete={() => onDelete(vehicle.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No se encontraron vehículos con los filtros aplicados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

interface VehicleActionsProps {
  vehicle: Vehicle
  onEdit: () => void
  onDelete: () => void
}

function VehicleActions({ vehicle, onEdit, onDelete }: VehicleActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="h-4 w-4 mr-2" />
          Eliminar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MapPin className="h-4 w-4 mr-2" />
          Alta de Viaje
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Droplets className="h-4 w-4 mr-2" />
          Alta de Carga
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Tool className="h-4 w-4 mr-2" />
          Alta de Intervención
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

