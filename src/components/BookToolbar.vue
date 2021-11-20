<template>
	<div class="book-toolbar">
		<div class="search-box">
			<form action="#">
				<select class="search-type" v-model="filter.searchType" @change="updateSearchType">
					<option value="all">All</option>
					<option value="volumeInfo.title">Name</option>
					<option value="volumeInfo.publisher">Publisher</option>
				</select>
			  <input class="search-text" type="text" placeholder="keyword" v-model="filter.searchText" @keyup="updateTextSearch">
		    <button class="btn" type="button">SEARCH</button>
		 		<span class="result-search">{{startIndex > totalItems ? totalItems : startIndex}} of {{totalItems}} result<span v-if="totalItems>1">s</span></span>
			</form>
		</div>
		<div class="sort-by">
			<label>Sort by: </label>
			<select name="" class="sort-type" v-model="filter.sortBy" @change="updateSortBy">
				<option value="volumeInfo.publishedDate" selected>Date</option>
				<option value="volumeInfo.title">Name</option>
				<option value="volumeInfo.pageCount">Page count</option>
			</select>
			<a href="#" class="sort-icon" ref="sortOrder" @click.prevent="updateSortOrder"> ↑ </a>
		</div>
	</div>
</template>

<script>
import { debounce } from "lodash";
export default {
  name: 'BookToolbar',
  props: {
  	startIndex: Number,
  	totalItems: Number,
  },

  data() {
  	return {
  		filter: {
  			searchType: 'all',
  			searchText: '',
	  		sortBy: 'volumeInfo.publishedDate',
	  		sortOrder: 'desc'
	  	}
  	}
  },
  
  methods: {
  	updateSearchType: function(event) {
			this.$emit('updateFilter', this.filter);
  	},

  	updateTextSearch: debounce(function(event) {
  		this.filter = {
  			...this.filter,
  			searchText: event.target.value.trim(),
  		}
  		this.$emit('updateFilter', this.filter);
  	}, 500),

  	updateSortBy: function(event) {
  		this.$emit('updateFilter', this.filter);
  	},

  	updateSortOrder : function() {
  		if (this.filter.sortOrder === 'asc') {
      	this.filter = {...this.filter, sortOrder: 'desc'};
      	this.$refs.sortOrder.innerText = '↑';
      } else {
      	this.filter = {...this.filter, sortOrder: 'asc'};
      	this.$refs.sortOrder.innerText = '↓';
      }
      this.$emit('updateFilter', this.filter);
  	},
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/base";
  .book-toolbar {
  	margin-bottom: 1rem;
  	background: #eee;
  	padding: .75rem;
  	border-radius: .25rem;
  	@include media-query(tablet) {
	  	display: flex;
	  	justify-content: space-between;
	  	flex-direction: row;
	    flex-wrap: wrap;
	  }
	  .search-text{
	  	width: calc(100% - 355px);
	  	@include media-query(tablet) {
	  		width: auto;
	  	}
	  }
	  .search-type{
	  	width: 115px;
	  }
    input, select{
    	height: 35px;
    	border: 1px solid #ccc;
    	padding: .25rem .75rem;
    	font-size: 1rem;
    	&:focus{    		
    		outline: none;
    	}
    }
    input[type="text"] {
    	border-left: 0;
    }
    .search-box{
    	margin-bottom: 1rem;
    	@include media-query(tablet) {
    		margin-bottom: 0;
    	}
    }
    button {
    	height: 35px;
    	background: #aaa;
    	color: #fff;
    	padding: .25rem .75rem;
    	border: none;
    	cursor: pointer;
    	font-weight: 500;
    	margin-right: 1rem;
    }
    .sort-icon{
    	display: inline-block;
    	width: 30px;
    	text-align: center;
    }
    .sort-type{
    	width: calc(100% - 95px);
    }
  }
</style>