import { PlanEspecie } from '../types';

export const planesVeterinarios: PlanEspecie[] = [
  {
    especie: 'perro',
    nombreComun: 'Caninos (Perros)',
    subtipos: ['Cachorro (desde nacimiento)', 'Adulto (sin control previo)'],
    pasos: [
      {
        id: 101,
        paso: 1,
        titulo: 'Primera Desparasitación',
        descripcion: 'Aplicar la primera dosis de desparasitante.',
        intervalo: 'Entre los 20 y 30 días de nacido',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 102,
        paso: 2,
        titulo: 'Segunda Desparasitación + Vacuna PUPPY DP / Parvovirus Monovalente',
        descripcion: 'Aplicar 2ª desparasitación y 1ª vacuna PUPPY DP o Parvovirus Monovalente.',
        intervalo: '15 días después de la 1ª desparasitación',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 103,
        paso: 3,
        titulo: 'Tercera Desparasitación + Vacuna Quíntuple',
        descripcion: 'Aplicar 2ª vacuna QUÍNTUPLE y 3ª desparasitación.',
        intervalo: '15 días después de la 1ª vacuna',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 104,
        paso: 4,
        titulo: 'Cuarta Desparasitación + Vacuna Séxtuple',
        descripcion: 'Aplicar vacuna SÉXTUPLE y 4ª desparasitación.',
        intervalo: '15 días después de la vacuna Quíntuple',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 105,
        paso: 5,
        titulo: 'Quinta Desparasitación + 2ª Dosis Vacuna Séxtuple',
        descripcion: 'Aplicar 2ª dosis de vacuna SÉXTUPLE y 5ª desparasitación.',
        intervalo: '15 días después de la 1ª Séxtuple',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 106,
        paso: 6,
        titulo: 'Sexta Desparasitación + Vacuna Rabia',
        descripcion: 'Aplicar vacuna RABIA y 6ª desparasitación.',
        intervalo: '15 días después de la 2ª Séxtuple',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 107,
        paso: 7,
        titulo: 'Vacunas Bordetella Bronchiseptica y Giardia',
        descripcion: 'Opcionales / Facultativas según criterio médico.',
        intervalo: '15 días después de la vacuna de Rabia',
        obligatorio: false,
        categoria: 'profilaxis'
      },
      {
        id: 108,
        paso: 8,
        titulo: 'Refuerzo Bordetella y Giardia (Culminación plan cachorro)',
        descripcion: 'Refuerzo final. Mantenimiento posterior con dosis anuales de SÉXTUPLE y RABIA (y opcionales Giardia/Bordetella).',
        intervalo: '15 días después del paso 7',
        obligatorio: false,
        categoria: 'profilaxis'
      },
      {
        id: 109,
        paso: 9,
        titulo: 'Plan Adulto Sin Control Previo',
        descripcion: '1 dosis anual de vacuna SÉXTUPLE, 1 dosis anual de RABIA. Desparasitación con benzoimidazoles cada 3 a 6 meses según su ambiente.',
        intervalo: 'Anual / Cada 3-6 meses',
        obligatorio: true,
        categoria: 'profilaxis'
      }
    ]
  },
  {
    especie: 'gato',
    nombreComun: 'Felinos (Gatos)',
    pasos: [
      {
        id: 201,
        paso: 1,
        titulo: 'Primera Desparasitación y Exámenes Previos',
        descripcion: 'Realizar hemograma previo y test rápido para verificar que sea negativo a Panleucopenia.',
        intervalo: 'A los 2 meses de edad (Mínimo indispensable)',
        requisitosPrevios: ['Gato completamente sano', 'Hemograma previo', 'Test rápido Panleucopenia negativo'],
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 202,
        paso: 2,
        titulo: 'Triple Felina + 2ª Desparasitación',
        descripcion: 'Aplicar Triple Felina y 2ª desparasitación. Antes de la Quíntuple posterior, realizar test rápido de Leucemia Felina.',
        intervalo: '15 días después de la 1ª desparasitación',
        requisitosPrevios: ['Test rápido de Leucemia Felina negativo antes de Quíntuple'],
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 203,
        paso: 3,
        titulo: 'Tercera Desparasitación + Vacuna Quíntuple',
        descripcion: 'Aplicación de vacuna Quíntuple y 3ª desparasitación.',
        intervalo: '15 días después de la Triple Felina',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 204,
        paso: 4,
        titulo: 'Vacuna contra la Rabia',
        descripcion: 'Aplicar vacuna de Rabia tras el refuerzo de Quíntuple.',
        intervalo: '15 días después de la Quíntuple',
        obligatorio: true,
        categoria: 'profilaxis'
      }
    ]
  },
  {
    especie: 'ternero',
    nombreComun: 'Bovinos / Terneros',
    pasos: [
      {
        id: 301,
        paso: 1,
        titulo: 'Atención al Nacimiento',
        descripcion: 'Limpiar fosas nasales, verificar respiración/marcha, calostro en máximo 2 horas, curar ombligo con Yodo al 5% (no ciperclor/sprays) y administrar booster RN si requiere.',
        intervalo: 'Al nacer (0 a 2 horas)',
        obligatorio: true,
        categoria: 'cuidados_nacimiento'
      },
      {
        id: 302,
        paso: 2,
        titulo: 'Vacunas Clostridiales y Ántrax',
        descripcion: '1ª dosis a los 3 meses, 2ª dosis al destete (5-6 meses), 3ª dosis al año. Repetir anualmente.',
        intervalo: 'A partir de los 3 meses',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 303,
        paso: 3,
        titulo: 'Vacunas IBR, DVB-MD y Queratoconjuntivitis (Opcionales: Leptospirosis / Brucelosis RB51)',
        descripcion: '1ª dosis a los 4 meses, 2ª dosis 30 días después, 3ª dosis al año. Repetir anualmente. (Ejemplo: Cattlemaster Gold FP 5 L5).',
        intervalo: 'A los 4 meses de edad',
        obligatorio: true,
        categoria: 'profilaxis'
      },
      {
        id: 304,
        paso: 4,
        titulo: 'Control de Parásitos Internos y Ectoparásitos',
        descripcion: '3 meses: benzoimidazoles (albendazol/fenbendazol) si pastorea. 4-6 meses: evaluar refuerzo. Ectoparásitos: Doramectina, Ivermectina o baños con Amitraz/Cipermetrina/Fipronil.',
        intervalo: '3 meses a 1 año',
        obligatorio: true,
        categoria: 'parásitos'
      },
      {
        id: 305,
        paso: 5,
        titulo: 'Vitaminas, Minerales y Suplementación',
        descripcion: 'AD3E si la condición corporal es baja. Sales y bloques minerales diarios. Vacas gestantes: mineralización en las últimas 6-8 semanas.',
        intervalo: '3 meses en adelante / Periodo seco / Gestación',
        obligatorio: false,
        categoria: 'nutrición'
      }
    ]
  }
];

export async function fetchPlanesVeterinarios(): Promise<PlanEspecie[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(planesVeterinarios), 150);
  });
}