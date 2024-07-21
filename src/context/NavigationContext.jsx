import { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext();


export const NavigationProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Basics-toggle");

  const changeActiveItem = useCallback((newItem) => {
    // 這裡可以添加任何額外的邏輯，例如驗證或日誌記錄
    console.log(`Changing active item from ${activeItem} to ${newItem}`);
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
