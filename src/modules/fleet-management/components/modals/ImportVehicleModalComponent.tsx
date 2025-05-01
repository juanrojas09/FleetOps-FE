"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../../common/ui/dialog"
import { Button } from "../../../../common/ui/button"


interface ImportVehiclesModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (vehicles: any[]) => void
}

export function ImportVehiclesModal({ isOpen, onClose, onImport }: ImportVehiclesModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = () => {
    if (!file) return

    setIsUploading(true)

    // Simulate file processing
    setTimeout(() => {
      // In a real app, you would parse the Excel file here
      // For now, we'll just simulate success
      setIsUploading(false)
      onImport([])
    }, 1000)
  }

  const handleDownloadTemplate = () => {
    // In a real app, this would download a template Excel file
    alert("Descargando plantilla...")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importar Vehículos</DialogTitle>
          <DialogDescription>Importe múltiples vehículos desde un archivo Excel.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Haga clic para cargar</span> o arrastre y suelte
                </p>
                <p className="text-xs text-gray-500">Excel (.xlsx, .xls)</p>
                {file && <p className="mt-2 text-sm font-medium text-green-600">Archivo seleccionado: {file.name}</p>}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Instrucciones</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Descargue la plantilla de Excel haciendo clic en el botón "Descargar Plantilla".</li>
              <li>Complete la información de los vehículos en la plantilla.</li>
              <li>Guarde el archivo y cárguelo utilizando el área de arriba.</li>
              <li>Verifique la vista previa antes de confirmar la importación.</li>
            </ol>

            <Button className="mt-4 gap-2" onClick={handleDownloadTemplate}>
              <Download className="h-4 w-4" />
              Descargar Plantilla
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleImport} disabled={!file || isUploading}>
            {isUploading ? "Importando..." : "Importar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

