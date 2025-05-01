"use client"

import type React from "react"

import { useState } from "react"
import { Intervention, Trip } from "../../../../models/Types/VehicleFleetTypes"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../../common/ui/dialog"
import { VehicleDetailsForm } from "../forms/VehicleDetailsFormComponent"
import { TripsForm } from "../forms/TripsFormsComponents"
import { InterventionsForm } from "../forms/InterventionsFormComponents"
import { VehicleSummary } from "../forms/VehicleSummaryComponent"
import { Button } from "../../../../common/ui/button"


interface AddVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (vehicleData: any, trips: Trip[], interventions: Intervention[]) => void
  trips: Trip[]
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
  interventions: Intervention[]
  setInterventions: React.Dispatch<React.SetStateAction<Intervention[]>>
}

export function AddVehicleModal({
  isOpen,
  onClose,
  onSave,
  trips,
  setTrips,
  interventions,
  setInterventions,
}: AddVehicleModalProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [vehicleData, setVehicleData] = useState({
    brand: "",
    model: "",
    year: "",
    plate: "",
    service: "",
    fuelType: "",
    mileage: "",
  })

  const handleNextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSave = () => {
    onSave(vehicleData, trips, interventions)
    // Reset form
    setVehicleData({
      brand: "",
      model: "",
      year: "",
      plate: "",
      service: "",
      fuelType: "",
      mileage: "",
    })
    setActiveStep(0)
  }

  const handleClose = () => {
    // Reset form
    setVehicleData({
      brand: "",
      model: "",
      year: "",
      plate: "",
      service: "",
      fuelType: "",
      mileage: "",
    })
    setTrips([])
    setInterventions([])
    setActiveStep(0)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Vehículo</DialogTitle>
          <DialogDescription>
            Complete la información del vehículo. Los campos marcados con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="mb-4">
          <div className="flex justify-between">
            <div className={`text-sm font-medium ${activeStep >= 0 ? "text-primary" : "text-gray-500"}`}>
              1. Datos del Vehículo
            </div>
            <div className={`text-sm font-medium ${activeStep >= 1 ? "text-primary" : "text-gray-500"}`}>2. Viajes</div>
            <div className={`text-sm font-medium ${activeStep >= 2 ? "text-primary" : "text-gray-500"}`}>
              3. Intervenciones
            </div>
            <div className={`text-sm font-medium ${activeStep >= 3 ? "text-primary" : "text-gray-500"}`}>
              4. Resumen
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(activeStep + 1) * 25}%` }}></div>
          </div>
        </div>

        {/* Step content */}
        {activeStep === 0 && <VehicleDetailsForm vehicleData={vehicleData} setVehicleData={setVehicleData} />}

        {activeStep === 1 && <TripsForm trips={trips} setTrips={setTrips} />}

        {activeStep === 2 && <InterventionsForm interventions={interventions} setInterventions={setInterventions} />}
        

        {activeStep === 3 && <VehicleSummary vehicleData={vehicleData} trips={trips} interventions={interventions} />}

        <DialogFooter>
          {activeStep > 0 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Anterior
            </Button>
          )}
          {activeStep < 3 ? (
            <Button onClick={handleNextStep}>Siguiente</Button>
          ) : (
            <Button onClick={handleSave}>Guardar Vehículo</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

