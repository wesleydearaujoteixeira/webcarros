import Container from "../../components/container/Contaniner";

export function Home() {
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
                
                <section className="w-full bg-white rounded-lg">
                    <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src="https://s2-autoesporte.glbimg.com/AD-Zmic9Id3pFylnmirMPJPqJXM=/0x0:1200x725/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/Y/Q/GDvW7QSNeaQ801rDC8Rg/hrv-movimentdianteira.jpg" 
                    alt="Carro" 
                    />

                    <p className="font-bold mt-1 mb-2 px-2"> BMW 320i</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6"> 2016/ 2016 23.000 km </span>
                        <strong className="text-black font-medium text-2xl"> 190.000.000 R$ </strong>
                    </div>
                        <div className="w-full h-px bg-slate-700"></div>

                        <div className="px-2 pb-2">
                            <span className="text-black">
                                Campo Grande - MS
                            </span>
                        </div>
                </section>

                <section className="w-full bg-white rounded-lg">
                    <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src="https://s2-autoesporte.glbimg.com/AD-Zmic9Id3pFylnmirMPJPqJXM=/0x0:1200x725/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/Y/Q/GDvW7QSNeaQ801rDC8Rg/hrv-movimentdianteira.jpg" 
                    alt="Carro" 
                    />

                    <p className="font-bold mt-1 mb-2 px-2"> BMW 320i</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6"> 2016/ 2016 23.000 km </span>
                        <strong className="text-black font-medium text-2xl"> 190.000.000 R$ </strong>
                    </div>
                        <div className="w-full h-px bg-slate-700"></div>

                        <div className="px-2 pb-2">
                            <span className="text-black">
                                Campo Grande - MS
                            </span>
                        </div>
                </section>

                <section className="w-full bg-white rounded-lg">
                    <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src="https://s2-autoesporte.glbimg.com/AD-Zmic9Id3pFylnmirMPJPqJXM=/0x0:1200x725/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/Y/Q/GDvW7QSNeaQ801rDC8Rg/hrv-movimentdianteira.jpg" 
                    alt="Carro" 
                    />

                    <p className="font-bold mt-1 mb-2 px-2"> BMW 320i</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6"> 2016/ 2016 23.000 km </span>
                        <strong className="text-black font-medium text-2xl"> 190.000.000 R$ </strong>
                    </div>
                        <div className="w-full h-px bg-slate-700"></div>

                        <div className="px-2 pb-2">
                            <span className="text-black">
                                Campo Grande - MS
                            </span>
                        </div>
                </section>
            </main>

        </Container>
     );
}