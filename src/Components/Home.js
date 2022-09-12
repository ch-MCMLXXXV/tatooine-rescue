import React, { useEffect } from 'react';

const Home = ({ setDogs, setDogsToDisplay }) => {
	useEffect(() => {
		const fetchAllDogs = async () => {
			const response = await fetch(URL, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			setDogs(result.data.dogs);
			setDogsToDisplay(result.data.dogs);
		};
		fetchAllDogs();
	});

	return (
		<div>
			<header>
				<h1>Home Page</h1>
			</header>
			<h2>Dogs For Adoptions</h2>
			{dogs.map((dog) => (
				<div key={dog._id}>
					<h3>{dog.name}</h3>
					<div>{dog.description}</div>
					<div>{dog.breed}</div>
					<div>{dog.image}</div>
					<div>{dog.adoption_fee}</div>
				</div>
			))}
		</div>
	);
};

export default Home;
