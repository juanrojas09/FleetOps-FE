"use client"

import type React from "react"

import { useState } from "react"

import { Calendar, ArrowLeft, Fuel, Wrench, Route, Package, Bell } from "lucide-react"
import { Vehicle } from "../../../models/Types/VehicleFleetTypes"
import { Dialog, DialogContent } from "../../../common/ui/dialog"
import { Button } from "../../../common/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../common/ui/select"
import { Tabs, TabsContent } from "../../../common/ui/tabs"
import {  FuelReportContentPage } from "./reports/FuelReportContentPage"
import { AlertsReportContentPage } from "./reports/AlertsReportContentPage"
import { CargoReportContentPage } from "./reports/CargoReportContentPage"
import { DistanceReportContentPage } from "./reports/DistanceReportContentPage"
import { MaintenanceReportContentPage } from "./reports/MaintenanceReportContentPage"
import { Card, CardContent } from "../../../common/ui/card"



interface VehicleReportsModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle
}

export function VehicleReportsPage({ isOpen, onClose, vehicle }: VehicleReportsModalProps) {
  const [activeTab, setActiveTab] = useState("menu")
  const [periodType, setPeriodType] = useState("month")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())

  const months = [
    { value: "0", label: "Enero" },
    { value: "1", label: "Febrero" },
    { value: "2", label: "Marzo" },
    { value: "3", label: "Abril" },
    { value: "4", label: "Mayo" },
    { value: "5", label: "Junio" },
    { value: "6", label: "Julio" },
    { value: "7", label: "Agosto" },
    { value: "8", label: "Septiembre" },
    { value: "9", label: "Octubre" },
    { value: "10", label: "Noviembre" },
    { value: "11", label: "Diciembre" },
  ]

  const years = ["2023", "2024", "2025", "2026"]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleBackToMenu = () => {
    setActiveTab("menu")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {activeTab !== "menu" && (
              <Button variant="outline" size="icon" onClick={handleBackToMenu} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold">
                Reportes {activeTab !== "menu" && ">"} {vehicle.brand} {vehicle.model}{" "}
                {activeTab !== "menu" && `> ${vehicle.plate}`}
              </h2>
              {activeTab === "menu" && <p className="text-gray-500">Seleccione un tipo de reporte para el vehículo</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab !== "menu" && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-card border rounded-md">
                  <Button
                    variant={periodType === "month" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPeriodType("month")}
                  >
                    Mes
                  </Button>
                  <Button
                    variant={periodType === "year" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPeriodType("year")}
                  >
                    Año
                  </Button>
                </div>

                {periodType === "month" && (
                  <>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Seleccionar mes" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Año" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}

                {periodType === "year" && (
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 bg-card border rounded-md px-3 py-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Fecha: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsContent value="menu" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ReportCard
                title="Reporte de Carga de combustible"
                icon={<Fuel className="h-6 w-6" />}
                color="bg-amber-100 text-amber-800 hover:bg-amber-200"
                onClick={() => setActiveTab("fuel")}
              />

              <ReportCard
                title="Reporte de Mantenimiento e intervenciones"
                icon={<Wrench className="h-6 w-6" />}
                color="bg-blue-100 text-blue-800 hover:bg-blue-200"
                onClick={() => setActiveTab("maintenance")}
              />

              <ReportCard
                title="Reporte de Distancias"
                icon={<Route className="h-6 w-6" />}
                color="bg-red-100 text-red-800 hover:bg-red-200"
                onClick={() => setActiveTab("distance")}
              />

              <ReportCard
                title="Reporte de Cargas Transportadas"
                icon={<Package className="h-6 w-6" />}
                color="bg-green-100 text-green-800 hover:bg-green-200"
                onClick={() => setActiveTab("cargo")}
              />

              <ReportCard
                title="Novedades Próximas"
                icon={<Bell className="h-6 w-6" />}
                color="bg-slate-800 text-white hover:bg-slate-700"
                onClick={() => setActiveTab("alerts")}
              />
            </div>
          </TabsContent>

          <TabsContent value="fuel" className="mt-0">
            <FuelReportContentPage
              vehicle={vehicle}
              periodType={periodType}
              month={Number.parseInt(selectedMonth)}
              year={Number.parseInt(selectedYear)}
            />
          </TabsContent>

          <TabsContent value="maintenance" className="mt-0">
            <MaintenanceReportContentPage
              vehicle={vehicle}
              periodType={periodType}
              month={Number.parseInt(selectedMonth)}
              year={Number.parseInt(selectedYear)}
            />
          </TabsContent>

          <TabsContent value="distance" className="mt-0">
            <DistanceReportContentPage
              vehicle={vehicle}
              periodType={periodType}
              month={Number.parseInt(selectedMonth)}
              year={Number.parseInt(selectedYear)}
            />
          </TabsContent>

          <TabsContent value="cargo" className="mt-0">
            <CargoReportContentPage
              vehicle={vehicle}
              periodType={periodType}
              month={Number.parseInt(selectedMonth)}
              year={Number.parseInt(selectedYear)}
            />
          </TabsContent>

          <TabsContent value="alerts" className="mt-0">
            <AlertsReportContentPage
              vehicle={vehicle}
              periodType={periodType}
              month={Number.parseInt(selectedMonth)}
              year={Number.parseInt(selectedYear)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

interface ReportCardProps {
  title: string
  icon: React.ReactNode
  color: string
  onClick: () => void
}

function ReportCard({ title, icon, color, onClick }: ReportCardProps) {
  return (
    <Card className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${color}`} onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-48">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardContent>
    </Card>
  )
}

