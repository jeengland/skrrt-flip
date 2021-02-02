<template>
    <div class="flip">
      <input type='file' id='fileUpload' accept='.mp3' @change='upload' />
      <audio id='upload' :src='file'></audio>
      <button type='button' @click="play">Play</button>
    </div>
</template>

<script>
import axios from 'axios'
import { buffToAudio } from '../modules/bufferToAudio.js'
import { slicer } from '../modules/slicer.js'

export default {
  data() {
    return {
      file: null,
      fileURL: '',
      buffer: null,
      bars: 16,
      slices: [],
      i: 0
    }
  },
  methods: {
    play() {
      buffToAudio(this.slices[this.i])
      this.i += 1
    },
    upload(e) {
      this.file = (e.target.files[0])
      this.fileURL = URL.createObjectURL(this.file)
      axios({ url: this.fileURL, method: 'GET', responseType: 'arraybuffer' })
        .then(res => {
          this.slices = slicer(res.data, this.bars)
        })
        .catch(err => console.error(err))
    },
  }
}
</script>

<style scoped>
</style>
