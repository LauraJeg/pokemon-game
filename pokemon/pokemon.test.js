const {Pokemon, Fire, Water, Grass, Rattata, Charmander, Squirtle, Bulbasaur, Pokeball, Trainer, Battle} = require('./pokemon')
describe('Pokemon',() => {
    test('correct properties in the class', () =>{
        const input = new Pokemon();
        expect(input).toHaveProperty('name');
        expect(input).toHaveProperty('hitPoints');
        expect(input).toHaveProperty('attackDamage');
        expect(input).toHaveProperty('move');
    })
})

describe('takeDamage',() => {
    test('takeDamage method exists as a property', () =>{
        const input = new Pokemon();
        expect(input).toHaveProperty('takeDamage');
    })
    test('takeDamage method will reduce its health by given number', () =>{
        const input = new Pokemon('Eevee', 55);
        expect(input.takeDamage(10)).toBe(45);
    })
})
describe('useMove',() => {
    test('useMove method exists as a property', () =>{
        const input = new Pokemon();
        expect(input).toHaveProperty('useMove');
    })
    test('useMove returns the attack damage', () =>{
        const input = new Pokemon('Squirtle',44, 16,'surf');
        expect(input.useMove()).toBe(16);
    })
})
describe('hasFainted',() => {
    test('hasFainted method exists as a property', () =>{
        const input = new Pokemon();
        expect(input).toHaveProperty('hasFainted');
    })
    test('hasFainted method returns a boolean', () =>{
    const input = new Pokemon();
    expect(typeof input.hasFainted()).toBe('boolean');
    })

    test('hasFainted method returns false if pokemon has not fainted', () =>{
        const input = new Pokemon('Squirtle',44, 16,'surf');
        expect(input.hasFainted()).toBe(false)
    })
    test('hasFainted method returns true if pokemon has fainted', () =>{
        const input = new Pokemon('Squirtle',0, 16,'surf');
        expect(input.hasFainted()).toBe(true);
    })
    
})
describe('3 classes extend Pokemon',() => {
    test('each class has type property',() => {
        const inputFire = new Fire();
        expect(inputFire).toHaveProperty('type');
        const inputWater = new Water();
        expect(inputWater).toHaveProperty('type');
        const inputGrass= new Grass();
        expect(inputGrass).toHaveProperty('type');
})
     test('isEffectiveAgainst and isWeakTo should both return booleans',() => {
        const inputFire = new Fire('Laura', 45, 13, 'clap');
        const inputGrass= new Grass('Laura', 45, 13, 'clap');
      expect(typeof inputFire.isEffectiveAgainst(inputGrass)).toBe('boolean');
      expect(typeof inputFire.isWeakTo(inputGrass)).toBe('boolean');
})
     test('isEffectiveAgainst returns true for respective type combination, and false if not',() => {
        const inputNormal = new Pokemon('Laura', 45, 13, 'clap');
        const inputFire = new Fire('Laura', 45, 13, 'clap');
        const inputWater = new Water();
        const inputGrass= new Grass('Laura', 45, 13, 'clap');
        expect(inputFire.isEffectiveAgainst(inputGrass)).toBe(true);
        expect(inputGrass.isEffectiveAgainst(inputWater)).toBe(true);
        expect(inputWater.isEffectiveAgainst(inputFire)).toBe(true);
        expect(inputWater.isEffectiveAgainst(inputGrass)).toBe(false);
        expect(inputWater.isEffectiveAgainst(inputNormal)).toBe(false);
})
    test('isWeakTo returns true for respective type combination, and false if not', () => {
        const inputNormal = new Pokemon('Laura', 45, 13, 'clap');
        const inputFire = new Fire('Laura', 45, 13, 'clap');
        const inputWater = new Water();
        const inputGrass= new Grass('Laura', 45, 13, 'clap');
        expect(inputFire.isWeakTo(inputWater)).toBe(true);
        expect(inputGrass.isWeakTo(inputFire)).toBe(true);
        expect(inputWater.isWeakTo(inputGrass)).toBe(true);
        expect(inputWater.isWeakTo(inputFire)).toBe(false);
        expect(inputWater.isWeakTo(inputNormal)).toBe(false);
    })
})

describe('Pokemon species', () => {
    test('Rattata', () => {
        const inputRattata = new Rattata()
        expect(inputRattata.move).toBe('tackle')
    })
    test('Charmander', () => {
        const inputCharmander = new Charmander()
        expect(inputCharmander.move).toBe('ember')
        expect(inputCharmander.type).toBe('fire')
    })
    test('Squirtle', () => {
        const inputSquirtle = new Squirtle()
        expect(inputSquirtle.move).toBe('water gun')
    })
    test('Bulbasaur', () => {
        const inputBulbasaur = new Bulbasaur()
        expect(inputBulbasaur.move).toBe('vine whip')
    })
})

