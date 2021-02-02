// Takes in an ArrayBuffer and slices it into an equal number of segments, returns an array of ArrayBuffers
function slicer(buffer, segments) {
    const arraySlices = []
    const interval = Math.floor(buffer.byteLength / segments)
    // Loop through all but the last set of bytes
    for (let i = 0; i < segments - 1; i++) {
        arraySlices.push(buffer.slice(i * interval, (i + 1) * interval))
    }
    // For the last slice we want to make sure to slice to the end so we don't leave any bytes off
    arraySlices.push(buffer.slice(segments - 1 * interval))
    return arraySlices
}

module.exports = { slicer }