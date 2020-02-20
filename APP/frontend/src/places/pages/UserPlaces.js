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
            title: 'Empire State Building',
            description: 'One of the most famous sky scrapers on the world',
            image: 'https://i.wpimg.pl/O/644x429/d.wpimg.pl/373718206-1567976705/empire-state-building.jpg',
            address: '20 W 34th St, New York, NY 10001, Stany Zjednoczone',
            coordinates: {
                lat: 40.7484405,
                lot:-73.9878531
            },
            creator: 'u2',
        }
    ];

    const userId = useParams().userId;

    const loadedPlaces = PLACES.filter(place => place.creator === userId);

    return <PlaceList items={loadedPlaces}/>
};

export default UserPlaces;