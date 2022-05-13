import { createContext, useContext, useReducer } from 'react';

const initialShoppingList = [];

const listReducer = (state, action) => {
  switch (action.type) {
    case 'add_item':
      return [
        { id: Date.now(), text: action.payload.text, completed: false }, 
        ...state,
      ];
    case 'update_item':
      return state.map((item) => {
        if (item.id === action.payload.item.id) {
          const { completed, text } = action.payload.item;

          return {
            ...item,
            completed,
            text,
          };
        }

        return item;
      });
  }
}

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, dispatch] = useReducer(listReducer, initialShoppingList);

  const handleAddItem = (text) => {
    dispatch({ type: 'add_item', payload: { text } });
  }

  const handleUpdateItem = (item) => {
    dispatch({ type: 'update_item', payload: { item }})
  }

  return (
    <ShoppingListContext.Provider
    value={{ shoppingList, handleAddItem, handleUpdateItem }}>
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

