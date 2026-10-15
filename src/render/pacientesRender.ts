import { Animal, Especie } from '../types';
import {
  generarCalendarioInicial,
  obtenerProximaConsulta,
  formatearFechaES
} from '../utils/calculator';
import {
  obtenerPacientesGuardados,
  guardarPaciente,
  actualizarEstadoVacuna
} from '../utils/storage';

export function renderPacientesView(container: HTMLElement): void {
  let pacientes = obtenerPacientesGuardados();
  let textoBusqueda = '';

  const renderContent = () => {
    const query = textoBusqueda.toLowerCase().trim();
    const pacientesFiltrados = pacientes.filter((animal) => {
      if (!query) return true;
      const coincideMascota = animal.nombre.toLowerCase().includes(query);
      const coincideDueno = animal.dueno.nombreCompleto.toLowerCase().includes(query);
      const coincideTel = animal.dueno.telefono.includes(query);
      return coincideMascota || coincideDueno || coincideTel;
    });

    pacientesFiltrados.sort((a, b) => {
      const proxA = obtenerProximaConsulta(a.calendarioVacunas);
      const proxB = obtenerProximaConsulta(b.calendarioVacunas);

      if (proxA.fecha && !proxB.fecha) return -1;
      if (!proxA.fecha && proxB.fecha) return 1;
      if (proxA.fecha && proxB.fecha) return proxA.fecha.localeCompare(proxB.fecha);
      return 0;
    });

    const expedientesHtml = pacientesFiltrados.length === 0
      ? `<div class="bg-white p-6 sm:p-8 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">No se encontraron pacientes que coincidan con "${textoBusqueda}".</div>`
      : pacientesFiltrados.map((animal) => {
          const proxima = obtenerProximaConsulta(animal.calendarioVacunas);

          const filasVacunas = animal.calendarioVacunas.map((v) => {
            const hoy = new Date().toISOString().split('T')[0];
            const vencida = !v.aplicada && v.fechaProgramada < hoy;

            const estadoBadge = v.aplicada
              ? `<span class="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full inline-block whitespace-nowrap">Aplicada (${formatearFechaES(v.fechaAplicada)})</span>`
              : vencida
              ? `<span class="bg-red-100 text-red-800 border border-red-300 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full inline-block whitespace-nowrap">Atrasada</span>`
              : `<span class="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full inline-block whitespace-nowrap">Programada</span>`;

            const claseFila = v.aplicada ? 'bg-emerald-50/50' : vencida ? 'bg-red-50/50' : 'hover:bg-slate-50';

            return `
              <tr class="${claseFila} border-b border-slate-200 text-xs sm:text-sm transition-colors">
                <td class="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 min-w-[140px]">${v.nombreVacuna}</td>
                <td class="py-2.5 px-3 sm:px-4 font-bold text-slate-700 whitespace-nowrap">${formatearFechaES(v.fechaProgramada)}</td>
                <td class="py-2.5 px-3 sm:px-4">${estadoBadge}</td>
                <td class="py-2.5 px-3 sm:px-4 text-center">
                  <input 
                    type="checkbox" 
                    class="check-vacuna w-4 sm:w-5 h-4 sm:h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer" 
                    data-animal-id="${animal.id}" 
                    data-paso-id="${v.pasoId}" 
                    ${v.aplicada ? 'checked' : ''} 
                  />
                </td>
              </tr>
            `;
          }).join('');

          const bannerProximaCita = proxima.fecha
            ? `
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border-l-4 shadow-sm my-3 sm:my-4 ${
                proxima.esAtrasada 
                  ? 'bg-red-50 border-red-600 text-red-950' 
                  : 'bg-blue-50 border-blue-600 text-blue-950'
              }">
                <div class="flex items-start gap-2.5">
                  <span class="text-xl sm:text-2xl">${proxima.esAtrasada ? '🚨' : '🔔'}</span>
                  <div>
                    <strong class="block text-xs sm:text-sm font-bold">
                      ${proxima.esAtrasada ? '⚠️ Consulta Atrasada / Contactar Propietario' : 'Próxima Consulta Sugerida:'}
                    </strong>
                    <span class="inline-block text-white text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded mt-0.5 shadow-sm ${
                      proxima.esAtrasada ? 'bg-red-600' : 'bg-blue-600'
                    }">
                      ${formatearFechaES(proxima.fecha)}
                    </span>
                    <p class="text-[11px] sm:text-xs text-slate-600 mt-1 font-medium">📌 ${proxima.motivo}</p>
                  </div>
                </div>
                <a href="tel:${animal.dueno.telefono}" class="w-full sm:w-auto text-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
                  📞 Llamar (${animal.dueno.telefono})
                </a>
              </div>
            `
            : `
              <div class="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-l-4 border-emerald-600 bg-emerald-50 text-emerald-950 my-3 sm:my-4 shadow-sm">
                <span class="text-xl sm:text-2xl">✅</span>
                <div>
                  <strong class="block text-xs sm:text-sm font-bold">Esquema Al Día</strong>
                  <p class="text-[11px] sm:text-xs text-slate-600 mt-0.5">${proxima.motivo}</p>
                </div>
              </div>
            `;

          return `
            <article class="bg-white border rounded-2xl p-4 sm:p-6 shadow-sm mb-4 sm:mb-6 ${
              proxima.esAtrasada ? 'border-l-4 sm:border-l-8 border-l-red-600 border-slate-200' : 'border-slate-200'
            }">
              <div class="flex flex-col sm:flex-row justify-between items-start gap-1 border-b border-slate-100 pb-3">
                <div>
                  <h4 class="text-lg sm:text-xl font-extrabold text-slate-800 flex items-center gap-2">
                    ${animal.nombre} 
                    <span class="text-[10px] sm:text-xs bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded font-bold">${animal.especie.toUpperCase()}</span>
                  </h4>
                  <p class="text-xs text-slate-500 mt-1">
                    <strong>Raza:</strong> ${animal.raza || 'No especificada'} | <strong>Nacido:</strong> ${formatearFechaES(animal.fechaNacimiento)}
                  </p>
                  <p class="text-xs text-slate-500 mt-0.5">
                    <strong>Propietario:</strong> ${animal.dueno.nombreCompleto} | <strong>Teléfono:</strong> <a href="tel:${animal.dueno.telefono}" class="text-blue-600 font-semibold hover:underline">${animal.dueno.telefono}</a>
                  </p>
                </div>
              </div>

              ${bannerProximaCita}

              <div class="mt-3 sm:mt-4 rounded-xl border border-slate-200 overflow-hidden">
                <h5 class="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider p-2.5 sm:p-3 bg-slate-100 border-b border-slate-200">📅 Calendario Profiláctico</h5>
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr class="bg-slate-50 text-[11px] sm:text-xs font-bold text-slate-700 border-b border-slate-200">
                        <th class="p-2.5 sm:p-3">Tratamiento / Vacuna</th>
                        <th class="p-2.5 sm:p-3">Fecha Programada</th>
                        <th class="p-2.5 sm:p-3">Estado</th>
                        <th class="p-2.5 sm:p-3 text-center">Aplicada</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${filasVacunas}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          `;
        }).join('');

    container.innerHTML = `
      <section class="space-y-4 sm:space-y-6">
        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-800">🐾 Expedientes Clínicos y Prioridades</h2>

        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
          <label for="search-patient-input" class="text-xs font-bold uppercase tracking-wider text-slate-600">🔍 Buscar por Mascota, Propietario o Teléfono:</label>
          <input 
            type="text" 
            id="search-patient-input" 
            placeholder="Ej: Firulais, Carlos Bermúdez, 7777..." 
            value="${textoBusqueda}" 
            class="w-full p-2.5 sm:p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50"
          />
        </div>

        <form id="form-registro-paciente" class="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-base sm:text-lg font-bold text-slate-800 border-b border-slate-200 pb-2.5">➕ Registrar Nuevo Paciente</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div class="flex flex-col gap-1">
              <label for="pet-name" class="text-xs font-bold text-slate-700">Nombre de la Mascota *</label>
              <input type="text" id="pet-name" required placeholder="Ej: Firulais, Michi..." class="p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="pet-species" class="text-xs font-bold text-slate-700">Especie *</label>
              <select id="pet-species" required class="p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50">
                <option value="perro">Canino (Perro)</option>
                <option value="gato">Felino (Gato)</option>
                <option value="ternero">Bovino (Ternero)</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label for="pet-breed" class="text-xs font-bold text-slate-700">Raza (Opcional)</label>
              <input type="text" id="pet-breed" placeholder="Ej: Pitbull, Siamese..." class="p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="pet-birth" class="text-xs font-bold text-slate-700">Fecha de Nacimiento *</label>
              <input type="date" id="pet-birth" required class="p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="owner-name" class="text-xs font-bold text-slate-700">Propietario *</label>
              <input type="text" id="owner-name" required placeholder="Ej: Carlos Bermúdez" class="p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="owner-phone" class="text-xs font-bold text-slate-700">Teléfono de Contacto *</label>
              <input type="tel" id="owner-phone" required placeholder="Ej: 7777-8888" class="p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50" />
            </div>
          </div>

          <button type="submit" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 px-6 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-sm">
            Guardar Expediente y Calcular Calendario
          </button>
        </form>

        <div class="space-y-3">
          <h3 class="text-lg sm:text-xl font-extrabold text-slate-800">📋 Pacientes Registrados (${pacientesFiltrados.length})</h3>
          <p class="text-xs text-slate-500 italic">🚨 Pacientes con vacunas pendientes aparecen arriba con opción de llamada directa.</p>
          ${expedientesHtml}
        </div>
      </section>
    `;

    const searchInput = document.getElementById('search-patient-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        textoBusqueda = (e.target as HTMLInputElement).value;
        renderContent();
        const newSearchInput = document.getElementById('search-patient-input') as HTMLInputElement;
        if (newSearchInput) {
          newSearchInput.focus();
          newSearchInput.setSelectionRange(textoBusqueda.length, textoBusqueda.length);
        }
      });
    }

    document.getElementById('form-registro-paciente')?.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = (document.getElementById('pet-name') as HTMLInputElement).value;
      const especie = (document.getElementById('pet-species') as HTMLSelectElement).value as Especie;
      const raza = (document.getElementById('pet-breed') as HTMLInputElement).value;
      const fechaNacimiento = (document.getElementById('pet-birth') as HTMLInputElement).value;
      const nombreDueno = (document.getElementById('owner-name') as HTMLInputElement).value;
      const telefonoDueno = (document.getElementById('owner-phone') as HTMLInputElement).value;

      const nuevoAnimal: Animal = {
        id: 'paciente_' + Date.now(),
        nombre,
        especie,
        raza,
        fechaNacimiento,
        dueno: {
          nombreCompleto: nombreDueno,
          telefono: telefonoDueno
        },
        calendarioVacunas: generarCalendarioInicial(especie, fechaNacimiento)
      };

      pacientes = guardarPaciente(nuevoAnimal);
      textoBusqueda = '';
      renderContent();
    });

    document.querySelectorAll('.check-vacuna').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const animalId = target.getAttribute('data-animal-id');
        const pasoId = parseInt(target.getAttribute('data-paso-id') || '0', 10);

        if (animalId && pasoId) {
          pacientes = actualizarEstadoVacuna(animalId, pasoId, target.checked);
          renderContent();
        }
      });
    });
  };

  renderContent();
}