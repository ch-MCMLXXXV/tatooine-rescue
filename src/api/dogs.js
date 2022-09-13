const express = require('express');
const { requireUser } = require('./utils');
const dogsRouter = express.Router();
const {
   createDogs,
   getAllDogs,
   getDogsById,
   getDogsByBreed,
   updateDogs,
} = require('../db');

dogsRouter.use((req, res, next) => {
   console.log('A request is being made to /dogs');

   next();
});

dogsRouter.get('/', (req, res, next) => {
   try {
      const allDogs = getAllDogs();

      const dogs = allDogs.filter((dog) => {
         if (dog.isActive) {
            return true;
         }

         return false;
      });
      res.send({
         dogs,
      });
   } catch ({ name, message }) {
      next({ name, message });
   }
});

dogsRouter.post('/', requireUser, async (req, res, next) => {
   const { name, adoption_fee, quantity, breed, image, description } =
      req.body;
   const dogData = {
      id: req.user.id,
      name,
      description,
      breed,
      image,
      adoption_fee,
      quantity,
   };

   try {
      const dog = await createDogs(dogData);
      res.send({ dog });
   } catch ({ name, message }) {
      next({ name, message });
   }
});

dogsRouter.patch('/:dogId', requireUser, async (req, res, next) => {
   const { dogId } = req.params;
   const { name, adoption_fee, quantity, breed, image } = req.body;

   const updateFields = {};

   if (name) {
      updateFields.name = name;
   }
   if (breed) {
      updateFields.breed = breed;
   }
   if (image) {
      updateFields.image = image;
   }
   if (quantity) {
      updateFields.quantity = quantity;
   }
   if (adoption_fee) {
      updateFields.adoption_fee = adoption_fee;
   }

   try {
      const originalDog = getDogsById(dogId);

      if (originalDog.user.id === req.user.id) {
         const updatedDog = await updateDogs(dogId, updateFields);
         res.send({ dog: updatedDog });
      } else {
         next({
            name: 'UnauthorizedUserError',
            message: 'You can not update a dog that is not yours',
         });
      }
   } catch ({ name, message }) {
      next({ name, message });
   }
});
