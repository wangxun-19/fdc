<template>
  <div id="app" >
       <router-view></router-view>
  </div>
</template>

<script>
    var updateBaseFontSize = function () {
          var dWidth = document.documentElement.clientWidth;
          var baseFontSize = dWidth * 100 / 750;
          document.documentElement.style.fontSize = baseFontSize + 'px';
    };
    window.addEventListener('resize', updateBaseFontSize);
    updateBaseFontSize();

export default {
  name: 'app',
  components: {

  },
}
</script>

<style>
    #app{
      background-color: white;
    }
</style>
