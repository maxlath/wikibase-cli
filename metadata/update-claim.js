module.exports = {
  args: '<entity> <property> <old-value> <new-value>',
  description: "update a claim's value",
  options: {
    lang: false
  },
  examples: [
    { args: 'Q4115189 P2002 Zorglub Bulgroz', comment: "change the the Sandbox (Q4115189) Twitter account (P2002) from 'Zorglub' to 'Bulgroz'" }
  ]
}
