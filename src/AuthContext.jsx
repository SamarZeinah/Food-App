// import { jwtDecode } from "jwt-decode";
// import React, { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthContextProvider({ children }) {
//     const [adminData, setAdminData] = useState(null);

//     const fillAdminData = () => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             const decoded = jwtDecode(token);
//             setAdminData(decoded);
//         }
//     };

//     useEffect(() => {
//         if (localStorage.getItem("token")) {
//             fillAdminData();
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{ adminData, fillAdminData }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuthContext() {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("No AuthContext found");
//     }
//     return context;
// }
import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(() => {
        let token = localStorage.getItem('token');
        return token ? jwtDecode(token) : null;
    });

    const saveLoginData = () => {
        const encodedToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoginData(null);
    };

    return (
        <AuthContext.Provider value={{ loginData, saveLoginData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
