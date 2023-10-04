<template>
  <main class="container mt-3">
    <div class="input-group">
      <input
        type="search"
        class="form-control rounded-rigth"
        placeholder="Insira o nome do remédio aqui"
        aria-describedby="search-addon"
        v-model="medicineName"
        v-on:keyup.enter="getMedicineList"
      />
      <button
        @click="getMedicineList"
        type="button"
        class="btn btn-outline-primary"
      >
        Pesquisar
      </button>
    </div>

    <div class="mt-3">
      <div class="list-group">
        <a class="list-group-item list-group-item-primary">Remédios</a>
        <NuxtLink
          v-for="(medicine, i) in medicineList"
          :key="i"
          :to="'/medicine/' + medicine.numProcesso"
          class="list-group-item list-group-item-action user-select-none"
          style="cursor: pointer"
        >
          <div class="d-flex flex-column justify-content-center">
            <h6>
              {{ medicine.nomeProduto }}
            </h6>
            <p class="mb-0">
              {{ medicine.razaoSocial }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-3">
        <nav aria-label="navigation" max-size="10">
          <ul class="pagination">
            <li class="page-item">
              <a
                :class="['page-link', currentPage <= 1 && 'disabled']"
                href="#"
                @click="previousPage"
              >
                Anterior
              </a>
            </li>
            <li
              v-for="pageIndex in paginationPages"
              :class="['page-item', pageIndex === currentPage && 'active']"
              @click="currentPage = pageIndex"
            >
              <a class="page-link" style="cursor: pointer">
                {{ pageIndex }}
              </a>
            </li>
            <li class="page-item">
              <a
                :class="['page-link', currentPage >= totalPages && 'disabled']"
                href="#"
                @click="nextPage"
              >
                Próxima
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computedAsync } from "@vueuse/core";

export default defineNuxtComponent({
  setup() {
    const api = useApi;

    const medicines = ref<any>(null);

    const medicineName = ref<string | null>(null);
    const currentPage = ref<number>(1);

    const pageOffsets = computed(() => {
      let prev = 0;
      let prox = 0;

      if (currentPage.value <= 2) {
        prev = currentPage.value - 1;
        prox = 4 - prev;

        return {
          prox,
          prev,
        };
      }

      if (currentPage.value >= totalPages.value - 2) {
        prox = totalPages.value - currentPage.value;
        prev = 4 - prox;

        return {
          prox,
          prev,
        };
      }

      prox = 2;
      prev = 2;

      return {
        prox,
        prev,
      };
    });

    const paginationPages = computed(() => {
      var pages = [];

      if (totalPages.value <= 5) {
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i);
        }

        return pages;
      }

      for (
        let i = currentPage.value - pageOffsets.value.prev;
        i <= currentPage.value + pageOffsets.value.prox;
        i++
      ) {
        pages.push(i);
      }

      console.log(
        currentPage.value,
        pageOffsets.value.prev,
        pageOffsets.value.prox,
        pages
      );
      return pages;
    });

    const medicineList = computed(() => {
      return medicines.value?.content ?? [];
    });

    const totalPages = computed(() => {
      return medicines.value?.totalPages ?? 0;
    });

    async function getMedicineList() {
      const res = await api
        .getMedicineApi()
        .list(medicineName.value ?? "", currentPage.value);

      console.log(res);

      medicines.value = res;
      currentPage.value = 1;
    }

    watch(currentPage, async () => {
      const res = await api
        .getMedicineApi()
        .list(medicineName.value ?? "", currentPage.value);

      console.log(res);

      medicines.value = res;
    });

    function nextPage() {
      currentPage.value++;
    }

    function previousPage() {
      currentPage.value--;
    }

    return {
      medicineList,
      totalPages,
      currentPage,
      medicineName,
      getMedicineList,
      nextPage,
      previousPage,
      paginationPages,
    };
  },
});
</script>

<style></style>
