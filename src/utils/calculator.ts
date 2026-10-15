import { Especie, ControlVacuna } from '../types';
import { planesVeterinarios } from '../api/data';

function agregarDias(fechaBase: Date, dias: number): Date {
  const f = new Date(fechaBase);
  f.setDate(f.getDate() + dias);
  return f;
}

// Convierte 'YYYY-MM-DD' a 'DD/MM/YYYY'
export function formatearFechaES(fechaStr?: string): string {
  if (!fechaStr) return '';
  const partes = fechaStr.split('-');
  if (partes.length !== 3) return fechaStr;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export function generarCalendarioInicial(
  especie: Especie,
  fechaNacimientoStr: string
): ControlVacuna[] {
  const plan = planesVeterinarios.find((p) => p.especie === especie);
  if (!plan) return [];

  const partes = fechaNacimientoStr.split('-');
  let fechaReferencia = new Date(
    parseInt(partes[0]),
    parseInt(partes[1]) - 1,
    parseInt(partes[2])
  );

  return plan.pasos.map((paso, index) => {
    let diasAjuste = 15;

    if (especie === 'perro') {
      diasAjuste = index === 0 ? 25 : 15;
    } else if (especie === 'gato') {
      diasAjuste = index === 0 ? 60 : 15;
    } else if (especie === 'ternero') {
      if (index === 0) diasAjuste = 0;
      else if (index === 1) diasAjuste = 90;
      else diasAjuste = 30;
    }

    fechaReferencia = agregarDias(fechaReferencia, diasAjuste);

    return {
      pasoId: paso.id,
      nombreVacuna: paso.titulo,
      fechaProgramada: fechaReferencia.toISOString().split('T')[0],
      aplicada: false
    };
  });
}

export function obtenerProximaConsulta(calendario: ControlVacuna[]): {
  fecha: string | null;
  motivo: string;
  esAtrasada: boolean;
} {
  const hoy = new Date().toISOString().split('T')[0];
  const pendiente = calendario.find((v) => !v.aplicada);

  if (!pendiente) {
    return {
      fecha: null,
      motivo: 'Plan profiláctico completado (Solo controles anuales)',
      esAtrasada: false
    };
  }

  const esAtrasada = pendiente.fechaProgramada < hoy;

  return {
    fecha: pendiente.fechaProgramada,
    motivo: pendiente.nombreVacuna,
    esAtrasada
  };
}