// Function takes in an ArrayBuffer and turns it into an AudioBuffer, then plays it
function buffToAudio(buffer) {
    const ac = new AudioContext()
    ac.decodeAudioData(buffer)
      .then(buff => {
          const source = ac.createBufferSource()
          source.buffer = buff
          source.connect(ac.destination)
          source.start()
          return source
      })
      .catch(error => console.error(error))
}

module.exports = { buffToAudio }