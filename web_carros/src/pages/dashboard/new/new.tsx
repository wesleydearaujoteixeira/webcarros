import Container from "../../../components/container/Container";
import PanelHeader from "../../../components/panelHeader/PanelHeader";
import {FiTrash, FiUpload} from 'react-icons/fi';
import { Inputs } from "../../../components/inputs/Inputs";
import {z} from 'zod';
import { zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { v4 as uuidV4} from "uuid";
import { storage, db } from "../../../services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


import {
    ref, 
    uploadBytes,
    getDownloadURL,
    deleteObject,

} from 'firebase/storage';



const schema = z.object({
    name: z.string().min(1, " O nome é obrigatório"),
    model: z.string().min(1, "O modelo é obrigatório "),
    year: z.string().min(1, "O ano do carro é Obrigatório"),
    km: z.string().min(1, " O Km tbm é obrigatório"),
    price: z.string().min(1, " O preço é obrigatório "),
    city: z.string().min(1, "A Cidade é obrigatória"),
    whatsapp: z.string().min(1, " O campo do whatsapp também  é obrigatório").refine((value) => /^\d{10,11}$/.test(value), {
        message: "Número de telefone inválido"
    }),

    description: z.string().min(1, " A descrição é Obrigatória")
});


type FormData = z.infer<typeof schema>;


function New() {


    type ImageProps = {
        uid: string, 
        name: string,
        previewUrl: string,
        url: string,
    }



    const { user } = useContext(AuthContext);

    const {register, handleSubmit, formState: {errors}, reset } = useForm <FormData> ({
        resolver: zodResolver(schema),
        mode: "onChange"
    });
    



    
    const [CarImages, setCarImages] = useState<ImageProps[]>([]);
    const navigate = useNavigate();


    function Submited (data: FormData) {

        if(CarImages.length <= 0) {
            alert(" Você precisa enviar a foto de um carro antes de prosseguir");
            return;
        }


        const carListImages = CarImages.map(car => {

            return {
                uid: car.uid,
                name: car.name,
                url: car.url,
            }
        });

        addDoc(collection(db, "cars"), {
            name: data.name.toUpperCase(),
            model: data.model,
            year: data.year,
            km: data.km,
            price: data.price,
            city: data.city,
            whatsapp: data.whatsapp,
            description: data.description,
            created: new Date(),
            owner: user?.name,
            uid: user?.uid,
            images: carListImages

        }).then(() => {
            reset();
            setCarImages([]);
            alert('Cadastrado!');
            navigate('/');
            

        })
        .catch (err => {
            console.log(" erro ao cadastrar carro ", err);
        })




        
    }


   const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        
        if(e.target.files && e.target.files[0]) {
            const images = e.target.files[0];
            

            if(images.type === 'image/jpeg' || images.type === 'image/png') {
                await handleUpload(images);
            }
            else {
                alert(' Não é possivel enviar imagens de outro formato');
                return;
            }
        }
    }

    async function handleUpload (image: File) {

        if(!user?.uid) {
            return;
        }

        const currentUid = user?.uid;
        const uidImage = uuidV4();

        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

        uploadBytes(uploadRef, image)
        .then((snapShot) => {
            getDownloadURL(snapShot.ref).then((downloadUrL) => {
                
                const imageObject = {

                    uid:currentUid,
                    name: uidImage,
                    previewUrl: URL.createObjectURL(image),
                    url: downloadUrL,

                }

                setCarImages([...CarImages, imageObject]);



            
            })
        })


    }


    const deleteImg = async (item: ImageProps ) => {


        const imagePath = `images/${item.uid}/${item.name}`;

        const imageRef = ref(storage, imagePath);

        try{
            await deleteObject(imageRef);
            
        const newImages = CarImages.filter(img => img.name !==  item.name);
        setCarImages(newImages)

        }catch(err){
            console.log(err);
            return;

        }



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
                        <input 
                        className="opacity-0 cursor-pointer" 
                        type="file"   
                        onChange={(e) => handleFile(e)} 
                        accept="image/*" />
                    </div>
                </button>

                {CarImages.map((img) => {
                    return (
                        <div key={img.name} 
                            className="w-full h-32 flex items-center justify-center relative"
                        >
                            <button className="absolute" onClick={() => deleteImg(img)}>
                                <FiTrash size={30} color="#fff"/>
                            </button>

                            <img src={img.previewUrl} className="w-full rounded-lg object-cover h-32 " />
                        </div>
                    )
                })}

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