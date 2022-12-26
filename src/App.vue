<template>
  <div id="app">
    <router-view></router-view>
		<notifications group="notify" position="bottom right"></notifications>
  </div>
</template>
<script>
import '@/assets/styles/app.scss';

export default {
  name: 'App'
}
</script>