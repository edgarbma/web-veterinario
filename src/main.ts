import './style.css';
import { fetchPlanesVeterinarios } from './api/data';
import { renderApp } from './render/mainRender';
import { renderPacientesView } from './render/pacientesRender';
import { FiltrosBusqueda, PlanEspecie, VistaActiva } from './types';

let statePlanes: PlanEspecie[] = [];
let stateFiltros: FiltrosBusqueda = {
  especie: undefined,
  soloObligatorios: false,
  busquedaTexto: ''
};
let vistaActual: VistaActiva = 'documentacion';

async function init() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.innerHTML = `
    <div class="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <nav class="flex flex-col sm:flex-row justify-between items-center bg-slate-900 text-white p-3 sm:p-4 rounded-2xl mb-6 shadow-md gap-3 sm:gap-4">
        <div class="font-extrabold text-base sm:text-lg flex items-center gap-2">
          🩺 <span class="tracking-tight">Sistema Veterinario</span>
        </div>
        <div class="flex w-full sm:w-auto gap-2">
          <button id="btn-nav-doc" class="flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer">
            📚 Documentación
          </button>
          <button id="btn-nav-pacientes" class="flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer">
            🐾 Pacientes
          </button>
        </div>
      </nav>
      <div id="view-content"></div>
    </div>
  `;

  statePlanes = await fetchPlanesVeterinarios();
  const viewContent = document.getElementById('view-content') as HTMLElement;

  const renderVista = () => {
    const btnDoc = document.getElementById('btn-nav-doc');
    const btnPac = document.getElementById('btn-nav-pacientes');

    if (btnDoc && btnPac) {
      btnDoc.className = `flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
        vistaActual === 'documentacion' 
          ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
          : 'border-slate-700 text-slate-300 hover:bg-slate-800'
      }`;
      btnPac.className = `flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
        vistaActual === 'pacientes' 
          ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
          : 'border-slate-700 text-slate-300 hover:bg-slate-800'
      }`;
    }

    if (vistaActual === 'documentacion') {
      const handleFilterChange = (nuevosFiltros: Partial<FiltrosBusqueda>) => {
        stateFiltros = { ...stateFiltros, ...nuevosFiltros };
        renderApp(viewContent, statePlanes, stateFiltros, handleFilterChange);
      };
      renderApp(viewContent, statePlanes, stateFiltros, handleFilterChange);
    } else {
      renderPacientesView(viewContent);
    }
  };

  document.getElementById('btn-nav-doc')?.addEventListener('click', () => {
    vistaActual = 'documentacion';
    renderVista();
  });

  document.getElementById('btn-nav-pacientes')?.addEventListener('click', () => {
    vistaActual = 'pacientes';
    renderVista();
  });

  renderVista();
}

init();