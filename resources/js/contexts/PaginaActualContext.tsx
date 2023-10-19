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
  setCurrentPage: page => page,

  activeMenuItem: '',
  setActiveMenuItem: name => name,

  openMobileMenu: false,
  setOpenMobileMenu: bool => {
    return bool;
  },

  background: undefined,
  setBackground: el => {
    return el;
  },
};
const StateContextPage = createContext(initialState);

export const ContextPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);

  const [activeMenuItem, setActiveMenuItem] = useState(
    initialState.activeMenuItem,
  );

  const [background, setBackground] = useState(initialState.background);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <StateContextPage.Provider
      value={{
        currentPage,
        setCurrentPage,
        openMobileMenu,
        setOpenMobileMenu,
        activeMenuItem,
        setActiveMenuItem,
        background,
        setBackground,
      }}
    >
      {children}
    </StateContextPage.Provider>
  );
};
export const useStateContext = () => useContext(StateContextPage);
