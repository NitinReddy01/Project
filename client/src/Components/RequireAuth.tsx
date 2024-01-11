import { useAuth } from '../Hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation().pathname;
    return (
        auth?.username ? <Outlet /> : <Navigate to='/login' state={{from:location}} replace={true}  />
    );
}
export default RequireAuth;
