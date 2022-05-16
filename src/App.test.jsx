import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { ShoppingListProvider } from './context/ShoppingListProvider';

describe('App tests', () => {
  it('should test that user can add an item, which is then displayed in the list, and test that the user can delete the item', async () => {
    render(
        <App />
    )
    
    //tests that the header is present
    const appHeader = screen.getByText(/Total Items:/i)
    expect(appHeader).toBeInTheDocument();
    
    //tests that the title is present
    const mainTitle = screen.getByText(/Shopping List Items/i);
    expect(mainTitle).toBeInTheDocument();
    
    //tests the user typing into the item input field then pressing "enter" to submit
    //if not typing {enter} after the text in the input field, I would need to use a fireEvent to submit the form
    const itemInput = screen.getByPlaceholderText('Add new item');
    userEvent.type(itemInput, 'food{enter}');
    
    //confirms that one item with text 'food' appears on page after user submits form
    const newItem = await screen.findAllByText('food');
    expect(newItem.length).toBe(1);
    
    //confirms the delete button is present after adding an item
    const deleteBtn = await screen.findByRole('button', { name: 'Delete'});

    //user clicks the delete button
    userEvent.click(deleteBtn);

    //this confirms the item 'food' is no longer present on the screen
    const deletedItem = screen.queryAllByText('food');
    expect(deletedItem.length).toBe(0);
    
  })

  it('should test a user adding multiple items and a list displaying with all items', async () => {
    render(
      <App />
  )

    //this confirms the item input is on the page
    //tests the user adding three items to the list
    const itemInput = screen.getByPlaceholderText('Add new item');
    userEvent.type(itemInput, 'food{enter}');
    userEvent.type(itemInput, 'water{enter}');
    userEvent.type(itemInput, 'stamps{enter}');

    //tests that the three items do appear on the screen
    const listItems = await screen.findAllByRole('listitem')
    expect(listItems.length).toEqual(3);
  })

  it('should test a user adding an item then editing that item', async () => {
    render(
      <App />
  )

    //this confirms the item input is on the page
    //tests the user adding three items to the list
    const itemInput = screen.getByPlaceholderText('Add new item');
    userEvent.type(itemInput, 'food{enter}');

    //this confirms the item appears on the page
    const initialItem = screen.getByText('food');
    expect(initialItem).toBeInTheDocument();
    
    //this tests that the edit button is present with the listed item
    const editBtn = await screen.findByRole('button', { name: 'Edit'})
    
    //user clicks the edit button and the edit input is present
    userEvent.click(editBtn);
    const editInput = await screen.findByPlaceholderText('Edit Item');
    editInput.value = '';
    
    //user updates the item to water and presses enter
    userEvent.type(editInput, 'water{enter}');
    screen.debug();
    
    //tests that the updated item is present on the screen
    const updatedItem = screen.queryAllByText('water');
    console.log('updatedItem.length', updatedItem.length)
    expect(updatedItem.length).toEqual(1);
  })
})
