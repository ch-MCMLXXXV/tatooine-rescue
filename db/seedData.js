const { createUser } = require('./');
const client = require('./client');

async function dropTables() {
	// drop all tables, in the correct order

	try {
		console.log('Starting to drop tables...');

		await client.query(`
        DROP TABLE IF EXISTS routine_activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS activities;
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
        id INT,
        username VARCHAR(50),
	    first_name VARCHAR(50),
	    last_name VARCHAR(50),
	    email VARCHAR(50),
	    password VARCHAR(50)
      );
     
    `);
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

async function rebuildDB() {
	try {
		await dropTables();
		await createTables();
		await createInitialUsers();
		// await createInitialActivities();
		// await createInitialRoutines();
		// await createInitialRoutineActivities();
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
