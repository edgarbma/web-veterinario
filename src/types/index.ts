export type Especie = 'perro' | 'gato' | 'ternero';

export type CategoriaPaso = 'profilaxis' | 'cuidados_nacimiento' | 'parásitos' | 'nutrición';

export type VistaActiva = 'documentacion' | 'pacientes';

export interface PasoProfilactico {
  id: number;
  paso: number;
  titulo: string;
  descripcion: string;
  intervalo?: string;
  requisitosPrevios?: string[];
  obligatorio: boolean;
  categoria: CategoriaPaso;
}

export interface PlanEspecie {
  especie: Especie;
  nombreComun: string;
  subtipos?: string[];
  pasos: PasoProfilactico[];
}

export interface FiltrosBusqueda {
  especie?: Especie;
  soloObligatorios?: boolean;
  busquedaTexto?: string;
}

// --- Entidades para la Vista de Pacientes ---
export interface Dueno {
  nombreCompleto: string;
  telefono: string;
  email?: string;
}

export interface ControlVacuna {
  pasoId: number;
  nombreVacuna: string;
  fechaProgramada: string; // Formato YYYY-MM-DD
  aplicada: boolean;
  fechaAplicada?: string;
}

export interface Animal {
  id: string;
  nombre: string;
  especie: Especie;
  raza?: string;
  fechaNacimiento: string; // Formato YYYY-MM-DD
  dueno: Dueno;
  calendarioVacunas: ControlVacuna[];
}