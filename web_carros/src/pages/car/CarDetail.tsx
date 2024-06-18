import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import { useNavigate, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../../services/firebase";
import { Swiper, SwiperSlide } from 'swiper/react';

export function Car() {
    
type CarProps = {
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

    const { id } = useParams();
    const [car, setCar] = useState<CarProps | null>(null);
    const [sliderPreview, setSliderPreview] = useState<number>(1);
    const navigate = useNavigate();
    



    useEffect(() => {
        const showResize = () => {
            if (window.innerWidth < 720) {
                setSliderPreview(1);
            }else {
                setSliderPreview(sliderPreview);
            }
        }

        window.addEventListener('resize', showResize);

        return () => {
            window.removeEventListener('resize', showResize)

        }

    }, []);




    useEffect(() => {
        async function loadCar() {
            if (!id) {
                return;
            }

            const docRef = doc(db, "cars", id)

            getDoc(docRef)
            .then((snapshot) => {

                if(!snapshot.data()) {
                    alert('Carro não Existe')
                    navigate('/')
                }


                setCar({
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
                })
            })
            .catch(error => {
                alert(error + " Houve um erro na Renderização!");
            });

               
            
        }

        loadCar()

    }, [id]);





    return (
        <Container>
            {car && (
                <>
                    <Swiper
                        slidesPerView={sliderPreview}
                        pagination={{ clickable: true }}
                        navigation
                    >
                        {car.images.map((image) => (
                            <SwiperSlide key={image.id}>
                                <img 
                                    src={image.url} 
                                    className="w-full h-96 object-cover" 
                                    alt={car.name} 
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <main className="w-full bg-white rounded-lg p-6 my-4">
                        <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                            <h1 className="font-bold text-3xl text-black">{car.name}</h1>
                            <h2 className="font-bold text-3xl text-black">R$ {car.price}</h2>
                        </div>
                        
                        <p>{car.model}</p>
                        
                        <div className="flex w-full gap-6 my-4">
                            <section className="flex flex-col gap-4">
                                <div>
                                    <p>Cidade</p>
                                    <strong>{car.city}</strong>
                                </div>
                                <div>
                                    <p>Ano</p>
                                    <strong>{car.year}</strong>
                                </div>
                                <div>
                                    <p>Km</p>
                                    <strong>{car.km}</strong>
                                </div>
                            </section>
                            <section className="flex flex-col gap-4">
                                <div>
                                    <p>Km</p>
                                    <strong>{car.km}</strong>
                                </div>
                            </section>
                        </div>

                        <strong> Descrição: </strong>
                        <p>{car.description}</p>                

                        <strong>Telefone / Whatsapp</strong>
                        <a
                            href={`https://api.whatsapp.com/send?phone=${car.whatsapp}&text='Olá vi esse ${car.name} e fiquei interessado, gostaria de ver mais detalhes!!! '`}
                            target="_blank"
                            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 rounded-md text-2xl h-11 font-medium cursor-pointer"
                        > 
                            Conversar com o Vendedor 
                            <FaWhatsapp size={26}/>
                        </a>
                    </main>
                </>
            )}
        </Container>
    );
}
