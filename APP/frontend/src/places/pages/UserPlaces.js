import React from 'react';
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList';

const UserPlaces = () =>{

    const PLACES = [
        {
            id: 'p1',
            title: 'Empire State Building',
            description: 'One of the most famous sky scrapers on the world',
            image: 'https://i.wpimg.pl/O/644x429/d.wpimg.pl/373718206-1567976705/empire-state-building.jpg',
            address: '20 W 34th St, New York, NY 10001, Stany Zjednoczone',
            coordinates: {
                lat: 40.7484405,
                lot:-73.9878531
            },
            creator: 'u1',
        },
        {
            id: 'p1',
            title: 'Warsaw Spire',
            description: 'One of the most famous office building in Warsaw',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Warsaw_Spire%2C_Poland_22_June_2016.jpg/1200px-Warsaw_Spire%2C_Poland_22_June_2016.jpg',
            address: 'plac Europejski 1, 2 i 6, Warszawa',
            coordinates: {
                lat: 52.2322584,
                lot: 20.9820807
            },
            creator: 'u2',
        }
    ];

    const userId = useParams().userId;

    const loadedPlaces = PLACES.filter(place => place.creator === userId);

    return <PlaceList items={loadedPlaces}/>
};

export default UserPlaces;