describe('PokeBall', () => {
    test('It should have the properties contains, throw method, isEmpty method and whatsInside method', () => {
        const input = new Pokeball()
        expect(input).toHaveProperty('throw')
        expect(input).toHaveProperty('isEmpty')
        expect(input).toHaveProperty('inside')
    })
    test('throw method when ball is empty and an arguement is invoked', () => {
        const input = new Pokeball()
        const capturedPokemon = new Squirtle()
        input.throw(capturedPokemon)
        expect(input.inside).toBe('Squirtle')
    })
    test('throw method cannot capture when pokeball is not empty', () => {
        const input = new Pokeball()
        const capturedPokemon = new Squirtle()
        input.throw(capturedPokemon)

        const inputRattata = new Rattata()
        input.throw(inputRattata)
        expect(input.inside).toBe('Squirtle')
    })
    test('throw method should show the caputured pokemon if invoked with no arguement passed', () => {
        const input = new Pokeball() 
        const inputRattata = new Rattata()
        input.throw(inputRattata)

        const consoleSpy = jest.spyOn(console, 'log') 
        input.throw()
       

        expect(input.inside).toBe('Rattata')
        expect(consoleSpy).toHaveBeenCalledTimes(1)
        expect(consoleSpy).toHaveBeenCalledWith('GO Rattata!!')
        consoleSpy.mockRestore()
    })
    test('throw method should show empty if thrown with no captured pokemon and no arguement', () => {
        const input = new Pokeball() 
        const consoleSpy = jest.spyOn(console, 'log') 
        input.throw()

        expect(consoleSpy).toHaveBeenCalledTimes(1)
        expect(consoleSpy).toHaveBeenCalledWith('...empty')
        consoleSpy.mockRestore()
    })
    test('isEmpty should return a boolean', () => {
        const input = new Pokeball() 
        expect(typeof input.isEmpty()).toBe('boolean')
    })
    test('return true if Pokeball is empty and false if Pokeball is not empty', () => {
        const input = new Pokeball() 
        expect(input.isEmpty()).toBe(true)

        const inputRattata = new Rattata()
        input.throw(inputRattata)
        expect(input.isEmpty()).toBe(false)
    })
    test('inside should return the contents of the pokeball', () => {
        const input = new Pokeball() 
        expect(input.inside).toBe('...empty')

        const inputRattata = new Rattata()
        input.throw(inputRattata)
        expect(input.inside).toBe('Rattata')
    })
})

describe('Trainer', () => {
    it('should have a belt property', () => {
        const Ash = new Trainer ()
        expect(Ash).toHaveProperty('belt')
    })
    it('should only be able to store up to six pokeballs', () => {
        const Ash = new Trainer ()
        expect(Ash.belt.length).not.toBeGreaterThan(6)
    })
    it('should catch a Pokemon in the first Pokeball using the PokeBall throw method', () => {
        const Ash = new Trainer ()
        expect(Ash).toHaveProperty('catch')

        const inputBulbasaur = new Bulbasaur()
        Ash.catch(inputBulbasaur)
        expect(Ash.belt[0].inside).toBe('Bulbasaur')

    })
    it('should catch a Pokemon in the next empty belt space when more than one Pokemon is caught', () => {
        const Carmel = new Trainer()
        const inputBulbasaur = new Bulbasaur()
        Carmel.catch(inputBulbasaur)

        const inputRattata = new Rattata()
        Carmel.catch(inputRattata)
        expect(Carmel.belt[0].inside).toBe('Bulbasaur')
        expect(Carmel.belt[1].inside).toBe('Rattata')
        expect(Carmel.belt[2].inside).not.toBe('Rattata')
    })
    it('should show a message to the user if all the pokeballs in the belt are full', () => {
        const Carmel = new Trainer()
        const inputBulbasaur = new Bulbasaur()
        Carmel.catch(inputBulbasaur)
        Carmel.catch(inputBulbasaur)
        Carmel.catch(inputBulbasaur)
        const inputRattata = new Rattata()
        Carmel.catch(inputRattata)
        Carmel.catch(inputRattata)
        Carmel.catch(inputRattata)

        const consoleSpy = jest.spyOn(console, 'log') 
        Carmel.catch(inputRattata)
      
        expect(consoleSpy).toHaveBeenCalledTimes(1)
        expect(consoleSpy).toHaveBeenCalledWith('You have full Pokeballs, go buy some more!')
        consoleSpy.mockRestore()

    })

    it('should find the name of the Pokemon when its name is the only one in the belt', () => {
        const Laura = new Trainer()
        expect(Laura).toHaveProperty('getPokemon')

        const consoleSpy = jest.spyOn(console, 'log') 
        const inputRattata = new Rattata()
        Laura.catch(inputRattata)
        Laura.getPokemon('Rattata')
      
        expect(consoleSpy).toHaveBeenCalledTimes(2)
        expect(consoleSpy).toHaveBeenCalledWith('GO Rattata!!')
        consoleSpy.mockRestore()
        
    })
    it('should find the name of the Pokemon when there is more than one in the belt', () => {
        const Laura = new Trainer()

        const inputRattata = new Rattata()
        const inputCharmander = new Charmander()
        Laura.catch(inputRattata)
        Laura.catch(inputCharmander)
        const inputBulbasaur = new Bulbasaur()
        Laura.catch(inputBulbasaur)

        const consoleSpy = jest.spyOn(console, 'log') 
        Laura.getPokemon('Charmander')

        expect(consoleSpy).toHaveBeenCalledTimes(1)
        expect(consoleSpy).toHaveBeenCalledWith('GO Charmander!!')
        consoleSpy.mockRestore()

    })
})

