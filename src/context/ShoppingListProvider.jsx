import { createContext, useContext, useReducer } from 'react';

const initialShoppingList = [];

const listReducer = (state, action) => {
  switch (action.type) {
    case 'add_item':
      return [
        { id: Date.now(), text: action.payload.text, completed: false }, 
        ...state,
      ];
  }
}

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, dispatch] = useReducer(listReducer, initialShoppingList);

  const handleAddItem = (text) => {
    dispatch({ type: 'add_item', payload: { text } });
  }

  return (
    <ShoppingListContext.Provider
    value={{ shoppingList, handleAddItem }}>
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

