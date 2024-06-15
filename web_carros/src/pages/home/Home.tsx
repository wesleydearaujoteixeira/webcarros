import Container from "../../components/container/Contaniner";
import {useState, useEffect} from 'react';
import { db } from '../../services/firebase';
import { collection, query, getDocs, orderBy} from 'firebase/firestore';
import { Link } from "react-router-dom";


type CarsProps = {
    id: string,
    name: string,
    year: string,
    uid: string,
    price: string | number,
    city: string,
    km: string,
    images: CarsImages[]
}


type CarsImages = {
    name: string,
    uid: string,
    url: string
}


export function Home() {

    const [cars, setCars] = useState<CarsProps[]>([]);

    const [loadImages, setLoadImages] = useState<string[]>([]);

    useEffect(() =>  {
        function loadCars() {
            const carsRef = collection(db, "cars");
            const queryRef = query(carsRef, orderBy("created", "desc"))


            getDocs(queryRef)           
            .then((snapshot) => {

                const listagem = [] as CarsProps[]

                snapshot.forEach((doc) => {

                    listagem.push({
                        id: doc.id,
                        name: doc.data().name,
                        year: doc.data().year,
                        km: doc.data().km,
                        city: doc.data().city,
                        price: doc.data().price,
                        images: doc.data().images,
                        uid: doc.data().uid,
                    })

                });

                setCars(listagem);
            });
        }

        loadCars();
    }, [])

   const handleImageLoad = (id: string) => {
    setLoadImages((loadingImages) => {
        return [...loadingImages, id]
    });
   }


    return ( 
        <Container>
            <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto gap-2 flex justify-center items-center">
                <input 
                className="w-full border-2 rounded-lg h-9 px-3"
                placeholder="Digite o nome do carro..."/>
                <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg ">
                    Buscar 
                </button>
            </section>

            <h1 className="font-bold text-center mt-6 text-3xl mb-4"> Carros novos e usados em todo o Brasil </h1>
        
            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((item) => {
                    return (
                        <Link to={`/car/${item.id}`} key={item.id}> 
                            <section className="w-full bg-white rounded-lg">
                                <div 
                                className="w-full h-72 bg-slate-200"
                                style={{display: loadImages.includes(item.id) ? 'none' : 'block'}}>
                                
                                
                                </div>
                                <img 
                                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"

                                src={item.images[0].url} 

                                alt="Carro"
                                onLoad={() => handleImageLoad(item.id) } 

                                />
            
                                <p className="font-bold mt-1 mb-2 px-2"> {item.name} </p>
            
                                <div className="flex flex-col px-2">
                                    <span className="text-zinc-700 mb-6"> {item.year} {item.km} km </span>
                                    <strong className="text-black font-medium text-2xl"> {item.price} R$ </strong>
                                </div>
                                    <div className="w-full h-px bg-slate-700"></div>
            
                                    <div className="px-2 pb-2">
                                        <span className="text-black">
                                            {item.city}
                                        </span>
                                    </div>
                            </section>
                        </Link>
                   
                    )
                })}
              
            </main>

        </Container>
     );
}