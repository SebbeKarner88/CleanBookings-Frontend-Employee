import React, { createContext, ReactNode, useState } from 'react';

interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    employeeId: string;
    setEmployeeId: React.Dispatch<React.SetStateAction<string>>;
    role: string,
    setRole: React.Dispatch<React.SetStateAction<string>>;
}

const defaultAuthContext: IAuthContext = {
    isAuthenticated: false,
    setIsAuthenticated: () => {
    },
    employeeId: "",
    setEmployeeId: () => {
    },
    role: "",
    setRole: () => {
    }
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ employeeId, setEmployeeId ] = useState("");
    const [ role, setRole ] = useState("");

    const authContextValue = {
        isAuthenticated,
        setIsAuthenticated,
        employeeId: employeeId,
        setEmployeeId: setEmployeeId,
        role: role,
        setRole: setRole
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
