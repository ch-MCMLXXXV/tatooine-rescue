const client = require('./client');

async function createDogs({
	name,
	description,
	adoption_fee,
	quantity,
	breed,
	image,
	isActive,
}) {
	try {
		const {
			rows: [dogs],
		} = await client.query(
			`
        INSERT INTO dogs (name, description, adoption_fee, quantity, breed, image, "isActive")
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
			[name, description, adoption_fee, quantity, breed, image, isActive]
		);
		console.log(dogs);
		return dogs;
	} catch (error) {
		throw error;
	}
}

async function getAllDogs() {
	try {
		const { rows: dogs } = await client.query(`
        SELECT *
        FROM dogs
        `);
		return dogs;
	} catch (error) {
		throw error;
	}
}

async function getDogsById(id) {
	try {
		const {
			rows: [dogs],
		} = await client.query(
			`
        SELECT * FROM dogs
        WHERE id = $1
        `,
			[id]
		);
		return dogs;
	} catch (error) {
		throw error;
	}
}

async function getDogsByBreed(breed) {
	try {
		const { rows: dogs } = await client.query(
			`
        SELECT *
        FROM dogs
        WHERE breed = $1
        `,
			[breed]
		);
		return dogs;
	} catch {}
}

async function updateDogs({ name, adoption_fee, quantity, breed, image, id }) {
	try {
		const { rows: dogs } = await client.query(
			`
            UPDATE dogs
            SET name = $1,  
            adoption_fee= $2, 
            quantity = $3, 
            breed = $4, image = $5
            WHERE id = $6;
        `,
			[name, adoption_fee, quantity, breed, image, id]
		);
		return dogs;
	} catch {}
}

module.exports = {
	createDogs,
	getAllDogs,
	getDogsById,
	getDogsByBreed,
	updateDogs,
};
