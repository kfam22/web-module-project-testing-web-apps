import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    // the header h1 element exists. Include three asserts, if the header is in the document, if the heads is truthy, if the header has the correct test content
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText('First Name*');
    userEvent.type(firstName, 'al');

    const errormsg = await screen.findAllByTestId('error');
    expect(errormsg).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const clickSubmit = screen.getByRole('button');
    userEvent.click(clickSubmit);
    
    const errormsg = await screen.findAllByTestId('error');
    expect(errormsg).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText('First Name*');
    userEvent.type(firstName, 'kayla');

    const lastName = screen.getByLabelText('Last Name*');
    userEvent.type(lastName, 'famurewa');

    const clickSubmit = screen.getByRole('button');
    userEvent.click(clickSubmit);

    const errormsg = await screen.findAllByTestId('error');
    expect(errormsg).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const email = screen.getByLabelText('Email*');
    userEvent.type(email, 'kayla.famurewa');

    const errormsg = await screen.findByTestId('error');
    expect(errormsg).toBeInTheDocument;


});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const clickSubmit = screen.getByRole('button');
    userEvent.click(clickSubmit);

    const errormsg = await screen.findByText(/email must be a valid email address/i);
    expect(errormsg).toBeInTheDocument;
});

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
// });

// test('renders all fields text when all fields are submitted.', async () => {
// });