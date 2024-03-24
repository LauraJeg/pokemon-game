const { Trainer, Rattata } = require("./pokemon");

const Laura = new Trainer();
Laura.name = 'Laura'
Laura.belt[0] = new Rattata();
Laura.belt[1] = new Rattata();

const Carmel = new Trainer();
Carmel.name = "Carmel";


module.exports = Laura;