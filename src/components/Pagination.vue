<template>
  <div class="pagination" v-if="rowCount > pageSize">
    <div class="pagination-text">Showing {{ (pageSize * (currentPage - 1)) + 1 }}  to {{ Math.min(pageSize * currentPage, rowCount) }} of {{ rowCount }} entries</div>
    <div class="pagination-btns">
      <button @click.prevent="prevPage" :class="{ 'disabled-btn': currentPage === 1 }" class="previous">Previous</button>
      <button v-for="(number, index) in pageNumbers" :key="index" @click.prevent="number !== '...' && setPage(number)" :class="{ active: number === currentPage, ellipsis: number === '...' }" class="num-btn">{{ number !== '...' ? number : '...' }}</button>
      <button @click.prevent="nextPage" :class="{ 'disabled-btn': currentPage === pageCount }" class="next">Next</button>
    </div> 
  </div>
</template>

<script>
import { paginationPageNumbers } from "@/utils";

export default {
  props: { 
    pageCount: {
      type: Number,
      required: true
    }, 
    rowCount: {
      type: Number,
      required: true
    }, 
    pageSize: {
      type: Number,
      required: true
    }, 
  },  
  data() {
    return {  
      currentPage: 1,
    };
  },
  computed: {
    pageNumbers() {
      return paginationPageNumbers({ value: this.pageCount }, { value: this.currentPage });
    }
  },
  methods: { 
    async prevPage() {
      if(this.currentPage > 1)
      {
        this.currentPage--;
        this.$emit('page-changed', this.currentPage );
      }
    }, 
    async nextPage() {
      if(this.currentPage < this.pageCount)
      {
        this.currentPage++; 
        this.$emit('page-changed', this.currentPage );
      }
    },
    async setPage(index) {
      this.currentPage = index;
      if(this.currentPage < 1) this.currentPage = 1;
      if(this.currentPage > this.pageCount) this.currentPage = this.pageCount;
        this.$emit('page-changed', this.currentPage );
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
