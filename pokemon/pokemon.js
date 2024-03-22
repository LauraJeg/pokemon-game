class Pokemon{
    constructor(name, hitPoints, attackDamage, move = 'tackle'){
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackDamage = attackDamage;
        this.move = move;
        this.type = 'normal';
    }
takeDamage(damage){
    return this.hitPoints -damage;
}
useMove(){
    console.log(`${this.name} used ${this.name}'s ${this.move}`);
    return this.attackDamage;
}
hasFainted(){
    if(this.hitPoints<= 0){
    return true;
}
    else {
        return false;
    }
}
isEffectiveAgainst (pokemon){
    if(this.type ==='fire' && pokemon.type ==='grass'){

        return true
    } else if (this.type === 'grass'&& pokemon.type === 'water') {
    return true}
    else if (this.type ==='water' && pokemon.type === 'fire'){
        return true
    } 
    return false
}
isWeakTo (pokemon){
    if(this.type ==='fire' && pokemon.type ==='water'){

        return true
    } else if (this.type === 'grass'&& pokemon.type === 'fire') {
    return true}
    else if (this.type ==='water' && pokemon.type === 'grass'){
        return true
    } 
    return false
}
}
class Fire extends Pokemon{
   constructor(name, hitPoints, attackDamage,move){
    super(name, hitPoints, attackDamage, move)
    this.type = 'fire';
    this.move = move;
    }
}
class Water extends Pokemon{
    constructor(name, hitPoints, attackDamage,move){
     super(name, hitPoints, attackDamage, move)
     this.type = 'water';
     this.move = move;
     }
 }
 class Grass extends Pokemon{
    constructor(name, hitPoints, attackDamage,move){
     super(name, hitPoints, attackDamage, move)
     this.type = 'grass';
     this.move = move;
    }
 }

 class Rattata extends Pokemon{
    constructor(name, hitPoints, attackDamage,move){
        super(name, hitPoints, attackDamage, move)
     this.name = 'Rattata';
        this.hitPoints = 50;
        this.attackDamage = 15;
    }
 }

 class Charmander extends Fire{
    constructor(name, hitPoints, attackDamage,move, type){
        super(name, hitPoints, attackDamage, move, type)
        this.move = 'ember';
        this.name = 'Charmander';
        this.hitPoints = 44;
        this.attackDamage = 17;
        }
 }
 class Squirtle extends Water{
    constructor(name, hitPoints, attackDamage,move,type){
     super(name, hitPoints, attackDamage, move,type)
     this.move = 'water gun';
     this.name = 'Squirtle';
        this.hitPoints = 44;
        this.attackDamage = 16;
     }
 }
 class Bulbasaur extends Grass{
    constructor(name, hitPoints, attackDamage,move, type){
        super(name, hitPoints, attackDamage, move, type)
        this.move = 'vine whip';
        this.name = 'Bulbasaur';
        this.hitPoints = 44;
        this.attackDamage = 16;
       }
 }

class Pokeball {
    #contains
    constructor(){
        this.#contains = '...empty'
    }
    throw(capturedPokemon) {
        if (this.#contains === '...empty' && capturedPokemon !== undefined){
        this.#contains = capturedPokemon.name
        console.log(`You caught ${this.#contains}`)}
        else if(this.#contains !== '...empty' ){
           console.log(`GO ${this.#contains}!!`) 
        }
        else if(this.#contains === '...empty' ){
            console.log('...empty')
        }
    } 

    isEmpty() {
        return this.#contains === '...empty'? true:false
    }
    get inside(){
        return this.#contains
    }
}
class Trainer {
    constructor(){
        this.belt = [new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball()]
    }
     catch(caughtPokemon){
        for(let i = 0; i<this.belt.length; i++){
            if(i === 5 && this.belt[i].inside !== '...empty'){
                console.log('You have full Pokeballs, go buy some more!')
               } 
               else if(this.belt[i].inside === '...empty'){
                return  this.belt[i].throw(caughtPokemon)
            }
        }
     }
     getPokemon (pokeName){
        for(let i = 0; i< this.belt.length; i++){
            if(this.belt[i].inside === pokeName){
                return this.belt[i].throw()
            }
        } 
     }
}

class Battle {
    constructor(trainer1,  pokemon1, trainer2, pokemon2) {
        this.trainer1 = trainer1
        this.trainer2 = trainer2
        this.isPokemon1Turn = true
        this.pokemon1 = pokemon1 
        this.pokemon2 = pokemon2
        this.hasBattleEnded= false
    }

    fight() {
        if(this.hasBattleEnded===true){
            return 'This battle has ended, you cannot fight!'}
        if(this.isPokemon1Turn === true){
         this.attack(this.pokemon1, this.pokemon2);
         this.hasFightEnded(this.trainer1, this.pokemon2)
         return this.isPokemon1Turn = false
    }
        if(this.isPokemon1Turn  === false){
            this.isPokemon1Turn = true
            this.attack(this.pokemon2, this.pokemon1);
    return this.hasFightEnded(this.trainer2, this.pokemon1)
        }
    
    }
    attack(attacker, defender){
        console.log(`${attacker.name} used ${attacker.move}`)
        if(attacker.isEffectiveAgainst(defender)){
            console.log(`${attacker.move} is super effective!!!`);
            return defender.hitPoints -= (attacker.attackDamage * 1.25).toFixed();
           }
        if(attacker.isWeakTo(defender)){
            console.log(`${attacker.move} is not effective`);
            return defender.hitPoints -= (attacker.attackDamage * 0.75).toFixed();
        }
        console.log(`${attacker.move} connected with ${defender.name}`);
        return defender.hitPoints-= attacker.attackDamage.toFixed();
    }
    hasFightEnded(attacker, defender){
        if(defender.hasFainted()=== true){
            console.log(`The fight has ended. ${attacker} has won the game!!!`);
            this.hasBattleEnded = true;
        }
    }
}
module.exports = {Pokemon, Fire, Water, Grass, Rattata, Charmander, Squirtle, Bulbasaur, Pokeball, Trainer, Battle};