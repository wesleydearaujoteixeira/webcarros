import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiUser } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function Header() {

    const {signed, loadingAuth} = useContext(AuthContext);


    return ( 
        
        <div className='w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4'>
            <header className='flex w-full max-w-7xl items-center justify-between px-4 mx-auto'>
                    <Link to='/'>
                        <img src={logoImg} alt="" />
                    </Link>


                {loadingAuth == true && signed && (
                    <Link to='/dashboard'>
                        <div className='border-2 rounded-full p-1 border-gray-900'>
                            <FiUser size={24} color="#000" />
                        </div>
                    </Link>
                )}

                {loadingAuth == true && !signed && (
                    <Link to='/login'>
                        <FiLogIn size={24} color="#000" />
                    </Link>
                )}

                
            </header>
        </div>
     );
}

export default Header;