import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate fetching user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signIn = (email, password) => {
        const userData = { email }; // Simulated user data
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const signUp = (formData) => {
        const userData = { email: formData.email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('id');
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
