import React, { useEffect } from 'react';

const Home = ({ setDogs, setDogsToDisplay }) => {
    useEffect(() => {
        const fetchAllDogs = async () => {
            const response = await fetch (URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            setDogs(result.data.dogs);
            setDogsToDisplay(result.data.dogs)
        };
        fetchAllDogs()
    }, );

    return (
            <div>
                <header>
                    <h1>Home Page</h1>
                </header>
                <h2>Dogs For Adoptions</h2>
                {
                    dogs.map(post => <div key={dogs._id}>
                        <h3>{dogs._name}</h3>
                        <div>{dogs.description}</div>
                        <div>{dogs.breed}</div>
                        <div>{dogs.image_url}</div>
                        <div>{dogs.adoption_fee}</div>
                    </div>)
                }
    
                
            </div>
        )
}

export default Home