/* =============== IMPORTS =============== */
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";

/* =============== USE AUTH HOOK =============== */
export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  /* =============== REGISTER USER HANDLER =============== */
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      // SENDING REGISTER REQUEST
      const data = await register({ username, email, password });

      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =============== LOGIN USER HANDLER =============== */
  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      // SENDING LOGIN REQUEST
      const data = await login({ email, password });

      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =============== LOGOUT USER HANDLER =============== */
  const handleLogout = async () => {
    setLoading(true);

    try {
      // SENDING LOGOUT REQUEST
      await logout();

      setUser(null);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =============== FETCHING AUTHENTICATED USER =============== */
  useEffect(() => {
    const getAndSetUser = async () => {
      // FETCHING CURRENT LOGGED IN USER
      const data = await getMe();

      setUser(data.user);
      setLoading(false);
    };

    getAndSetUser();
  }, []);

  /* =============== RETURNING AUTH VALUES =============== */
  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
