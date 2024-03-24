const { Trainer, Rattata } = require("./pokemon");

const Laura = new Trainer();
Laura.name = 'Laura'
Laura.belt[0] = new Rattata()
Laura.belt[1] = new Rattata()

module.exports = Laura;