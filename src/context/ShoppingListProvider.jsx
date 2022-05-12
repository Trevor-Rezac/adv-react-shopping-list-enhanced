import { createContext, useContext } from 'react';

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {

  return (
    <ShoppingListContext.Provider
    value={{}}>
      {children}
    </ShoppingListContext.Provider>
  )
}

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);

  if(context === undefined) {
    throw new Error('useShoppingList must be called within a ShoppingListProvider');
  }

  return context;
}

