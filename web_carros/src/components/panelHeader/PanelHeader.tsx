import {Link} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';


function PanelHeader() {

    const handleLogOut = async () => {
        await signOut(auth);
    }

    return (
        <div className='w-full h-10 gap-5 text-white font-medium flex items-center bg-red-500 rounded-lg px-4'>
            <Link to="/dashboard">
                Dashboard
            </Link>

            <Link to="/dashboard/new">
                Cadastrar novo Carro 
            </Link>

            <button className='ml-auto' onClick={handleLogOut}>
                Sair da conta
            </button>
        </div>
      );
}

export default PanelHeader;