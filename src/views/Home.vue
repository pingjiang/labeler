<template>
<div class="root-container">
  <div class="toolbar">
    <div class="toolbar-left">
      <Icon type="ios-home-outline" />
    </div>
    <div class="toolbar-middle">
      <Icon type="ios-remove" />
      <Icon type="ios-search" />
      <Icon type="ios-add" />

      <Icon type="ios-add-circle-outline" />
    </div>
    <div class="toolbar-right"></div>
  </div>

  <div class="content-container">
    <div class="actionbar">
      <Icon type="ios-move" />

      <Icon type="ios-brush-outline" />
    </div>
    <div class="main-content">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="settings">
      json schema form

      <input v-model="keyword"/>

      <div class="icons">
        <i class="fa" :class="'fa-' + icon" v-for="icon in icons" :key="icon"
          v-show="keyword == null || icon.indexOf(keyword) !== -1"></i>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import icons from './icons';

export default {
  components: {
    HelloWorld,
  },
  data() {
    return {
      keyword: null,
      icons,
    };
  },
};
</script>

<style lang="less">
.root-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .toolbar {
    flex: 0 0 50px;
    display: flex;
    flex-direction: row;
    background-color: #eee;
    align-items: center;
  }

  .toolbar-left {
    flex: 0 0 50;
  }
}

.content-container {
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  justify-content: stretch;

  .actionbar {
    flex: 0 0 50px;
    background-color: #eee;
  }

  .main-content {
    flex: 1 1 auto;

    & > canvas {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

  .settings {
    flex: 0 0 320px;
    background-color: #eee;
    overflow: auto;
  }
}

.icons {
  font-size: 30px;
  i {
    margin: 5px;
  }
}
</style>
