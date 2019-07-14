<template lang="pug">
.drop-target(@click.native="onEdit" :draggable="draggable"
             @dragstart="onDragStart" @dragend="onDragEnd"
             @dragover.prevent="onDragOver" @drop.prevent="onDrop"
             @dragenter="onDragEnter" @dragleave="onDragLeave"
             :class="{'drop': dragOver, 'being-dragged': beingDragged}")
  slot
</template>

<script>
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";

export default {
  props: ['draggable'],
  data () {
    return {
      dragOver: false,
      beingDragged: false
    }
  },
  methods: {
    onDragStart (event) {
      this.beingDragged = true
      this.$emit('drag', event)
    },
    onDragEnd (event) {
      this.beingDragged = false
    },
    onDragOver (event) {
    },
    onDragEnter (event) {
      this.dragOver = true
    },
    onDragLeave (event) {
      this.dragOver = false
    },
    onDrop (event) {
      this.dragOver = false
      const source = JSON.parse(event.dataTransfer.getData('application/json'))
      this.$emit('drop', source)
    }
  }
}
</script>

<style lang="sass">
@import "~mobile-drag-drop/default.css"

.drop-target
  border: 2px dashed rgba(0,0,0,0)

.drop
  border-color: red!important

.being-dragged
  border-color: blue!important
</style>
