const features = [4, 3, 6, 6, 2, 6, 7,2,92]

let map = features.map(feature => `<li>${feature}</li>`).join('')
console.log(map)