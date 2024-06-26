import {useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import logoimg from '../../assets/logo.svg';
import Container from '../../components/container/Container';
import { Inputs } from '../../components/inputs/Inputs';
import {useForm} from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {auth} from '../../services/firebase';
import { signInWithEmailAndPassword, signOut} from 'firebase/auth';




const schema = z.object({
    email: z.string().email(" Insira um email válido ").min(1),
    password: z.string().nonempty("insira uma senha válida")

})

type FormData = z.infer <typeof schema>


export function Login() {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    useEffect(() => {
        async function handleLogOut () {
            await signOut(auth)
        }

        handleLogOut();
    }, [])


    const Submit = (data: FormData) => {
        signInWithEmailAndPassword(auth, data.email, data.password)

        .then((user) => {
            console.log("Usuário Logado")
            console.log(user)
            navigate('/dashboard')
        })

        .catch(err => {
            console.log(" Erra ");
            console.log(err);
        })
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


                <Link to='/register'>
                    Ainda não possui uma conta? Cadastre-se
                </Link>
                
            </div>
        </Container>
     );
}

