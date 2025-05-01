"use client"

import { useState, useEffect } from "react"
import { Vehicle } from "../../../../models/Types/VehicleFleetTypes"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../../common/ui/dialog"
import { Label } from "../../../../common/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../common/ui/select"
import { Input } from "../../../../common/ui/input"
import { Button } from "../../../../common/ui/button"




interface EditVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle
  onSave: (vehicle: Vehicle) => void
}
export const fuelTypeOptions = ["NAFTA", "DIESEL", "GNC", "ELÉCTRICO", "HÍBRIDO"]
export const statusOptions = ["Operativo", "En mantenimiento", "Fuera de servicio", "En reparación"]
export const brandOptions = ["Mercedes", "Renault", "Citroen", "Toyota", "Chevrolet", "Ford", "Iveco"]
export const serviceOptions = ["BCA", "EV", "TEMAL", "EV PRIVADOS"]

export function EditVehicleModal({ isOpen, onClose, vehicle, onSave }: EditVehicleModalProps) {
  const [editedVehicle, setEditedVehicle] = useState<Vehicle>(vehicle)

  // Update local state when vehicle prop changes
  useEffect(() => {
    setEditedVehicle(vehicle)
  }, [vehicle])

  const handleSave = () => {
    onSave(editedVehicle)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Vehículo</DialogTitle>
          <DialogDescription>Modifique la información del vehículo.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-brand">Marca</Label>
              <Select
                value={editedVehicle.brand}
                onValueChange={(value) => setEditedVehicle({ ...editedVehicle, brand: value })}
              >
                <SelectTrigger id="edit-brand">
                  <SelectValue placeholder="Seleccionar marca" />
                </SelectTrigger>
                <SelectContent>
                  {brandOptions.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-model">Modelo</Label>
              <Input
                id="edit-model"
                value={editedVehicle.model}
                onChange={(e) => setEditedVehicle({ ...editedVehicle, model: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-plate">Patente</Label>
              <Input
                id="edit-plate"
                value={editedVehicle.plate}
                onChange={(e) => setEditedVehicle({ ...editedVehicle, plate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-fuelType">Tipo de combustible</Label>
              <Select
                value={editedVehicle.fuelType}
                onValueChange={(value) => setEditedVehicle({ ...editedVehicle, fuelType: value })}
              >
                <SelectTrigger id="edit-fuelType">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-mileage">Kilometraje</Label>
              <Input
                id="edit-mileage"
                type="number"
                value={editedVehicle.mileage}
                onChange={(e) => setEditedVehicle({ ...editedVehicle, mileage: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Estado</Label>
              <Select
                value={editedVehicle.status}
                onValueChange={(value) => setEditedVehicle({ ...editedVehicle, status: value })}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

