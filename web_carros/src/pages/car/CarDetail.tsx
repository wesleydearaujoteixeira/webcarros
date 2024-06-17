import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import {getDoc, doc} from 'firebase/firestore';
import { db } from "../../services/firebase";


interface CarProps  {
    id: string, 
    name: string,
    year: string,
    city: string,
    km: string,
    images: CarsImg[],
    uid: string,
    description: string,
    created: string,
    price: string | number,
    owner: string,
    whatsapp: string,
    model: string
}

interface CarsImg  {
    id: string,
    uid: string,
    url: string 
}




export function Car() {


    

    const {id} = useParams();

    const [cars, setCars] = useState <CarProps[]> ([]);



    useEffect(() => {

        async  function loadCar() {

            if(!id) {
                return;
            }
            
            const docRef = doc(db, "cars", id);

            getDoc(docRef)
            .then((snapshot) => {
                
             setCars({

                    id: snapshot.id,
                    name: snapshot.data()?.name,
                    year: snapshot.data()?.year,
                    city: snapshot.data()?.city,
                    price: snapshot.data()?.price,
                    km: snapshot.data()?.km,
                    images: snapshot.data()?.images,
                    uid: snapshot.data()?.uid,
                    description: snapshot.data()?.description,
                    created: snapshot.data()?.created,
                    owner: snapshot.data()?.owner,
                    whatsapp: snapshot.data()?.whatsapp, 
                    model: snapshot.data()?.model


                });
            });
        }

        loadCar();
    }, [id]);


return (

    <Container>
        {cars && 
            <main className="w-full bg-white rounded-lg p-6 my-4">
                <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                    <h1 className="font-bold text-3xl text-black"> {cars?.name} </h1>
                    <h2 className="font-bold text-3xl text-black"> R$ {cars?.price} </h2>
                </div>
                
                <p>{cars?.model}</p>
                
                <div className="flex w-full gap-6 my-4">

                    <section className="flex flex-col gap-4">
                        <div>
                            <p> Cidade </p>
                            <strong> {cars?.city} </strong>
                        </div>
                        <div>
                            <p> Ano </p>
                            <strong> {cars?.year} </strong>
                        </div>

                        <div>
                            <p> Km </p>
                            <strong> {cars?.km} </strong>
                        </div>
            
                    </section>
                    <section className="flex flex-col gap-4">
                        <div>
                            <p> Km </p>
                            <strong> {cars?.km} </strong>
                        </div>
                    </section>
                    
                </div>

                <strong> Descrição: </strong>
                <p> {cars?.description} </p>                


                <strong>
                    Telefone / Whatsapp
                </strong>

                <a
                    className="bg-green-500 w-full text-white flex items-center justify-center gap-4 my-6 rounded-md text-3xl h-11 font-medium cursor-pointer"
                > 
                    Conversar com o Vendedor 

                    <FaWhatsapp size={26}/>

                </a>


            </main>
                      
        }
    </Container>
    
)
}