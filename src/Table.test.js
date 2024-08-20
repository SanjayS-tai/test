import {render,screen,fireEvent} from '@testing-library/react';
import Table from './Table';

test('should check table header is rendered properly', () => { 
    render (<Table/>)
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Job/i)).toBeInTheDocument();
    expect(screen.getByText(/Age/i)).toBeInTheDocument();
    expect(screen.getByText(/Score/i)).toBeInTheDocument();
 })

 test('adds a new row to table properly',()=>{
    render (<Table/>)
    fireEvent.click(screen.getByRole('button',{name:/add new row/i}))
    fireEvent.change(screen.getByPlaceholderText('Name'),{target:{value:'sanjay'}})
    fireEvent.change(screen.getByPlaceholderText('Age'),{target:{value:'21'}})
    fireEvent.change(screen.getByPlaceholderText('Job'),{target:{value:'SDE'}})
    fireEvent.change(screen.getByPlaceholderText('Score'),{target:{value:'90'}})

    expect(screen.getByPlaceholderText('Name').value).toBe('sanjay');
    expect(screen.getByPlaceholderText('Age').value).toBe('21');
    expect(screen.getByPlaceholderText('Job').value).toBe('SDE');
    expect(screen.getByPlaceholderText('Score').value).toBe('90');

    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('sanjay')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    expect(screen.getByText('SDE')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText('sanjay')).not.toBeInTheDocument();
 })




