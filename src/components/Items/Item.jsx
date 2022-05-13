import React from 'react';
import { useState } from 'react';

export default function Item({ item, handleUpdateItem }) {
  const [isEditing, setIsEditing] = useState(false);

  let itemView;

  if (isEditing) {
    itemView = (
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditing(false)
        }}>
        <input 
          type='text'
          placeholder='Edit Item'
          value={item.text}
          onChange={(e) => {
            handleUpdateItem({
              ...item,
              text: e.target.value
            })
          }}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  } else {
    itemView = (
      <>
        <p>
          {item.text}
        </p>
        <button 
          onClick={(e) => setIsEditing(true)}
        >
          Edit
        </button>
      </>
    )
  }

  return (
    <div>
      {itemView}
      <button>Delete</button>
    </div>
  )
}
