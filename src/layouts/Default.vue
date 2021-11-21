<template>
  <div class="container">
    <Header />
    <main class="main">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
	components: {
		Header,
	},
};
</script>

