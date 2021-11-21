<template>
  <div class="book-item-content">
    <router-link :to="`book/${book.id}`">
      <img class="book-thumb" :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage" :alt="book.volumeInfo.title" />
      <h2 class="book-title">{{ book.volumeInfo.title }}</h2>
    </router-link>
  </div>
</template>

<script>
import noImage from '@/assets/no-image.png';

export default {
	name: 'BookItem',
	props: {
		book: Object,
	},
	data() {
		return {
			noImage,
		};
	},
};
</script>

<style lang="scss" scoped>
  @import "../scss/base";
  .book-thumb{
    width: 100%;
  }
  a{
    text-decoration: none;
  }
  .book-title{
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    margin-top: .5rem;
  }
</style>
