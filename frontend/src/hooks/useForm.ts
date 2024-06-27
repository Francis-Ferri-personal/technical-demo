import { useState, ChangeEvent } from "react";

type InitialStateType = {
    [key: string]: any; // Define the structure of your initial state here
}

export const useForm = (initialState: InitialStateType = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    
    return [values, handleInputChange, reset] as const;
};
