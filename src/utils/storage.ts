import { Animal } from '../types';

const STORAGE_KEY = 'vet_pacientes_db_v1';

export function obtenerPacientesGuardados(): Animal[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Animal[];
  } catch {
    return [];
  }
}

export function guardarPaciente(nuevoAnimal: Animal): Animal[] {
  const listaActual = obtenerPacientesGuardados();
  const actualizada = [nuevoAnimal, ...listaActual];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizada));
  return actualizada;
}

export function actualizarEstadoVacuna(
  animalId: string,
  pasoId: number,
  aplicada: boolean
): Animal[] {
  const lista = obtenerPacientesGuardados();
  const actualizada = lista.map((animal) => {
    if (animal.id === animalId) {
      const nuevoCalendario = animal.calendarioVacunas.map((vacuna) => {
        if (vacuna.pasoId === pasoId) {
          return {
            ...vacuna,
            aplicada,
            fechaAplicada: aplicada ? new Date().toISOString().split('T')[0] : undefined
          };
        }
        return vacuna;
      });
      return { ...animal, calendarioVacunas: nuevoCalendario };
    }
    return animal;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizada));
  return actualizada;
}