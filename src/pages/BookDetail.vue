<template>
  <div class="page-book-detail">
    <Loading v-if="loading" />
    <template v-else>
      
      <div class="message error" v-if="error">{{ errorMsg }}</div>

      <div class="book-detail" v-else>
        <div class="book-img">
          <img :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage" :alt="book.volumeInfo.title" />
        </div>
        <div class="book-info">
          <h1 class="book-title book-props">{{ book.volumeInfo.title }}</h1>
          <div class="book-author book-props">
            <label>Author<span v-show="book.volumeInfo.authors.length>1">s</span>:</label>
            <span v-for="(author, index) in book.volumeInfo.authors" :key="author + 'index'">
              <small v-if="index !== 0">-</small> {{ author }}
            </span>
          </div>
          <div class="book-published-date book-props">
            <label>Published Date: </label>
            {{ book.volumeInfo.publishedDate }}
          </div>
          <div class="book-publisher book-props">
            <label>Publisher: </label>
            {{ book.volumeInfo.publisher }}
          </div>
          <div class="book-total-page book-props">
            <label>Page count: </label>
            {{ book.volumeInfo.pageCount }}
          </div>
          <div class="book-desc book-props" v-html="book.volumeInfo.description"></div>
          <a class="book-btn" target="_blank" :href="book.volumeInfo.previewLink">Preview this book</a>
        </div>
      </div>
    </template>
  </div>
</template>


<script>
import Api from "@/api";
import Loading from '@/components/Loading.vue';
import noImage from "@/assets/no-image.png";

export default {
  name: 'BookDetail',

  components: {
    Loading,
  },

  data() {
    return {
      book: null,
      loading: true,
      error: false,
      errorMsg: "",
      noImage: noImage
    }
  },

  created() {
    this.fetchData();
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData () {
      const { id } = this.$route.params;
      Api.getBookById(id)
        .then(res => {
          this.book = res.data;
        })
        .catch((error) => {
          this.error = true;
          this.errorMsg = "No Book found.";
          console.log(error);
        }).finally( () => {
          this.loading = false; 
        });
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "../scss/base";

  .book-detail{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -$gutter;
    margin-right: -$gutter;
  }
  .book-img{
    width: 100%;
    padding-left: $gutter;
    padding-right: $gutter;
    margin-bottom: 2rem;
    @include media-query(mobile) {
      width: 40%;
    }
    img{
      width: 100%;
    }
  }
  .book-info{
    width: 100%;
    padding-left: $gutter;
    padding-right: $gutter;
    @include media-query(mobile) {
      width: 60%;
    }
  }
  .book-props{
    margin-bottom: 0.5rem;
    label{
      font-weight: bold;
    }
  }
  .book-title{
    font-size: 1.5rem;
    margin: 0 0 1rem;
  }

  .book-btn{
    background: $base-color;
    text-decoration: none;
    padding: .75rem 1rem;
    display: block;
    color: #fff;
    font-weight: bold;
    text-align: center;
    margin-top: 1.5rem;
    &:hover{
      background: lighten($base-color, 10%);
    }
  }

</style>