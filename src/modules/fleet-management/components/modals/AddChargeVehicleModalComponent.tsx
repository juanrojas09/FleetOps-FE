"use client"

import { useState } from "react"
import { Intervention, Vehicle } from "../../../../models/Types/VehicleFleetTypes"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../common/ui/dialog"
import { InterventionsForm } from "../forms/InterventionsFormComponents"

import { ArrowLeft } from "lucide-react"
import { Label } from "../../../../common/ui/label"
import { Input } from "../../../../common/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../common/ui/select"
import { Button } from "../../../../common/ui/button"

interface Charge {
  id: number
  date: string
  liters: number
  cost: number
  station: string
  odometer: number
  operator: string
}

interface AddChargeModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle 
  onSave: (vehicleId: number, charge: Charge) => void
}

export function AddChargeModal({ isOpen, onClose, vehicle, onSave }: AddChargeModalProps) {
  const [charge, setCharge] = useState<Charge>({
    id: 0,
    date: new Date().toISOString().split("T")[0],
    liters: 0,
    cost: 0,
    station: "",
    odometer: vehicle.mileage,
    operator: "",
  })

  const handleSave = () => {
    if (!charge.date || charge.liters <= 0 || charge.cost <= 0 || !charge.station) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    onSave(vehicle.id, { ...charge, id: Date.now() })

   
    setCharge({
      id: 0,
      date: new Date().toISOString().split("T")[0],
      liters: 0,
      cost: 0,
      station: "",
      odometer: vehicle.mileage,
      operator: "",
    })

    onClose()
  }

  const stationOptions = ["YPF Av. Libertador", "Shell Panamericana", "Axion Energy", "Otro..."]
  const operatorOptions = ["Fernando Perez", "Carlos Gutierrez", "Martín Rodriguez", "Otro..."]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Alta de Carga para {vehicle.brand} {vehicle.model} - {vehicle.plate}
          </DialogTitle>
        </DialogHeader>

      

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Fecha de carga*</Label>
              <Input
                id="date"
                type="date"
                value={charge.date}
                onChange={(e) => setCharge({ ...charge, date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="station">Estación de servicio*</Label>
              <Select value={charge.station} onValueChange={(value) => setCharge({ ...charge, station: value })}>
                <SelectTrigger id="station">
                  <SelectValue placeholder="Seleccionar estación" />
                </SelectTrigger>
                <SelectContent>
                  {stationOptions.map((station) => (
                    <SelectItem key={station} value={station}>
                      {station}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="operator">Operario responsable</Label>
              <Select value={charge.operator} onValueChange={(value) => setCharge({ ...charge, operator: value })}>
                <SelectTrigger id="operator">
                  <SelectValue placeholder="Seleccionar operario" />
                </SelectTrigger>
                <SelectContent>
                  {operatorOptions.map((operator) => (
                    <SelectItem key={operator} value={operator}>
                      {operator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="liters">Litros cargados*</Label>
              <Input
                id="liters"
                type="number"
                min="0"
                step="0.01"
                placeholder="Litros"
                value={charge.liters || ""}
                onChange={(e) => setCharge({ ...charge, liters: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label htmlFor="cost">Costo total*</Label>
              <Input
                id="cost"
                type="number"
                min="0"
                step="0.01"
                placeholder="Costo"
                value={charge.cost || ""}
                onChange={(e) => setCharge({ ...charge, cost: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label htmlFor="odometer">Odómetro (km)*</Label>
              <Input
                id="odometer"
                type="number"
                min={vehicle.mileage}
                placeholder="Kilometraje actual"
                value={charge.odometer || ""}
                onChange={(e) => setCharge({ ...charge, odometer: Number(e.target.value) })}
              />
              <p className="text-xs text-gray-500 mt-1">Kilometraje anterior: {vehicle.mileage} km</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" className="gap-2" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
            Cancelar
          </Button>

          <Button onClick={handleSave}>Guardar Carga</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

