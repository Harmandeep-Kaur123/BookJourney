import {createContext,useContext,useEffect,useState, useCallback} from "react";
import authService from "../services/auth.service";
import {getToken, removeToken, setToken } from "../utils/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const token = getToken();

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await authService.getCurrentUser();

                setUser(response.data);
            } catch (error) {
                removeToken();
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    const login = useCallback(async (credentials) => {
        const response = await authService.login(credentials);

        setToken(response.data.token);
        setUser(response.data.user);

        return response;
    }, []);

    const register = useCallback(async (userData) => {
        return authService.register(userData);
    }, []);

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
    }, []);

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
}