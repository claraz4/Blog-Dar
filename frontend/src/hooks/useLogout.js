import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {

        // remove user from storage
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate("/");
    }

    return { logout };
}