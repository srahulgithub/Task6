import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { User } from '../models/User';

interface Props {
  user?: User;
  onSubmit: (user: User) => void;
}

const UserForm: React.FC<Props> = ({ user, onSubmit }) => {
  const [name, setName] = useState(user?.name || '');
  const [country, setCountry] = useState(user?.country || '');
  const [annualIncome, setAnnualIncome] = useState(user?.annualIncome || 0);
  const [emailIdsList, setEmailIdsList] = useState(
    user?.emailIdsList?.join(', ') || ''
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: User = {
      id: user?.id,
      name,
      country,
      annualIncome,
      emailIdsList: emailIdsList.split(',').map((email) => email.trim()),
    };

    onSubmit(newUser);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
<Form.Control
type="text"
value={country}
onChange={(event) => setCountry(event.target.value)}
/>
</Form.Group>
<Form.Group controlId="annualIncome">
<Form.Label>Annual Income</Form.Label>
<Form.Control
type="number"
value={annualIncome}
onChange={(event) => setAnnualIncome(parseFloat(event.target.value))}
/>
</Form.Group>
<Form.Group controlId="emailIdsList">
<Form.Label>Emails (comma separated)</Form.Label>
<Form.Control
type="text"
value={emailIdsList}
onChange={(event) => setEmailIdsList(event.target.value)}
/>
</Form.Group>
<Button type="submit">Save</Button>
    </Form>
  );
};

export default UserForm;