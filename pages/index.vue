<template>
  <main class="my-8">
    <search @doSearch="setSearchTerm" />
    <div v-if="errorMessage === ''" class="container mx-auto px-6">
      <h3 class="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
      <span
        data-testid="total-quantity-label"
        class="mt-3 text-sm text-gray-500"
        >{{ quantityLabel }}</span
      >
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
      >
        <product-card
          v-for="product in list"
          :key="product.id"
          :product="product"
          data-testid="product-card"
        ></product-card>
      </div>
    </div>
    <h3 v-else class="text-center text-2xl text-red-700">{{ errorMessage }}</h3>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';

export default {
  components: { ProductCard, Search },
  data() {
    return {
      products: [],
      errorMessage: '',
      searchTerm: '',
    };
  },
  computed: {
    list() {
      if (this.searchTerm !== '') {
        return this.products.filter((product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return this.products;
    },
    quantityLabel() {
      const length = this.list ? this.list.length : 0;
      return length === 1 ? `${length} Product` : `${length} Products`;
    },
  },
  async created() {
    try {
      const productsResponse = (await this.$axios.get('/api/products')).data
        .products;
      this.products = productsResponse || [];
    } catch (error) {
      this.errorMessage = 'Problems when loading list!';
    }
  },
  methods: {
    setSearchTerm({ term }) {
      this.searchTerm = term;
    },
  },
};
</script>
