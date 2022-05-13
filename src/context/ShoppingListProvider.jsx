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

    case 'delete_item':
      return state.filter((item) => item.id !== action.payload.id)

    default:
      throw new Error(`Action type ${action.type} has not been defined in ShoppingListProvider`)
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

  const handleDeleteItem = (id) => {
    dispatch({ type: 'delete_item', payload: { id }})
  }



  return (
    <ShoppingListContext.Provider
    value={{ shoppingList, handleAddItem, handleUpdateItem, handleDeleteItem }}>
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

