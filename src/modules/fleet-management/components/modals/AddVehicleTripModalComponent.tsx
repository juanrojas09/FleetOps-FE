"use client"

import { useState } from "react"

import { Trip, Vehicle } from "../../../../models/Types/VehicleFleetTypes"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../common/ui/dialog"
import { TripsForm } from "../forms/TripsFormsComponents"


interface AddTripModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle  
  onSave: (vehicleId: number, trip: Trip) => void
}

export function AddTripModal({ isOpen, onClose, vehicle, onSave }: AddTripModalProps) {
  const [trips, setTrips] = useState<Trip[]>([])

  const handleSave = () => {
    if (trips.length > 0) {
      // Guardar el último viaje agregado
      onSave(vehicle.id, trips[trips.length - 1])
      setTrips([])
      onClose()
    } else {
      alert("No hay viajes para guardar")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Alta de Viaje para {vehicle.brand} {vehicle.model} - {vehicle.plate}
          </DialogTitle>
        </DialogHeader>

        <TripsForm
          trips={trips}
          setTrips={setTrips}
          vehiclePlate={vehicle.plate}
          onPrevious={onClose}
          onNext={handleSave}
        />
      </DialogContent>
    </Dialog>
  )
}

