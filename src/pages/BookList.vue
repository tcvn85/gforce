<template>
  <div class="page-book-list">
    <Loading v-if="loading" />
    <template v-else>
      <BookToolbar
        :startIndex="filter.searchText.length === 0 ? startIndex : books.length"
        :totalItems="totalItems"
        v-on:updateFilter="onUpdateFilter"
      />
      <div class="book-list-content" v-if="books.length > 0">
        <ul class="book-list">
          <li class="book-item" v-for="(book, index) in books" :key="index">
            <BookItem :book="book" />
          </li>
        </ul>
        <Loading v-if="moreLoading" />
        <a
          v-if="startIndex<totalItems"
          v-on:click.stop.prevent="loadMore"
          class="load-more"
          href="#"
        >
          Load more
        </a>
      </div>
      <div class="message" v-else>
        No book found.
      </div>
    </template>
  </div>
</template>

<script>
import { get, orderBy } from 'lodash';
import Api from '@/api';
import Loading from '@/components/Loading.vue';
import BookToolbar from '@/components/BookToolbar.vue';
import BookItem from '@/components/BookItem.vue';

export default {
	name: 'BookList',
	components: {
		Loading,
		BookToolbar,
		BookItem,
	},

	data() {
		return {
			data: [],
			totalItems: 0,
			q: 'steven+king',
			startIndex: 0,
			maxResults: 40,
			filter: {
				searchText: '',
				searchType: 'all',
				sortBy: 'volumeInfo.publishedDate',
				sortOrder: 'desc',
			},
			loading: true,
			moreLoading: false,
			error: false,
		};
	},

	computed: {
		books() {
			const {
				data, filter: {
					searchType, searchText, sortBy, sortOrder,
				},
			} = this;
			let bookList = [];

			if (searchType === 'all') {
				bookList = data.filter(book => JSON.stringify(book.volumeInfo).includes(searchText));
			} else {
				bookList = data.filter((book) => {
					const bookField = get(book, searchType);
					return bookField && bookField.toLowerCase().includes(searchText.toLowerCase());
				});
			}

			return orderBy(bookList, sortBy, sortOrder);
		},
	},

	created() {
		this.fetchData(this.q, this.startIndex, this.maxResults);
	},

	methods: {
		fetchData(q, startIndex, maxResults) {
			this.moreLoading = true;
			Api.getBooks(q, startIndex, maxResults).then((res) => {
				this.data.push(...res.data.items);
				this.totalItems = res.data.totalItems;

				if (this.totalItems > startIndex) {
					this.startIndex += maxResults;
				}
			})
				.catch((err) => {
					this.error = true;
					console.log(err);
				})
				.finally(() => {
					this.loading = false;
					this.moreLoading = false;
				});
		},
		loadMore() {
			this.fetchData(this.q, this.startIndex, this.maxResults);
		},

		onUpdateFilter(filter) {
			this.filter = {
				...this.filter,
				...filter,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
  @import "../scss/base";
  .book-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -$gutter;
    margin-right: -$gutter;
  }
  .book-item{
    margin-bottom: $gutter;
    width: 100%;
    padding-left: $gutter;
    padding-right: $gutter;
    @include media-query(mobile) {
      width: 50%;
    }
    @include media-query(tablet) {
      width: 25%;
    }
    @include media-query(desktop) {
      width: 20%;
    }
  }
  .load-more{
    margin-top: 1rem;
    display: block;
    margin-bottom: 2rem;
    color: #fff;
    text-align: center;
    padding: .75rem 1rem;
    font-weight: bold;
    background: $base-color;
    &:hover{
      background: lighten($base-color, 10%);
    }
  }

</style>
