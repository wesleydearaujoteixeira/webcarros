import {RegisterOptions, UseFormRegister} from 'react-hook-form'



type Props = {
    name: string, 
    type: string,
    placeholder: string,
    register: UseFormRegister<any>,
    error?: string, 
    rules?: RegisterOptions
}

export function Inputs ( {name, type, placeholder, register, error, rules}: Props) {


    return (
        <>
            <input
                className= "mb-3 p-3 rounded-md w-full"
                placeholder={placeholder}
                type={type}
                {...register(name, rules)}
                id={name}
            />

            {error && <p className='my-2 text-xl text-red-600'> {error} </p>}

        </>
    )
}