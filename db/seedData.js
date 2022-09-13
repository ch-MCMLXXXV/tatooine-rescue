const { createUser, createDogs, createOrders } = require('./index');
const client = require('./client');

async function dropTables() {
	// drop all tables, in the correct order

	try {
		console.log('Starting to drop tables...');

		await client.query(`
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS dogs;
        DROP TABLE IF EXISTS users;
      `);
		console.log('Finished dropping tables!');
	} catch (error) {
		console.log('Error while dropping tables!');

		throw error;
	}
}

async function createTables() {
	console.log('Starting to build tables...');
	// create all tables, in the correct order
	try {
		await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            UNIQUE (username, email)
            );
            
        CREATE TABLE dogs(
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255)  NOT NULL,
            description VARCHAR(255) NOT NULL,
            adoption_fee INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            breed VARCHAR(255) NOT NULL,
            image TEXT,
            "isActive" BOOLEAN DEFAULT true
            );
                
        CREATE TABLE orders(
            id SERIAL PRIMARY KEY, 
            "userId" INTEGER REFERENCES users(id),
            "purchaseComplete" BOOLEAN DEFAULT false,
            "adoption_fee" INTEGER,
            "dogId" INTEGER REFERENCES dogs(id),
            quantity INTEGER NOT NULL
            );
                    
    `);
		console.log('Finished Building tables!');
	} catch (error) {
		console.log('Error constructing tables!');

		throw error;
	}
}

async function createInitialUsers() {
	console.log('Starting to create users...');
	try {
		const usersToCreate = [
			{
				username: 'eguilder0',
				first_name: 'Eleonora',
				last_name: 'Guilder',
				email: 'eguilder0@vinaora.com',
				password: 'xefxbiZ',
			},
			{
				username: 'sflea1',
				first_name: 'Shaylyn',
				last_name: 'Flea',
				email: 'sflea1@mlb.com',
				password: 'YaUH8Nte',
			},

			{
				username: 'acolam2',
				first_name: 'Arda',
				last_name: 'Colam',
				email: 'acolam2@washingtonpost.com',
				password: 'VxV1CAQoHjA',
			},

			{
				username: 'fspurnier3',
				first_name: 'Farrell',
				last_name: 'Spurnier',
				email: 'fspurnier3@cnet.com',
				password: 'Lt5CfVgtOBI',
			},
		];
		const users = await Promise.all(usersToCreate.map(createUser));

		console.log('Users created:');
		console.log(users);
		console.log('Finished creating users!');
	} catch (error) {
		console.error('Error creating users!');
		throw error;
	}
}

async function createInitialDogsTable() {
	console.log('Starting to create dogs...');
	try {
		const dogsToCreate = [
			{
				name: 'Yoda',
				description:
					'Tan Frenchy with the cutest side eye ever. Get your own little yoda to carry around.',
				adoption_fee: 100,
				quantity: 5,
				breed: 'French Bull Dog',
				image: 'https://unsplash.com/photos/oU6KZTXhuvk',
				isActive: true,
			},
			{
				name: 'Obi',
				description:
					'If you feel like you need your very own Jedi Master to guide you through life then this noble doggo is for you.',
				adoption_fee: 100,
				quantity: 11,
				breed: 'Samoyed',
				image: 'https://unsplash.com/photos/ybHtKz5He9Y',
				isActive: true,
			},
			{
				name: 'Luke',
				description:
					'Do not let this breed type intimidate you as this is the sweetest baby around.',
				adoption_fee: 100,
				quantity: 12,
				breed: 'Pit Bull Terrier',
				image: 'https://unsplash.com/photos/2pbnDRhXc6Q',
				isActive: true,
			},
			{
				name: 'Chewbacca',
				description:
					'Get your own big furry best friend to travel the galaxy with.',
				adoption_fee: 100,
				quantity: 6,
				breed: 'Goldendoodle',
				image: 'https://unsplash.com/photos/Ntm4C2lCWxQ',
				isActive: true,
			},
			{
				name: 'Leia',
				description:
					'Do not let that sweet face fool you as she has a heart of a fighter.',
				adoption_fee: 100,
				quantity: 5,
				breed: 'Tibetan Terrier',
				image: 'https://unsplash.com/photos/hjzs2nA4y-k',
				isActive: true,
			},
			{
				name: 'Han',
				description:
					'This handsome doggo is a suave partner in crime for all of your galaxy adventuring needs.',
				adoption_fee: 100,
				quantity: 2,
				breed: 'Shih Tzu',
				image: 'https://unsplash.com/photos/Qb7D1xw28Co',
				isActive: true,
			},
			{
				name: 'Boba Fett',
				description:
					'This little bounty hunter will steal your heart and your bounty.',
				adoption_fee: 100,
				quantity: 1,
				breed: 'Corgi',
				image: 'https://unsplash.com/photos/skDictKWID4',
				isActive: true,
			},
		];
		const dogs = await Promise.all(dogsToCreate.map(createDogs));

		console.log('Dogs created:');
		console.log(dogs);
		console.log('Finished creating dogs!');
	} catch (error) {
		console.error('Error creating dogs!');
		throw error;
	}
}

async function createInitialOrdersTable() {
	console.log('Starting to create order table!');
	try {
		const ordersToCreate = [
			{
				userId: 3,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 1,
				quantity: 2,
			},
			{
				userId: 1,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 1,
				quantity: 3,
			},
			{
				userId: 1,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 3,
				quantity: 1,
			},
			{
				userId: 2,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 7,
				quantity: 5,
			},
			{
				userId: 1,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 2,
				quantity: 1,
			},
			{
				userId: 2,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 6,
				quantity: 3,
			},
			{
				userId: 2,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 5,
				quantity: 1,
			},
			{
				userId: 4,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 3,
				quantity: 4,
			},
			{
				userId: 4,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 2,
				quantity: 1,
			},
			{
				userId: 4,
				purchaseComplete: false,
				adoption_fee: 100,
				dogId: 4,
				quantity: 1,
			},
		];
		const orders = await Promise.all(ordersToCreate.map(createOrders));

		console.log('Orders created:');
		console.log(orders);
		console.log('Finished creating orders!');
	} catch (error) {
		console.error('Error creating orders!');
		throw error;
	}
}

async function rebuildDB() {
	try {
		await dropTables();
		await createTables();
		await createInitialUsers();
		await createInitialDogsTable();
		await createInitialOrdersTable();
	} catch (error) {
		console.log('Error during rebuildDB');
		throw error;
	}
}

module.exports = {
	rebuildDB,
	dropTables,
	createTables,
};
