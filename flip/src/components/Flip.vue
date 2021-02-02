<template>
    <div class="flip">
      <input type='file' id='fileUpload' accept='.mp3' @change='fileChange' />
      <audio id='upload' :src='file'></audio>
      <button type='button' @click="play">Play</button>
    </div>
</template>

<script>
// import * as Tone from 'tone'

//create a synth and connect it to the main output (your speakers)
// const synth = new Tone.Synth().toDestination();

export default {
  data() {
    return {
      file: null,
      fileURL: ''
    }
  },
  methods: {
    play() {
      //play a middle 'C' for the duration of an 8th note
      if (this.file) {
        const audio = new Audio(this.fileURL)
        audio.play()
      }
    },
    fileChange(e) {
      this.file = (e.target.files[0])
      this.fileURL = URL.createObjectURL(this.file)
      console.log(this.fileURL)
    }
  }
}
</script>

<style scoped>
</style>
