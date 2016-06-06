// emulating coffeescript "?" operator
module.exports = function (obj) {
  return typeof obj !== "undefined" && obj !== null
}