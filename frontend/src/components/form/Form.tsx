import React, { useState, ChangeEvent, FormEvent } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import { useForm } from '../../hooks/useForm';
import { fetchRequest } from '../../helpers/fetch';

interface Pet {
    _id: string;
    name: string;
    owner: string;
    breed: string;
    sex: string;
    height: number;
    weight: number;
}

interface ApiResponse {
    pets: Pet[];
}

function Form({ search_type }: FormProps) {
    
    const [values, handleInputChange] = useForm( {searchOwner: "", searchPet: ""} );
    const { searchOwner,  searchPet} = values;

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // disable button
        setIsButtonDisabled(true);

        let body: ApiResponse;

        if (!searchOwner && !searchPet) {
            // get all pets
            const resp = await fetchRequest("pets");
			body = await resp.json();
        } else if (searchOwner && !searchPet) {
            // get pets by owner
            const resp = await fetchRequest(`pets/search/${searchOwner}`);
			body = await resp.json();
        } else (!searchOwner && searchPet) {
            // get pets by name prefix
            const resp = await fetchRequest(`pets/search?namePrefix=${searchPet}`);
			body = await resp.json();
        }
        const pets: Pet[] = body.pets;
        setIsButtonDisabled(false);
        
    };

    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Search for {search_type}</h3>
            <h4>Search by owner</h4>
            <input 
                type="text"
                name="searchOwner"
                value={searchOwner}
                onChange={handleInputChange}
                disabled={searchPet}
                />

            <h4>Search by name prefix</h4>
            <input 
                type="text"
                name="searchPet"
                value={searchPet}
                onChange={handleInputChange}
                disabled={searchOwner}
            />
            <button type='submit' disabled={isButtonDisabled}>Search</button>
        </form>
    )
}

interface FormProps {
    search_type: string;
}

// Form.propTypes = {
//     search_type: PropTypes.func.isRequired
// };

export {Form};