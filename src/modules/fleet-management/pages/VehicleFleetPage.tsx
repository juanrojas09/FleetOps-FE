"use client"

import { useState, useEffect } from "react"
import { Intervention, Trip, Vehicle } from "../../../models/Types/VehicleFleetTypes"
import { PageHeader } from "../components/PageHeaderComponent"
import { FilterBar } from "../components/FilterBarComponent"
import { VehicleTable } from "../components/VehicleTableComponent"
import { Pagination } from "../components/PaginationComponent"
import { AddVehicleModal } from "../components/modals/AddVehicleModalComponent"
import { EditVehicleModal } from "../components/modals/EditVehicleModalComponent"
import { ImportVehiclesModal } from "../components/modals/ImportVehicleModalComponent"
import { vehiclesData } from "../../../common/mocked-data/VehicleFleetData"


export default function VehicleFleetPage() {
  // States for filters
  const [brandFilter, setBrandFilter] = useState("")
  const [modelFilter, setModelFilter] = useState("")
  const [plateFilter, setPlateFilter] = useState("")
  const [fuelTypeFilter, setFuelTypeFilter] = useState("")
  const [mileageFilter, setMileageFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // State for the table
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData)
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehiclesData)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // States for modals
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false)
  const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  // States for trips and interventions in add vehicle flow
  const [trips, setTrips] = useState<Trip[]>([])
  const [interventions, setInterventions] = useState<Intervention[]>([])

  // Effect for filtering vehicles
  useEffect(() => {
    let filtered = [...vehicles]

    if (brandFilter) {
      filtered = filtered.filter((vehicle) => vehicle.brand.toLowerCase().includes(brandFilter.toLowerCase()))
    }

    if (modelFilter) {
      filtered = filtered.filter((vehicle) => vehicle.model.toLowerCase().includes(modelFilter.toLowerCase()))
    }

    if (plateFilter) {
      filtered = filtered.filter((vehicle) => vehicle.plate.toLowerCase().includes(plateFilter.toLowerCase()))
    }

    if (fuelTypeFilter) {
      filtered = filtered.filter((vehicle) => vehicle.fuelType === fuelTypeFilter)
    }

    if (mileageFilter) {
      filtered = filtered.filter((vehicle) => vehicle.mileage.toString().includes(mileageFilter))
    }

    if (statusFilter) {
      filtered = filtered.filter((vehicle) => vehicle.status === statusFilter)
    }

    setFilteredVehicles(filtered)
    setCurrentPage(1)
  }, [brandFilter, modelFilter, plateFilter, fuelTypeFilter, mileageFilter, statusFilter, vehicles])

  // Pagination calculations
  const indexOfLastVehicle = currentPage * rowsPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - rowsPerPage
  const currentVehicles = filteredVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle)

  // Function to add a new vehicle
  const handleAddVehicle = (newVehicleData: any, newTrips: Trip[], newInterventions: Intervention[]) => {
    const vehicleToAdd = {
      id: vehicles.length + 1,
      brand: newVehicleData.brand,
      model: newVehicleData.model,
      plate: newVehicleData.plate,
      fuelType: newVehicleData.fuelType,
      mileage: Number.parseInt(newVehicleData.mileage),
      lastActivity: { date: new Date().toLocaleDateString(), type: "Alta" },
      status: "Operativo",
    }

    setVehicles([...vehicles, vehicleToAdd])
    setTrips([])
    setInterventions([])
    setIsAddVehicleModalOpen(false)
  }

  // Function to edit a vehicle
  const handleEditVehicle = (updatedVehicle: Vehicle) => {
    const updatedVehicles = vehicles.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle))
    setVehicles(updatedVehicles)
    setIsEditVehicleModalOpen(false)
  }

  // Function to delete a vehicle
  const handleDeleteVehicle = (id: number) => {
    if (window.confirm("¿Está seguro que desea eliminar este vehículo?")) {
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id)
      setVehicles(updatedVehicles)
    }
  }

  // Function to clear filters
  const clearFilters = () => {
    setBrandFilter("")
    setModelFilter("")
    setPlateFilter("")
    setFuelTypeFilter("")
    setMileageFilter("")
    setStatusFilter("")
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      <FilterBar
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        modelFilter={modelFilter}
        setModelFilter={setModelFilter}
        plateFilter={plateFilter}
        setPlateFilter={setPlateFilter}
        fuelTypeFilter={fuelTypeFilter}
        setFuelTypeFilter={setFuelTypeFilter}
        mileageFilter={mileageFilter}
        setMileageFilter={setMileageFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        clearFilters={clearFilters}
        onAddVehicleClick={() => setIsAddVehicleModalOpen(true)}
        onImportClick={() => setIsImportModalOpen(true)}
      />

      <VehicleTable
        vehicles={currentVehicles}
        onEdit={(vehicle) => {
          setSelectedVehicle(vehicle)
          setIsEditVehicleModalOpen(true)
        }}
        onDelete={handleDeleteVehicle}
      />

      <Pagination
        totalItems={filteredVehicles.length}
        itemsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
        indexOfFirstItem={indexOfFirstVehicle}
        indexOfLastItem={Math.min(indexOfLastVehicle, filteredVehicles.length)}
      />

      <AddVehicleModal
        isOpen={isAddVehicleModalOpen}
        onClose={() => setIsAddVehicleModalOpen(false)}
        onSave={handleAddVehicle}
        trips={trips}
        setTrips={setTrips}
        interventions={interventions}
        setInterventions={setInterventions}
      />

      {selectedVehicle && (
        <EditVehicleModal
          isOpen={isEditVehicleModalOpen}
          onClose={() => setIsEditVehicleModalOpen(false)}
          vehicle={selectedVehicle}
          onSave={handleEditVehicle}
        />
      )}

      <ImportVehiclesModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(vehicles) => {
          setVehicles([...vehicles])
          setIsImportModalOpen(false)
        }}
      />
    </div>
  )
}

