const { Client } = require('pg');

const DB_NAME = 'capstone';

const client = new Client({
	connectionString:
		process.env.DATABASE_URL || `postgres://localhost:3001/${DB_NAME}`,
	ssl:
		process.env.NODE_ENV === 'production'
			? { rejectUnauthorized: false }
			: undefined,
});

module.exports = {
	client,
};
