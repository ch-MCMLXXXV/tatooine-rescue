import React from "react";

const Dog = ({dogs}) => {
    return (
        <div className="dog">
            <p><b>Dog #{dogs.id}</b></p>;
            <p>Name: {dogs._name}</p>;
            <p>Description: {dogs.description}</p>
            <p>Breed: {dogs.breed}</p>
            <p>Image: {dogs.image_url}</p>
            <p>Adoption Fee: {dogs.adoption_fee}</p>
        </div>
    )
}

export default Dog