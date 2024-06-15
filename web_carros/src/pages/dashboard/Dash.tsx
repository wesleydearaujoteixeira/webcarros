import { useEffect, useState, useContext } from "react";
import Container from "../../components/container/Contaniner";
import PanelHeader from "../../components/panelHeader/PanelHeader";
import { FiTrash2 } from "react-icons/fi";
import {collection, getDocs, where,  query, deleteDoc, doc } from 'firebase/firestore';
import {db} from '../../services/firebase';
import {AuthContext} from '../../context/AuthContext';
import { Link } from "react-router-dom";


type CarsProps = {
   id: string;
   name: string,
   year: string,
   price: string | number,
   city: string,
   km: string,
   images: ImgCollection[],
   uid: string

}

type ImgCollection = {
   id: string,
   uid: string,
   url: string
}


export function Dash() {


   const [cars, setCars] = useState<CarsProps[]>([]);

   const { user } =  useContext(AuthContext);



   useEffect(() =>  {

      function loadCars() {

         if(!user?.uid) {
            return;
         }

         const refQuery = collection(db, "cars");
         const refCars = query(refQuery, where("uid", "==", user.uid))


          getDocs(refCars)           
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
              console.log(listagem);
          });
      }

      loadCars();
  }, [user]);


  const handleDelete = async (idx: string) => {


   const docRef = doc(db, "cars", idx);
   await deleteDoc(docRef);

   const newIndex = cars.findIndex((item) => item.id == idx);
   cars.splice(newIndex, 1);
   setCars([...cars]);
  }


    return ( 
        <Container>
           <PanelHeader/>
            <main className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

               {cars.map((cars) => {
                  return (
                     <Link to="/dashboard">
                           
                        <section className="w-full mt-2 bg-white rounded-lg relative">

                     <button 
                     onClick={() => handleDelete(cars.id)}
                     className="absolute right-2">
                        <FiTrash2 size={30} color="#fff" />
                     </button>


                     <img 
                     className="w-full rounded-lg mb-2 max-h-70"
                     src={cars.images[0].url} alt="" />

                     <p className="font-bold mt-1 px-2 mb-2"> {cars.name} </p>               
                     <div className="flex flex-col px-2 ">
                        <span className="text-zinc-700">
                           Ano {cars.year} | {cars.km} km 
                        </span>
                        <strong className="font-bold text-3xl mt-4 text-black">
                           R$ {cars.price}
                        </strong>
                     </div> 

                     <div className="w-full h-px bg-slate-200 my-2">
                     </div>

                     <div className="px-2 pb-2">
                        <span className="text-black">
                           {cars.city}
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

