"use client"

import { useState } from "react"
import { Intervention, Vehicle } from "../../../../models/Types/VehicleFleetTypes"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../common/ui/dialog"
import { InterventionsForm } from "../forms/InterventionsFormComponents"


interface AddInterventionModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle
  onSave: (vehicleId: number, intervention: Intervention) => void
}

export function AddInterventionModal({ isOpen, onClose, vehicle, onSave }: AddInterventionModalProps) {
  const [interventions, setInterventions] = useState<Intervention[]>([])

  const handleSave = () => {
    if (interventions.length > 0) {
      // Guardar la última intervención agregada
      onSave(vehicle.id, interventions[interventions.length - 1])
      setInterventions([])
      onClose()
    } else {
      alert("No hay intervenciones para guardar")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Alta de Intervención para {vehicle.brand} {vehicle.model} - {vehicle.plate}</DialogTitle>
        </DialogHeader>
        
        <InterventionsForm 
          interventions={interventions} 
          setInterventions={setInterventions} 
          vehiclePlate={vehicle.plate}
          onPrevious={onClose}
          onNext={handleSave}
        />
      </DialogContent>
    </Dialog>
  )
}
