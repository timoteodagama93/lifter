import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import route from 'ziggy-js';
import { account_links } from '../assets/constants';

interface InitialState {
  currentPage: string;
  hideSider: boolean;
  setCurrentPage: Dispatch<SetStateAction<String>>;
}
const initialState = {
  currentPage: <></>,
  setCurrentPage: page => {page},
  openMobileMenu: false,
  setOpenMobileMenu: bool => {},
};
const StateContextPage = createContext(initialState);

export const ContextPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <StateContextPage.Provider
      value={{
        currentPage,
        setCurrentPage,
        openMobileMenu,
        setOpenMobileMenu,
      }}
    >
      {children}
    </StateContextPage.Provider>
  );
};
export const useStateContext = () => useContext(StateContextPage);
