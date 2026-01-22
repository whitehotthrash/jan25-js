function getSize(width, height, depth) {
  const area = width * height;
  const volume = width * height * depth;
  const sizes = [area, volume];
  return sizes;
}

const areaOne = getSize(3, 2, 3)[0];
const volumeOne = getSize(3, 2, 3)[1];

console.log("Area One", areaOne);
console.log("Volume One", volumeOne);

(() => {
  let width = 3
  let height = 3
  console.log("iffy", width * height);
  return width * height;
})();

var iffyArea = (function() {
  var width = 3
  var height = 3
  console.log("old iffy", width * height);
  return width * height;
}());

const hotel = {
  name: 'Quay',
  rooms: 40,
  booked: 25,
  gym: true,
  roomTypes: ['twin', 'double', 'suite'],
  checkAvailability: function() {
    return this.rooms - this.booked;
  }
}

console.log(hotel.checkAvailability());
console.log(hotel.gym)
console.log(hotel.roomTypes[1])
console.log(JSON.stringify(hotel.roomTypes))