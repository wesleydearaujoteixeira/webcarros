import { Link } from 'react-router-dom';
import logoimg from '../../assets/logo.svg';
import Container from '../../components/container/Contaniner';
import { Inputs } from '../../components/inputs/Inputs';
import {useForm} from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';


const schema = z.object({

    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email(" Insira um email válido ").min(1),
    password: z.string().min(6, "A senha deve ter no mínimo 6 carácteres ")

})

type FormData = z.infer <typeof schema>


export function Register() {

    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({

        resolver: zodResolver(schema),
        mode: "onChange"
    
    });

    const Submit = (data: FormData) => {
        console.log(data);
    }

    return ( 
        <Container>
            <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
                <Link to='/' className='mb-6 max-w-sm w-full'>
                    <img src={logoimg} 
                        alt="Logo do Site" 
                        className='w-full hover:scale-110 transition-all'
                    />
                </Link>

                <form 
                onSubmit={handleSubmit(Submit)}
                className='bg-white max-w-xl h-30 w-full rounded-lg flex flex-col p-4 hover: border-blue-500'>

                        <Inputs
                            name='name'
                            placeholder="Digite seu nome"
                            type="text"
                            error={errors.name?.message}
                            register={register}
                        />


                        <Inputs
                            name='email'
                            placeholder="Digite seu email"
                            type="email"
                            error={errors.email?.message}
                            register={register}
                        />

                        <Inputs
                            name='password'
                            placeholder="Digite sua senha"
                            type="password"
                            error={errors.password?.message}
                            register={register}
                        />

                    <button type='submit' className='bg-zinc-900 w-full rounded-md text-white text-2xl py-2'> Enviar </button>
                </form>

                <Link to='/login'>
                    Já possui uma conta? faça login
                </Link>

            </div>
        </Container>
     );
}

