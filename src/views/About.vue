<template>
  <div class="about">
    <v-stage :config="stageConfig">
      <v-layer>
        <EditPath :config="pathConfig" @change="handleChange"></EditPath>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import EditPath from '../components/EditPath.vue';

export default {
  components: {
    EditPath,
  },
  data() {
    return {
      stageConfig: {
        width: 640,
        height: 480,
      },
      pathConfig: {
        data: ['M', 10, 10, 'L', 300, 10, 'C', 400, 100, 400, 200, 300, 400, 'L', 10, 400, 'Z'].join(' '),
        // points: [10, 10, 600, 10, 600, 400, 10, 400],
        stroke: 'red',
        strokeWidth: 2,
        fill: 'rgba(255, 0, 0, 0.5)',
        // closed: true,
      },
    };
  },
};
</script>
