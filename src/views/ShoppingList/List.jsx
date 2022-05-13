import React, { useState } from 'react'
import Item from '../../components/Items/Item';
import { useShoppingList } from '../../context/ShoppingListProvider';

export default function ShoppingList() {
  const [listItem, setListItem] = useState('');
  const { shoppingList, handleAddItem } = useShoppingList();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem(listItem);
    setListItem('');
  }

  return (
    <>
      <h2>Shopping List Items</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='Add new item'
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
        />
      <button>Add</button>
      </form>
      <ul>
        {shoppingList.map((item) => 
          <li key={`${item.id}`}>
            <Item item={item}/>
          </li>)}
      </ul>
    </>
  )
}
