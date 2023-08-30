import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import route from 'ziggy-js';

interface InitialState {
  currentPage: string;
  hideSider: boolean;
  setCurrentPage: Dispatch<SetStateAction<String>>;
}
const initialState = {
  currentPage: '',
  setCurrentPage: page => {},
  hideSider: false,
  setHideSider: bool => {},
};
const StateContextPage = createContext(initialState);

export const ContextPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);

  const [hideSider, setHideSider] = useState(false);

  return (
    <StateContextPage.Provider
      value={{
        currentPage,
        setCurrentPage,
        hideSider,
        setHideSider,
      }}
    >
      {children}
    </StateContextPage.Provider>
  );
};
export const useStateContext = () => useContext(StateContextPage);
