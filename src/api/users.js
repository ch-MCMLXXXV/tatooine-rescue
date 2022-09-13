const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { createUser, getUser, getUserByUsername } = require('../db');

usersRouter.use((req, res, next) => {
   console.log('A request is being made to /users');

   next();
});

usersRouter.get('/', async (req, res) => {
   const user = await getUser();
   res.send({
      user,
   });
});

usersRouter.post('/Login', async (req, res, next) => {
   const { username, password } = req.body;

   if (!username || !password) {
      next({
         name: 'MissingCredentialsError',
         message: 'Please enter both username and password',
      });
   }
   try {
      const user = await getUserByUsername(username);

      if (user && user.password === password) {
         const token = jwt.sign(user, process.env.JWT_SECRET);
         res.send({ message: "You're logged in!", token });
      } else {
         next({
            name: 'IncorrectCredentialsError',
            message: 'Username or password incorrect',
         });
      }
   } catch (error) {
      console.log(error);
      next(error);
   }
});

usersRouter.post('Register', async (req, res, next) => {
   const { username, password, email } = req.body;

   try {
      const _user = await getUserByUsername(username);

      if (_user) {
         next({
            name: 'UserExistsError',
            message: 'A user with that username already exists',
         });
      }

      const user = await createUser({ username, password, email });

      const token = jwt.sign(
         {
            id: user.id,
            username,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: '1w',
         }
      );

      res.send({
         message: 'thank you for signing up',
         token,
      });
   } catch ({ name, message }) {
      next({ name, message });
   }
});

module.exports = usersRouter;
