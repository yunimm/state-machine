import { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext();


export const NavigationProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Basics-toggle");

  const changeActiveItem = useCallback((newItem) => {
    setActiveItem(newItem);
  }, [activeItem]);

  return (
    <NavigationContext.Provider value={{ activeItem, changeActiveItem }}>
      {children}
    </NavigationContext.Provider>
  );
};

// PropTypes 驗證
NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useNavigation() {
  return useContext(NavigationContext);
}
