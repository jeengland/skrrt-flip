<template>
    <div class="flip">
      <input type='file' id='fileUpload' accept='.mp3' @change='upload' />
      <audio id='upload' :src='file'></audio>
      <button type='button' @click="play">Play</button>
    </div>
</template>

<script>
import axios from 'axios'

const buffToAudio = (slice) => {
  const ac = new AudioContext()
  ac.decodeAudioData(slice)
    .then(buff => {
        const source = ac.createBufferSource()
        source.buffer = buff
        source.connect(ac.destination)
        source.start()
    })
    .catch(error => console.error(error))
}

console.log(buffToAudio)

export default {
  data() {
    return {
      file: null,
      fileURL: '',
      buffer: null,
      bars: 8,
      slices: []
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
    upload(e) {
      this.file = (e.target.files[0])
      this.fileURL = URL.createObjectURL(this.file)
      axios({ url: this.fileURL, method: 'GET', responseType: 'arraybuffer' })
        .then(res => {
          console.log(res.data)
          const interval = Math.floor(res.data.byteLength / this.bars)
          console.log(interval)
          for (let i = 0; i < this.bars - 1; i++) {
            this.slices.push(res.data.slice(i * interval, (i + 1) * interval))
            console.log(res.data)
          }
          this.slices.push(res.data.slice(this.bars - 1 * interval, res.data.byteLength))
          console.log(this.slices)
        })
        .catch(err => console.error(err))
    },
  }
}
</script>

<style scoped>
</style>
