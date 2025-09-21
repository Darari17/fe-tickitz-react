import { useDispatch } from "react-redux";
import { useLocalStorage } from "../hook/useLocalStorage";
import { AuthContext } from "./AuthContext";
import { setLogin } from "../store/slices/authSlice";

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const dispatch = useDispatch();

  const register = (newUser) => {
    if (users.find((u) => u.email === newUser.email)) {
      throw new Error("email sudah terdaftar");
    }
    setUsers([...users, newUser]);
  };

  const login = ({ email, password }) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      throw new Error("email atau password salah!");
    }
    setCurrentUser({ email: found.email });
    dispatch(setLogin(true));
  };

  const logout = () => {
    setCurrentUser(null);
    dispatch(setLogin(false));
  };

  const forgotPassword = (email) => {
    const found = users.find((u) => u.email === email);
    if (!found) {
      throw new Error("email tidak ditemukan!");
    }
    return `Reset link dikirim ke ${email} (simulasi)`;
  };

  return (
    <AuthContext.Provider
      value={{ users, currentUser, register, login, logout, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
