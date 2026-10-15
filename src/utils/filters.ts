import { PlanEspecie, FiltrosBusqueda, PasoProfilactico } from '../types';

export function filtrarPlanes(
  planes: PlanEspecie[],
  filtros: FiltrosBusqueda
): { especie: string; pasos: PasoProfilactico[] }[] {
  return planes
    .filter((plan) => !filtros.especie || plan.especie === filtros.especie)
    .map((plan) => {
      const pasosFiltrados = plan.pasos.filter((paso) => {
        if (filtros.soloObligatorios && !paso.obligatorio) {
          return false;
        }

        if (filtros.busquedaTexto) {
          const query = filtros.busquedaTexto.toLowerCase().trim();
          const coincideTitulo = paso.titulo.toLowerCase().includes(query);
          const coincideDesc = paso.descripcion.toLowerCase().includes(query);
          const coincideIntervalo = paso.intervalo?.toLowerCase().includes(query) ?? false;

          return coincideTitulo || coincideDesc || coincideIntervalo;
        }

        return true;
      });

      return {
        especie: plan.nombreComun,
        pasos: pasosFiltrados
      };
    })
    .filter((grupo) => grupo.pasos.length > 0);
}