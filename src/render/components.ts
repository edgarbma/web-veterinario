import { PasoProfilactico } from '../types';

export function renderPasoCard(paso: PasoProfilactico): string {
  const badgeObligatorio = paso.obligatorio
    ? `<span class="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded border border-red-200">Obligatorio</span>`
    : `<span class="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded border border-slate-200">Opcional / Refuerzo</span>`;

  const requisitos = paso.requisitosPrevios && paso.requisitosPrevios.length > 0
    ? `
      <div class="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 text-xs text-amber-900 rounded-r shadow-sm">
        <strong class="block font-bold mb-1">⚠️ Requisitos Previos Indispensables:</strong>
        <ul class="list-disc list-inside space-y-0.5">
          ${paso.requisitosPrevios.map((req) => `<li>${req}</li>`).join('')}
        </ul>
      </div>
    `
    : '';

  return `
    <article class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start gap-2 mb-3">
          <span class="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md">Paso ${paso.paso}</span>${badgeObligatorio}
        </div>
        <h3 class="font-bold text-slate-800 text-base mb-2 leading-snug">${paso.titulo}</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${paso.descripcion}</p>
      </div>
      <div class="mt-4">
        ${paso.intervalo ? `<p class="text-xs bg-slate-100 text-slate-700 p-2.5 rounded-lg font-medium border border-slate-200">⏱️ <strong>Aplicación:</strong> ${paso.intervalo}</p>` : ''}
        ${requisitos}
      </div>
    </article>
  `;
}