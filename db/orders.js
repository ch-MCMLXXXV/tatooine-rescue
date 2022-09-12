const client = require('./client');

async function createOrders({
	userId,
	purchaseComplete,
	adoption_fee,
	dogId,
	quantity,
}) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        INSERT INTO orders ("userId", "purchaseComplete", adoption_fee, "dogId", quantity)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `,
			[userId, purchaseComplete, adoption_fee, dogId, quantity]
		);
		return order;
	} catch (error) {
		throw error;
	}
}

async function updateOrderQuantity({ id, quantity }) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        UPDATE orders
        SET quantity=$1
        WHERE id=$2
        RETURNING *;
        `,
			[quantity, id]
		);
		return order;
	} catch (error) {
		throw error;
	}
}

async function getAllOrdersByUserId({ userId }) {
	try {
		const { rows: orders } = await client.query(
			`
        SELECT orders.*, users.username
        FROM orders
        JOIN users ON orders."userId" = users.id 
        WHERE "userId" = $1;
        `,
			[userId]
		);
		return orders;
	} catch (error) {
		throw error;
	}
}

async function getAllCompletedOrdersByUserId({ userId }) {
	try {
		const { rows: orders } = await client.query(
			`
        SELECT *
        FROM orders
        WHERE "userId" = $1     AND 
        "purchaseComplete" = true;
        `,
			[userId]
		);

		return orders;
	} catch (error) {
		throw error;
	}
}

async function getOrderById(id) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        SELECT * 
        FROM orders
        WHERE id = $1;
        `,
			[id]
		);
		return order;
	} catch (error) {
		throw error;
	}
}

async function getUsersCart(userId) {
	try {
		const { rows: cart } = await client.query(
			`
        SELECT orders.id AS "orderId", orders.quantity AS "orderQuantity", dogs.name, dogs.image, dogs.adoption_fee, dogs."quantity"
        FROM orders
        JOIN orders ON orders."dogId" = dogs.id
        WHERE "userId" = $1 AND "purchaseComplete" = false;
        `,
			[userId]
		);
		return cart;
	} catch (error) {
		throw error;
	}
}

async function deleteUsersCart(userId) {
	try {
		const { rows: cart } = await client.query(
			`
        DELETE FROM orders
        WHERE "userId" = $1 AND 
        "purchaseComplete" = false;     
        `,
			[userId]
		);
		return cart;
	} catch (error) {
		throw error;
	}
}

async function deleteOrder(orderId) {
	try {
		const { rows: order } = await client.query(
			` 
        DELETE FROM orders 
        WHERE id=$1 
        RETURNING *;
        `,
			[orderId]
		);
		return order;
	} catch (error) {
		throw error;
	}
}

async function getAllOrdersAsAdmin({ userId }) {
	try {
		const { rows: orders } = await client.query(
			`
        SELECT *
        FROM orders
        WHERE "purchaseComplete" = true;
        `,
			[userId]
		);
		return orders;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createOrders,
	updateOrderQuantity,
	getAllOrdersByUserId,
	getOrderById,
	getUsersCart,
	deleteOrder,
	getAllOrdersAsAdmin,
	deleteUsersCart,
	getAllCompletedOrdersByUserId,
};
