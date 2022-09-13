const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
   const prefix = 'Bearer ';
   const auth = req.header('Authorization');

   if (!auth) {
      next();
   } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
         const { id } = jwt.verify(token, JWT_SECRET);

         if (id) {
            req.user = await getUserById(id);
            next();
         }
      } catch ({ name, message }) {
         next({ name, message });
      }
   } else {
      next({
         name: 'AuthorizationHeaderError',
         message: `Authorization token must start with ${prefix}`,
      });
   }
});

apiRouter.use((req, res, next) => {
   if (req.user) {
      console.log('User is set', req.user);
   }

   next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const dogsRouter = require('./dogs');
apiRouter.use('/dogs', dogsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

apiRouter.use((error, req, res, next) => {
   res.send({
      name: error.name,
      message: error.message,
   });
});

module.exports = apiRouter;

// export const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api";

// export async function registerUser({ username, password }) {
// 	try {
// 		return fetch(`${BASE_URL}/users/register`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				username: username,
// 				password: password,
// 			}),
// 		})
// 			.then((response) => response.json())
// 			.then((result) => {
// 				return result;
// 			});
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// export async function loginUser({ username, password }) {
// 	try {
// 		return fetch(`${BASE_URL}/dogs/login`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				username: username,
// 				password: password,
// 			}),
// 		})
// 			.then((response) => response.json())
// 			.then((result) => {
// 				localStorage.setItem("token", result.token);
// 				return result;
// 			});
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// export async function fetchAllDogs() {
// 	try {
// 		return fetch(`${BASE_URL}/dogs`, {
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		})
// 			.then((response) => response.json())
// 			.then((result) => {
// 				return result;
// 			});
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// export async function createDog ({ token, name, description, breed, image, adoption_fee }) {
// 	try {
// 		return fetch (`${BASE_URL}/dogs`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`,
// 			},
// 			body: JSON.stringify({
// 				name: name,
// 				description: description,
// 				breed: breed,
// 				image: image,
// 				adoption_fee: adoption_fee
// 			}),
// 		})
// 		.then((response) => response.json())
// 		.then((result) => {
// 			return result;
// 		});
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// export async function editDog ({ token, dogsId, name, description, breed, image, adoption_fee }) {
// 	try {
// 		return fetch (`${BASE_URL}/dogs/${dogsId}`, {
// 			method: "PATCH",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Authorization": `Beaer ${token}`
// 			},
// 			body: JSON.stringify ({
// 				name: name,
// 				description: description,
// 				breed: breed,
// 				image: image,
// 				adoption_fee: adoption_fee
// 			})
// 		})
// 		.then((response) => response.json())
// 		.then((result) => {
// 			return result;
// 		});
// 	}
// 	catch (error) {
// 		console.error(error);
// 	}
// }

// export async function deleteDog ({ token, dogsId }) {
// 	try {
// 		return fetch (`${BASE_URL}/dogs/${dogsId}`, {
// 			method: "DELETE",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Authorization": `Bearer ${token}`
// 			}
// 		})
// 		.then((response) => response.json())
// 		.then((result) => {
// 			return result;
// 		});
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
