const client = require('./client');
const bcrypt = require('bcrypt');

// used to add a new user with hashed password to database
async function createUser({ username, password }) {
	//hash password before storing to DB

	try {
		const SALT_COUNT = 10;
		const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

		const {
			rows: [user],
		} = await client.query(
			`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING *;
        `,
			[username, hashedPassword]
		);
		delete user.password;
		return user;
	} catch (error) {
		console.error('Problem creating user...', error);
	}
}

// verifies existing user and compares password to hashed password
async function getUser({ username, password }) {
	try {
		const user = await getUserByUsername(username);
		const hashedPassword = user.password;
		const passwordsMatch = await bcrypt.compare(password, hashedPassword);
		if (passwordsMatch) {
			const {
				rows: [user],
			} = await client.query(
				`
                SELECT *
                FROM users
                WHERE username = $1
                AND password = $2;
            `,
				[username, hashedPassword]
			);
			delete user.password;
			return user;
		} else {
			throw new Error('Passwords did not match...');
		}
	} catch (error) {
		console.error('Problem getting user...', error);
	}
}

// used as helper function when user object needed
async function getUserById(id) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
            SELECT *
            FROM users
            WHERE id = $1;
        `,
			[id]
		);
		delete user.password;
		return user;
	} catch (error) {
		console.error('Problem get user by id...', error);
	}
}

// used as helper function when user object needed
async function getUserByUsername(username) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
            SELECT *
            FROM users
            WHERE username = $1;
        `,
			[username]
		);
		return user;
	} catch (error) {
		console.error('Problem get user by username...', error);
	}
}

module.exports = {
	createUser,
	getUser,
	getUserById,
	getUserByUsername,
};
