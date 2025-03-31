
import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, Car, DollarSign, TruckIcon, AlertCircle, Users, Home, Settings, Sun, Moon } from 'lucide-react';
import { cn } from "../../lib/utils";

import { ScrollArea } from "../ui/scroll-area";

import { useTheme } from "../../providers/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";


export function Sidebar({ className, children }: { className?: string; children?: React.ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;
  
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex min-h-screen">
      <div className={cn(
        "flex flex-col w-64 bg-card text-card-foreground border-r border-border",
        className
      )}>
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>FleetOps</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            <div className="py-2">
              <h3 className="px-4 text-xs font-medium text-muted-foreground">
                Dashboard
              </h3>
              <div className="grid gap-1 py-1">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === "/" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </div>
            </div>
            
            <SidebarGroup title="Vehículos" icon={<Car className="h-4 w-4" />}>
              <SidebarItem to="/vehiculos/indicadores" title="Indicadores Generales" active={pathname === "/vehiculos/indicadores"} />
              <SidebarItem to="/vehiculos/costos-operativos" title="Costos Operativos" active={pathname === "/vehiculos/costos-operativos"} />
              <SidebarItem to="/vehiculos/costos-carga" title="Costos de carga" active={pathname === "/vehiculos/costos-carga"} />
              <SidebarItem to="/vehiculos/costos-distancias" title="Costo de distancias" active={pathname === "/vehiculos/costos-distancias"} />
              <SidebarItem to="/vehiculos/alertas" title="Alertas y novedades" active={pathname === "/vehiculos/alertas"} />
            </SidebarGroup>
            
            <SidebarGroup title="Gestión de activos" icon={<TruckIcon className="h-4 w-4" />}>
              <SidebarItem to="/activos/itv" title="Flota de Vehiculos" active={pathname === "/activos/itv"} />
        
            </SidebarGroup>
            
            <SidebarGroup title="Alertas y Novedades" icon={<AlertCircle className="h-4 w-4" />}>
              <SidebarItem to="/alertas/configuracion" title="Configuración" active={pathname === "/alertas/configuracion"} />
              <SidebarItem to="/alertas/gestion" title="Gestion de Novedades y Alertas " active={pathname === "/alertas/gestion"} />
            </SidebarGroup>
            
            <SidebarGroup title="Costos Generales" icon={<DollarSign className="h-4 w-4" />}>
              <SidebarItem to="/costos/general" title="Análisis de Costos Generales" active={pathname === "/costos/general"} />
              <SidebarItem to="/costos/graficos" title="Reportes de Costos Generales" active={pathname === "/costos/graficos"} />
            </SidebarGroup>
            
            <SidebarGroup title="Gestión de Personal" icon={<Users className="h-4 w-4" />}>
              <SidebarItem to="/personal/choferes" title="Choferes" active={pathname === "/personal/choferes"} />

            </SidebarGroup>
            
            <div className="py-2">
              <h3 className="px-4 text-xs font-medium text-muted-foreground">
                Configuración
              </h3>
              <div className="grid gap-1 py-1">
                <Link
                  to="/settings"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === "/settings" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
              </div>
            </div>
               <div className="py-2">
              <h3 className="px-4 text-xs font-medium text-muted-foreground">
                Roles
              </h3>
              <div className="grid gap-1 py-1">
                <Link
                  to="/roles"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === "/settings" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Roles y pPermisos
                </Link>
                
              </div>
            </div>
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
               
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Mateo</p>
                {/* <p className="text-xs text-muted-foreground">Designer</p> */}
              </div>
            </div>
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

function SidebarGroup({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <div className="py-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="grid gap-1 py-1 pl-10">{children}</div>}
    </div>
  );
}

function SidebarItem({ to, title, active }: { to: string; title: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground"
      )}
    >
      {title}
    </Link>
  );
}