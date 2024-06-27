import React, { useState, ChangeEvent, FormEvent } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import { useForm } from '../../hooks/useForm';

function Form({ search_type }: FormProps) {
    
    const [values, handleInputChange] = useForm( {searchOwner: "", searchPet: ""} );
    const { searchOwner,  searchPet} = values;

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // disable button
        setIsButtonDisabled(true);

        if (!searchOwner && !searchPet) {
            // get all pets
            console.log('get all pets');
        } else if (searchOwner && !searchPet) {
            // get pets by owner
        } else if (!searchOwner && searchPet) {
            // get pets by name prefix
        }
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