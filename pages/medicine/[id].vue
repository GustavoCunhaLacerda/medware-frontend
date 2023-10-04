<template>
  <main class="container mt-3" v-if="medicine">
    <div class="card">
      <div class="card-header bg-primary">
        <h3 class="text-white text-uppercase font-weight-bold mb-0 fw-boler">
          {{ medicine.nomeComercial }}
        </h3>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex flex flex-column">
          <span class="text-secondary"> Classe Terapêutica </span>
          <span
            v-if="medicine.classeTerapeutica"
            class="text-dark fw-bold px-3"
          >
            {{ medicine.classeTerapeutica }}
          </span>
          <span
            v-else
            v-for="classes in medicine.classesTerapeuticas"
            class="text-dark fw-bold px-3"
          >
            {{ classes }}
          </span>
        </li>
        <li class="list-group-item d-flex flex flex-column">
          <span class="text-secondary"> Princípio Ativo </span>
          <span class="text-dark fw-bold px-3">
            {{ medicine.principioAtivo ?? "Principio ativo não encontrado" }}
          </span>
        </li>
        <li class="list-group-item d-flex flex flex-column">
          <span class="text-secondary"> Medicamento de Referência </span>
          <span class="text-dark fw-bold px-3">
            {{
              medicine.medicamentoReferencia ??
              "Medicamento referência não encontrado"
            }}
          </span>
        </li>
        <li class="list-group-item d-flex flex flex-column">
          <span class="text-secondary"> Categoria Regulatória </span>
          <span class="text-dark fw-bold px-3">
            {{
              medicine.categoriaRegulatoria ??
              "Categoria regulatória não encontrada"
            }}
          </span>
        </li>
        <li class="list-group-item d-flex flex flex-column">
          <span class="text-secondary"> Nome do Fabricante </span>
          <span class="text-dark fw-bold px-3">
            {{
              medicine.empresa?.razaoSocial ??
              "Nome do fabricante não encontrado"
            }}
          </span>
        </li>
      </ul>
    </div>
    <button
      class="btn btn-primary btn-outline p-2 mt-3 fw-bold badge"
      @click="downloadPdf"
    >
      BAIXAR PDF DA BULA
    </button>
  </main>
  <main v-else class="container mt-3">Caregando...</main>
</template>

<script lang="ts">
import { computedAsync } from "@vueuse/core";
import { Medicine } from "~/api/medicine";

export default defineNuxtComponent({
  setup() {
    const api = useApi;
    const route = useRoute();

    const medicine = computedAsync(async () => {
      return await api.getMedicineApi().get(route.params.id as string);
    }, null);

    function downloadPdf() {
      if (medicine.value?.codigoBulaPaciente) {
        api.getMedicineApi().downloadPdf(medicine.value.codigoBulaPaciente);
      }
    }

    return { medicine, downloadPdf };
  },
});
</script>
