

//#region Monday night code

console.log("Hello, world! From the JS file!");

// let is locally-scoped and mutable
let favouriteFruit = "mango";

// const is immutable 
const favouriteFruit2 = "mango";

/*

some big long warning about the dangers of var
goes here
pretend it's scary, oooooooh

*/
var favouriteFruit3 = "mango";


/**
 * Multi-line comment with cool structure.
 * JSDoc comment style!
 * @example console.log(someOtherVariableExample);
 */
let someOtherVariableExample = "bananas";


console.log(someOtherVariableExample)


//#endregion



//#region Control structures

// control flow 
if (1 + 1 == 2){

}

let someNumber = 0;

if (someNumber){
	console.log("someNumber is truthy so we can see this message!");
}

if ("0" && "0".length){
	console.log("string of 0 is truthy")
}

if (false && (false === true)){
	console.log("false/tru thing is here");
}

if (favouriteFruit == "bananas" || favouriteFruit == "mangoes"){
	console.log("favourite fruit short circuit logic")
}

// let isIt2026 = true;

// if (!isIt2026){
// 	console.log("It is 2026!");
// }



// switch statements

let favouriteFruit4 = "bananas";

switch (favouriteFruit4) {
	case "mangoes":
		console.log("Favourite fruit is totally mango!")
		break;
	case "bananas":
		console.log("Favourite fruit is bananas!");
		// no break keyword, so case fall-through will happen!
	default:
		console.log("Favourite fruit is something else that we are generically handling!");
		break;
}

// if (favouriteFruit3 == "mangoes"){
// 	console.log();
// } else {
// 	console.log();
// }


//#endregion


//#region Loops!

// for loops

let favouritePokemon = [
	"blastoise",
	"golisopod",
	"pinsir",
	"rapidash",
	"ninetales",
	"briochien",
	"lapras",
	"infernape",
	"clefairy",
]

// regular ol' for loops are the fastest loops
for (let index = 0; index < favouritePokemon.length; index++) {
	const element = favouritePokemon[index];
	console.log(element);
}

// foreach has improved DX but is slower than a regular for loop
favouritePokemon.forEach(pokemonName => {
	console.log(pokemonName);
});

console.log(favouritePokemon.length);
favouritePokemon.reverse();
console.log(favouritePokemon[0]);

let pokemonAllCaps = favouritePokemon.map((pokemonNameLowercase) => {
	return pokemonNameLowercase.toLocaleUpperCase();
});

favouritePokemon.push("mewtwo");
console.log(favouritePokemon.indexOf("bananas"));

console.log(pokemonAllCaps[0], favouritePokemon[0]);


let targetNumber = 1;
while (targetNumber < 10) {
	console.log(`Target number currently has value of ${targetNumber}`);
	targetNumber++;
	// if (targetNumber >= 10){
	// 	break;
	// }
}

do {
	console.log("dowhile says the target number is currently: " + targetNumber);
} while (targetNumber < 10);


// spread operator is "..." to work with array elements in a new array
let coolPokemon = ["mew", ...favouritePokemon];



//#endregion














