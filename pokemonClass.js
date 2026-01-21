
class Pokemon {

	
	/**
	 * Get the number of active instances of Pokemon in the app right now.
	 * @author BigfootDS
	 *
	 * @static
	 */
	static count = 0;


	/**
	 * Create a Pokemon instance that will have its own unique data such as a name.
	 * 
	 * @param {String} newName The name of the instance of the Pokemon that you are creating. 
	 */
	constructor(newName){
		this.name = newName;

		// We have made a new instance, so we must increase the count by one!
		Pokemon.count++;
	}

	/**
	 * This logs a string to the console directly.
	 * 
	 * @example instance.speak()
	 */
	speak(){
		console.log("Hello! I am " + this.name);
	}

	speakArrowFunction = () => {
		// Arrow functions change how "this" behaves in NodeJS,
		// but it's totally fine in browser JS
		console.log("Hello, I am " + this.name);
	}

	static delete (instanceToDelete){ 
		Pokemon.count--;
		instanceToDelete = undefined;
	}

}

let pikachuInstance = new Pokemon("pikachu");
let bulbasaurInstance = new Pokemon("bulbasaur");

console.log(pikachuInstance.name);
console.log(bulbasaurInstance.name);

bulbasaurInstance.speak();
// The below will log the name AND also log "undefined"!!
// console.log(bulbasaurInstance.speak());
bulbasaurInstance.speakArrowFunction();


console.log(pikachuInstance);
console.log(JSON.stringify(pikachuInstance));

console.log(Pokemon.count);

// bulbasaurInstance = undefined;
// Pokemon.count--;
Pokemon.delete(bulbasaurInstance);

console.log(Pokemon.count);

console.log(bulbasaurInstance);



/**
 * Description placeholder
 * @author BigfootDS
 *
 * @returns {Pokemon[]}
 */
function makeAPokemonTeam(){
	let team = [];
	team.push(new Pokemon("squirtle"));
	team.push(new Pokemon("new"));

	return team;
}


/**
 * Description placeholder
 * @author BigfootDS
 *
 * @returns {Pokemon[]}
 */
const someOtherPokemonTeam = () => {
	return [new Pokemon("mewtwo"), new Pokemon("lugia")]
}