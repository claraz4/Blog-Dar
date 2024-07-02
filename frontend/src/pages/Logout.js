import useLogout from "../hooks/useLogout"
import React from 'react';

export default function Logout() {
    const { logout } = useLogout();

    React.useEffect(() => {
        logout();
    }, []);
}