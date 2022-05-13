import React from 'react'
import { useShoppingList } from '../../context/ShoppingListProvider'

export default function Header() {
  const { shoppingList } = useShoppingList();

  return (
    <div>Total Items: {shoppingList.length}</div>
  )
}
