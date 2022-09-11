const client = require('./client');
const bcrypt = require('bcrypt');

// used to add a new user with hashed password to database
async function createUser({
	username,
	first_name,
	last_name,
	email,
	password,
}) {
	//hash password before storing to DB

	try {
		const SALT_COUNT = 10;
		const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

		const {
			rows: [user],
		} = await client.query(
			`
            INSERT INTO users (username, first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4, $5)
			ON CONFLICT (username, email) DO NOTHING 
            RETURNING id, username, email;
        `,
			[username, first_name, last_name, email, hashedPassword]
		);
		delete user.password;
		return user;
	} catch (error) {
		console.error('Problem creating user...', error);
	}
}

async function editEmail({ email, userId }) {
	try {
		const {
			rows: [newEmail],
		} = await client.query(
			`
	  UPDATE users
	  SET email=$1
	  WHERE id=$2
	  RETURNING id, username, email;
	  `,
			[email, userId]
		);
		return newEmail;
	} catch (error) {
		throw error;
	}
}

// verifies existing user and compares password to hashed password
async function getUser({ username, password }) {
	if (!username || !password) {
		return;
	}

	try {
		const user = await getUserByUsername(username);
		if (!user) return;

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
async function getUserById(userId) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
	  SELECT id, username, email, "isAdmin"
	  FROM users
	  WHERE id = $1;
	  `,
			[userId]
		);

		if (!user) return null;
		delete user.password;
		return user;
	} catch (error) {
		console.error('Problem get user by id...', error);
	}
}

// used as helper function when user object needed
async function getUserByUsername(userName) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
	  SELECT id, username, password, email
	  FROM users
	  WHERE username = $1;
	  `,
			[userName]
		);

		if (!user) return null;
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
	editEmail,
};
