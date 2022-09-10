const client = require('./client');
const { rebuildDB } = require('./seedData');

rebuildDB()
	.catch(console.error)
	.finally(() => client.end());
