import { PlanEspecie, FiltrosBusqueda, Especie } from '../types';
import { filtrarPlanes } from '../utils/filters';
import { renderPasoCard } from './components';

export function renderApp(
  container: HTMLElement,
  planes: PlanEspecie[],
  filtros: FiltrosBusqueda,
  onFilterChange: (nuevosFiltros: Partial<FiltrosBusqueda>) => void
): void {
  const planesFiltrados = filtrarPlanes(planes, filtros);

  container.innerHTML = `
    <header class="text-center mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h1 class="text-xl sm:text-3xl font-extrabold text-slate-800 mb-1.5">🐱🐶🐮 Sistema Profiláctico Veterinario</h1>
      <p class="text-xs sm:text-base text-slate-600">Documentación técnica, esquemas sanitarios y control profiláctico</p>
    </header>

    <section class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 sm:mb-8 items-stretch sm:items-end">
      <div class="flex flex-col gap-1 w-full sm:flex-1 sm:min-w-[180px]">
        <label for="species-select" class="text-xs font-bold uppercase tracking-wider text-slate-600">Especie:</label>
        <select id="species-select" class="w-full p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option value="" ${!filtros.especie ? 'selected' : ''}>Todas las especies</option>
          <option value="perro" ${filtros.especie === 'perro' ? 'selected' : ''}>Caninos (Perros)</option>
          <option value="gato" ${filtros.especie === 'gato' ? 'selected' : ''}>Felinos (Gatos)</option>
          <option value="ternero" ${filtros.especie === 'ternero' ? 'selected' : ''}>Bovinos (Terneros)</option>
        </select>
      </div>

      <div class="flex flex-col gap-1 w-full sm:flex-[2] sm:min-w-[220px]">
        <label for="search-input" class="text-xs font-bold uppercase tracking-wider text-slate-600">Buscar protocolo:</label>
        <input 
          type="text" 
          id="search-input" 
          placeholder="Ej: Rabia, Parvovirus, Ombligo..." 
          value="${filtros.busquedaTexto || ''}" 
          class="w-full p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div class="flex items-center gap-2 pt-1 pb-1 sm:pb-2.5">
        <input 
          type="checkbox" 
          id="required-checkbox" 
          ${filtros.soloObligatorios ? 'checked' : ''} 
          class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
        />
        <label for="required-checkbox" class="text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer select-none">
          Solo obligatorios
        </label>
      </div>
    </section>

    <main class="space-y-8">
      ${
        planesFiltrados.length === 0
          ? `<div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm sm:text-base shadow-sm">No se encontraron protocolos que coincidan con los filtros seleccionados.</div>`
          : planesFiltrados
              .map(
                (grupo) => `
            <section class="space-y-3 sm:space-y-4">
              <h2 class="text-lg sm:text-2xl font-bold text-blue-900 border-b-2 border-blue-600 pb-1.5 flex items-center gap-2">
                ${grupo.especie}
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                ${grupo.pasos.map((paso) => renderPasoCard(paso)).join('')}
              </div>
            </section>
          `
              )
              .join('')
      }
    </main>
  `;

  document.getElementById('species-select')?.addEventListener('change', (e) => {
    const val = (e.target as HTMLSelectElement).value;
    onFilterChange({ especie: val ? (val as Especie) : undefined });
  });

  document.getElementById('search-input')?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    onFilterChange({ busquedaTexto: val });
  });

  document.getElementById('required-checkbox')?.addEventListener('change', (e) => {
    const val = (e.target as HTMLInputElement).checked;
    onFilterChange({ soloObligatorios: val });
  });
}