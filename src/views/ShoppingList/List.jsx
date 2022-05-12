import React, { useState } from 'react'
import Item from '../../components/Items/Item';

export default function ShoppingList() {
  const [listItem, setListItem] = useState('');

  return (
    <>
      <h2>Shopping List Items</h2>
      <form>
        <input 
          type='text'
          placeholder='Add new item'
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
        />
      <button>Add</button>
      </form>
      <ul>
        <Item />
      </ul>
    </>
  )
}
