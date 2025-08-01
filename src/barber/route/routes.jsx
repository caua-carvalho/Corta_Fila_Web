import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../screens/home';
import { useEffect } from 'react';

function BarberRoute() {
    // Simula que o usuário é barbeiro (isso deveria vir do backend ou contexto)
    sessionStorage.setItem('isBarber', true);
    const isBarber = sessionStorage.getItem('isBarber');
    const navigate = useNavigate();

    // Redireciona para login se não for barbeiro
    useEffect(() => {
        if (isBarber !== 'true') {
            navigate('/login');
        }
    }, [isBarber, navigate]);

    // Se não for barbeiro, não renderiza nada
    if (isBarber !== 'true') {
        return null;
    }

    return (
        <Routes>
            <Route path="/barber" element={<Home />} />
        </Routes>
    );
}

export default BarberRoute;