const { Pool } = require('pg');

const connectionString =
	process.env.DATABASE_URL || 'https://localhost:5432/tatooine_rescue-dev';

const client = new Pool({
	connectionString,
	ssl:
		process.env.NODE_ENV === 'production'
			? { rejectUnauthorized: false }
			: undefined,
});

module.exports = client;
