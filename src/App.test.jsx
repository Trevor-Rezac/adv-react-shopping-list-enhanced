import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { ShoppingListProvider } from './context/ShoppingListProvider';

describe('App tests', () => {
  it('should be a passing test', async () => {
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
})
