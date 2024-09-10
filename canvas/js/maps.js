/*
 * File: maps.js
 * Details background and objects of maps
 * Each map corresponds to route or town
 */
const sample_env = {
	tiles: [
		'ice',
		'water',
		'poison',
		'electric',
		'rock',
		'ground',
		'force',
		'grass',
		'dragon',
		'fire',
		'psychic',
		'ghost',
		'snow',
		'pavement',
		'planks',
		'bricks',
		'dirt',
		'molten-rock'
	],
	objects: [
		'boulder',
		'tall-grass',
		'step-stone',
		'fire-rock',
		'flower',
		'tree',
		'ice-rock'
	],
	map: [
		'ice', 'ice', 'ice', 'ice', 'ice', 'ice',
		'water', 'water', 'water', 'water', 'water', 'water',
		'ice', 'ice', 'ice', 'ice', 'ice', 'ice',
		'water', 'water', 'water', 'water', 'water', 'water',
		'ice', 'ice', 'ice', 'ice', 'ice', 'ice',
		'water', 'water', 'water', 'water', 'water', 'water',

		'poison', 'poison', 'poison', 'poison', 'poison', 'poison',
		'electric', 'electric', 'electric', 'electric', 'electric', 'electric',
		'poison', 'poison', 'poison', 'poison', 'poison', 'poison',
		'electric', 'electric', 'electric', 'electric', 'electric', 'electric',
		'poison', 'poison', 'poison', 'poison', 'poison', 'poison',
		'electric', 'electric', 'electric', 'electric', 'electric', 'electric',

		'rock', 'rock', 'rock', 'rock', 'rock', 'rock',
		'ground', 'ground', 'ground', 'ground', 'ground', 'ground',
		'rock', 'rock', 'rock', 'rock', 'rock', 'rock',
		'ground', 'ground', 'ground', 'ground', 'ground', 'ground',
		'rock', 'rock', 'rock', 'rock', 'rock', 'rock',
		'ground', 'ground', 'ground', 'ground', 'ground', 'ground',

		'force', 'force', 'force', 'force', 'force', 'force',
		'grass', 'grass', 'grass', 'grass', 'grass', 'grass',
		'force', 'force', 'force', 'force', 'force', 'force',
		'grass', 'grass', 'grass', 'grass', 'grass', 'grass',
		'force', 'force', 'force', 'force', 'force', 'force',
		'grass', 'grass', 'grass', 'grass', 'grass', 'grass',

		'dragon', 'dragon', 'dragon', 'dragon', 'dragon', 'dragon',
		'fire', 'fire', 'fire', 'fire', 'fire', 'fire',
		'dragon', 'dragon', 'dragon', 'dragon', 'dragon', 'dragon',
		'fire', 'fire', 'fire', 'fire', 'fire', 'fire',
		'dragon', 'dragon', 'dragon', 'dragon', 'dragon', 'dragon',
		'fire', 'fire', 'fire', 'fire', 'fire', 'fire',

		'psychic', 'psychic', 'psychic', 'psychic', 'psychic', 'psychic',
		'ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost',
		'psychic', 'psychic', 'psychic', 'psychic', 'psychic', 'psychic',
		'ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost',
		'psychic', 'psychic', 'psychic', 'psychic', 'psychic', 'psychic',
		'ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost',

		'snow', 'snow', 'snow', 'snow', 'snow', 'snow', 'pavement', 'pavement', 'pavement', 'pavement', 'pavement', 'pavement',
		'snow', 'snow', 'snow', 'snow', 'snow', 'snow', 'pavement', 'pavement', 'pavement', 'pavement', 'pavement', 'pavement',
		'snow', 'snow', 'snow', 'snow', 'snow', 'snow', 'pavement', 'pavement', 'pavement', 'pavement', 'pavement', 'pavement',

		'planks', 'planks', 'planks', 'planks', 'planks', 'planks', 'bricks', 'bricks', 'bricks', 'bricks', 'bricks', 'bricks',
		'planks', 'planks', 'planks', 'planks', 'planks', 'planks', 'bricks', 'bricks', 'bricks', 'bricks', 'bricks', 'bricks',
		'planks', 'planks', 'planks', 'planks', 'planks', 'planks', 'bricks', 'bricks', 'bricks', 'bricks', 'bricks', 'bricks',

		'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock',
		'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock',
		'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock', 'molten-rock'
	],
	ground: {}
}

// map functions

export default { sample1: sample_env }
