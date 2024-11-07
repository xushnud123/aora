import { App } from "@/lib";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: (e: User | null) => void;
}
const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

export interface User {
  username: string;
  email: string;
  password: string;
  $id: string;
  avatar: string;
}

const GlobalProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | any>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    App.getCurrentUser()
      .then((data: any) => {
        if (data) {
          setIsLoggedIn(true);

          setUser(data);
        } else {
          setIsLoggedIn(false);
          setUser({});
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        setUser,
        setIsLoading,
        setIsLoggedIn,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
