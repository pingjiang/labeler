<template>
<v-group @dragstart="handleDragstart" @dragmove="handleDragmove" @dragend="handleDragend">
  <v-path ref="path" :config="config"></v-path>
  <v-group v-if="!disabled" v-for="({ command, points }, i) in pathData" :key="i">
    <v-group v-if="command === 'M' || command === 'L'">
      <v-circle :config="getNodeConfig(i, points[0], points[1])"></v-circle>
    </v-group>
    <v-group v-if="command === 'A'">
      <v-circle :config="getNodeConfig(i, points[5], points[6])"></v-circle>
    </v-group>
    <v-group v-else-if="command === 'Q'">
      <v-line :config="getLinkConfig(i, getLastX(i-1), getLastY(i-1), points[0], points[1])"></v-line>
      <v-line :config="getLinkConfig(i, points[0], points[1], points[2], points[3])"></v-line>
      <v-circle :config="getNodeConfig(i, points[0], points[1], 'cp')"></v-circle>
    </v-group>
    <v-group v-else-if="command === 'C'">
      <v-line :config="getLinkConfig(i, getLastX(i-1), getLastY(i-1), points[0], points[1])"></v-line>
      <v-line :config="getLinkConfig(i, points[2], points[3], points[4], points[5])"></v-line>
      <v-circle :config="getNodeConfig(i, points[0], points[1], 'cp1')"></v-circle>
      <v-circle :config="getNodeConfig(i, points[2], points[3], 'cp2')"></v-circle>
    </v-group>
  </v-group>
</v-group>
</template>

<script>
import { Path } from 'konva';

function stringifyPath(pathData) {
  if (!pathData || !pathData.length) {
    return '';
  }

  return pathData.map(({ command, points }) => (command + ' ' + points.join(' '))).join(' ');
}

export default {
  name: 'EditPath',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    config: Object,
  },
  data() {
    return {
      draggingData: null,
    };
  },
  computed: {
    // [{command, points, pathLength}]
    pathData() {
      const { draggingData, config } = this;
      return draggingData ? draggingData : Path.parsePathData(config ? config.data : null);
    },
  },
  methods: {
    getLastX(i) {
      const part = this.pathData[i];
      const len = part && part.points ? part.points.length : 0;
      return len > 1 ? part.points[len - 2] : 0;
    },
    getLastY(i) {
      const part = this.pathData[i];
      const len = part && part.points ? part.points.length : 0;
      return len > 1 ? part.points[len - 1] : 0;
    },
    getNodeConfig(i, x, y, type) {
      return {
        name: `node ${i} ${type || 'point'}`,
        x,
        y,
        radius: 10,
        fill: 'red',
        draggable: true,
      };
    },
    getLinkConfig(i, x, y, x1, y1) {
      return {
        name: `link ${i}`,
        points: [x, y, x1, y1],
        stroke: 'gray',
        strokeWidth: 2,
        lineJoin: 'round',
        dash: [2, 2],
      };
    },
    handleDragstart(cmp, e) {
      this.draggingData = Path.parsePathData(this.config ? this.config.data : null);
    },
    handleDragmove(cmp, e) {
      this.updatePath(cmp, e);
    },
    handleDragend(cmp, e) {
      const shape = cmp.getStage();

      this.$nextTick(() => {
        shape.x(0);
        shape.y(0);
      });

      const next = Object.assign({}, this.config);
      next.data = this._lastData;

      this.$emit('change', next);
    },
    updatePath(cmp, e) {
      console.log('update path', cmp, e);

      const shape = cmp.getStage();
      const nameIndexType = shape.name().split(' ');

      if (nameIndexType[0] !== 'node') {
        console.warn('nameIndexType is not node');
        return;
      }

      const part = this.draggingData[nameIndexType[1]];

      if (!part) {
        console.error('draggingData part is null');
        return;
      }

      const type = nameIndexType[2];
      const x = shape.x();
      const y = shape.y();
      let last = 0;

      if (type === 'cp' || type === 'cp1') {
        last = 0;
      } else if (type === 'cp2') {
        last = 2;
      } else {
        last = part.points.length - 2;
      }

      this.$set(part.points, last, x);
      this.$set(part.points, last + 1, y);

      const path = this.$refs.path;
      const pathShape = path.getStage();
      this._lastData = stringifyPath(this.draggingData);
      pathShape.setData(this._lastData);

      shape.getLayer().batchDraw();
    },
  },
};
</script>
