// Datos simulados para la tabla de vehículos
export const vehiclesData = [
    {
      id: 1,
      brand: "Renault",
      model: "Master",
      plate: "MFJ 072",
      fuelType: "NAFTA",
      mileage: 192400,
      lastActivity: { date: "01/03/2025", type: "Service" },
      status: "Operativo",
    },
    {
      id: 2,
      brand: "Mercedes",
      model: "Camión",
      plate: "AF954RK",
      fuelType: "DIESEL",
      mileage: 245780,
      lastActivity: { date: "15/02/2025", type: "Carga" },
      status: "Operativo",
    },
    {
      id: 3,
      brand: "Citroen",
      model: "Berlingo",
      plate: "AC875CG",
      fuelType: "NAFTA",
      mileage: 87650,
      lastActivity: { date: "28/02/2025", type: "Viaje" },
      status: "Operativo",
    },
    {
      id: 4,
      brand: "Toyota",
      model: "Hilux",
      plate: "AD814AF",
      fuelType: "DIESEL",
      mileage: 156300,
      lastActivity: { date: "10/03/2025", type: "Intervención" },
      status: "En mantenimiento",
    },
    {
      id: 5,
      brand: "Renault",
      model: "Kangoo",
      plate: "EJP249",
      fuelType: "NAFTA",
      mileage: 65400,
      lastActivity: { date: "05/03/2025", type: "Carga" },
      status: "Operativo",
    },
    {
      id: 6,
      brand: "Chevrolet",
      model: "S10",
      plate: "BCF445",
      fuelType: "DIESEL",
      mileage: 198700,
      lastActivity: { date: "20/02/2025", type: "Viaje" },
      status: "Fuera de servicio",
    },
    {
      id: 7,
      brand: "Ford",
      model: "Ranger",
      plate: "AD445FI",
      fuelType: "DIESEL",
      mileage: 112300,
      lastActivity: { date: "12/03/2025", type: "Carga" },
      status: "Operativo",
    },
    {
      id: 8,
      brand: "Iveco",
      model: "Daily",
      plate: "AF335FI",
      fuelType: "DIESEL",
      mileage: 78900,
      lastActivity: { date: "25/02/2025", type: "Service" },
      status: "Operativo",
    },
  ]
  
  // Opciones para los selectores
  export const fuelTypeOptions = ["NAFTA", "DIESEL", "GNC", "ELÉCTRICO", "HÍBRIDO"]
  export const statusOptions = ["Operativo", "En mantenimiento", "Fuera de servicio", "En reparación"]
  export const brandOptions = ["Mercedes", "Renault", "Citroen", "Toyota", "Chevrolet", "Ford", "Iveco"]
  export const serviceOptions = ["BCA", "EV", "TEMAL", "EV PRIVADOS"]
  
  