describe('Battle', () => {
    it('should make a battle', () =>{
        const newBattle = new Battle()
        expect(newBattle).toHaveProperty('trainer1')
        expect(newBattle).toHaveProperty('trainer2')
    })
    it('should drop the defending pokemon\'s hitpoints by the attackdamage of the attacking pokemon', () => {
        const inputCharmander = new Charmander()
        const newBattle = new Battle('Carmel', new Rattata(), 'Laura', inputCharmander)
        expect(newBattle).toHaveProperty('fight')
        newBattle.fight()
        expect(newBattle.pokemon2.hitPoints).toBe(29)
    })
    it('should be able to alternate attacking and defending pokemon', () => {
        const inputCharmander = new Charmander();
        const newBattle = new Battle('Carmel', new Rattata(), 'Laura', inputCharmander);
        newBattle.fight();
        expect(newBattle.pokemon2.hitPoints).toBe(29);
        newBattle.fight();
        expect(newBattle.pokemon1.hitPoints).toBe(33);
        newBattle.fight();
        expect(newBattle.pokemon2.hitPoints).toBe(14);
        newBattle.fight();
        expect(newBattle.pokemon1.hitPoints).toBe(16)
    })
    it('should be able to take into acccount the pokemon stength if attacker is strong to defender. Effective against', () => {
        const inputCharmander = new Charmander();
        const newBattle = new Battle('Carmel', new Squirtle(), 'Laura', inputCharmander);
        newBattle.fight();
        expect(newBattle.pokemon2.hitPoints).toBe(24);
    })
    it('should be able to take into acccount the pokemon stength if defender is weak to attacker. Weak to', () => {
        const inputCharmander = new Charmander();
        const newBattle = new Battle('Carmel', new Squirtle(), 'Laura', inputCharmander);
        newBattle.fight();
        expect(newBattle.pokemon2.hitPoints).toBe(24);
        newBattle.fight();
        expect(newBattle.pokemon1.hitPoints).toBe(31)
    })
    it('should show a message when attack is made which makes reference to strength against the defender', () => {
        const consoleSpy = jest.spyOn(console, 'log')
        const inputCharmander = new Charmander();
        const newBattle = new Battle('Carmel', new Squirtle(), 'Laura', inputCharmander);
        newBattle.fight();
        newBattle.fight();
        expect(consoleSpy).toHaveBeenCalledTimes(4);
        expect(consoleSpy).toHaveBeenCalledWith('water gun is super effective!!!');
        consoleSpy.mockRestore();
    })
    it('if a fighter faints, the battle should end and showa victory message', () => {
        const consoleSpy = jest.spyOn(console, 'log')
        const inputCharmander = new Charmander();
        const newBattle = new Battle('Carmel', new Squirtle(), 'Laura', inputCharmander);
        newBattle.fight();
        newBattle.fight();
        newBattle.fight();
        newBattle.fight();
        newBattle.fight();
        newBattle.fight();
    
        expect(consoleSpy).toHaveBeenCalledWith('The fight has ended. Carmel has won the game!!!');
        consoleSpy.mockRestore();
    })
})