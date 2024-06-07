import Container from "../../../components/container/Contaniner";
import PanelHeader from "../../../components/panelHeader/PanelHeader";
import {FiUpload} from 'react-icons/fi';
import { Inputs } from "../../../components/inputs/Inputs";
import {z} from 'zod';
import { zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const schema = z.object({
    name: z.string().min(1, " O nome é obrigatório"),
    model: z.string().min(1, "O modelo é obrigatório "),
    year: z.string().min(1, "O ano do carro é Obrigatório"),
    km: z.string().min(1, " O Km tbm é obrigatório"),
    price: z.string().min(1, " O preço é obrigatório "),
    city: z.string().min(1, "A Cidade é obrigatória"),
    whatsapp: z.string().min(1, " O campo do whatsapp também  é obrigatório").refine((value) => /^\d{9,11}$/.test(value), {
        message: "Número de telefone inválido"
    }),

    description: z.string().min(1, " A descrição é Obrigatória")
});


type FormData = z.infer<typeof schema>;


function New() {



    const {register, handleSubmit, formState: {errors}, reset } = useForm <FormData> ({
        resolver: zodResolver(schema),
        mode: "onChange"
    })


    function Submited (data: FormData) {
        console.log(data);
    }


    return ( 
        <Container>
            <PanelHeader/>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 ">
                <button className="border-2  rounded-lg flex  items-center justify-center cursor-pointer border-gray-600 h-32 md: w-48 ">
                    
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000"/>
                    </div>

                    <div className="cursor-pointer">
                        <input className="opacity-0 cursor-pointer" type="file" accept="image/*" />
                    </div>
                </button>
            </div>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                
                <form 
                className="w-full" 
                onSubmit={handleSubmit(Submited)}
                >

                    <div className="mb-3">
                    <p className="mb-2 font-bold"> Nome do Carro </p>
                        <Inputs
                            name="name"
                            type="text"
                            register={register}
                            placeholder="Digite o nome do carro"
                            error={errors.name?.message}
                        />
                    </div>

                    <div className="mb-3">
                    <p className="mb-2 font-bold"> Modelo </p>
                        <Inputs
                            name="model"
                            type="text"
                            register={register}
                            placeholder=" Ex: 1.0 felx PLUS MANUAL... "
                            error={errors.model?.message}
                        />
                    </div>

                    <section className="flex w-full mb-3 flex-row items-center  gap-4">

                    <div className="w-full">
                    <p className="mb-2 font-bold"> Ano </p>
                        <Inputs
                            name="year"
                            type="text"
                            register={register}
                            placeholder=" Ex: 2024 "
                            error={errors.year?.message}
                        />
                    </div>

                    <div className="w-full">
                    <p className="mb-2 font-bold"> Km rodados </p>
                        <Inputs
                            name="km"
                            type="text"
                            register={register}
                            placeholder=" Ex: 13km/L "
                            error={errors.km?.message}
                        />
                    </div>


                    </section>

                    <section className="flex w-full mb-3 flex-row items-center  gap-4">

                    <div className="w-full">
                    <p className="mb-2 font-bold"> Telefone para Contato </p>
                        <Inputs
                            name="whatsapp"
                            type="text"
                            register={register}
                            placeholder=" Ex: 01198342392 "
                            error={errors.whatsapp?.message}
                        />
                    </div>

                    <div className="w-full">
                    <p className="mb-2 font-bold"> Cidade </p>
                        <Inputs
                            name="city"
                            type="text"
                            register={register}
                            placeholder=" Ex: São Paulo - SP"
                            error={errors.city?.message}
                        />
                    </div>
                    </section>

                  
                    <div className="w-full">
                    <p className="mb-2 font-bold"> Preço </p>
                        <Inputs
                            name="price"
                            type="text"
                            register={register}
                            placeholder=" Ex: R$ 50.000"
                            error={errors.price?.message}
                        />
                    </div>
                    <div className="w-full">

                    <p className="mb-2 font-bold"> Descrição  </p>
                      <textarea 
                        className="border-2 w-full rounded-md h-24 px-2 "
                        id="description"
                        {...register("description")}
                        name="description" 
                        placeholder=" Digite a descrição do seu carro... "
                      >
                        
                      </textarea>
                    </div>

                    <button 
                    type="submit"
                    className="rounded-md bg-zinc-900 text-white font-medium mb-3 w-full text-2xl h-10"
                    >
                        Cadastrar 
                    </button>

                </form>


            </div>

        </Container>
    )
}

export default New;