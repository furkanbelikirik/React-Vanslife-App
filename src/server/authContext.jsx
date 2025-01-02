import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("loggedin"),
	);

	const login = () => {
		localStorage.setItem("loggedin", true);
		setIsLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem("loggedin");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
