import Header from './components/Header/Header';
import ShoppingList from './views/ShoppingList/List';
import { ShoppingListProvider } from './context/ShoppingListProvider';

export default function App() {
  return (
    <>
      <ShoppingListProvider>
        <Header />
        <ShoppingList />
      </ShoppingListProvider>  
    </>
  );
}
