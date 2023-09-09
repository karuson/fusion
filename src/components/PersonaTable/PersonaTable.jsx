import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconCheck, IconX } from '@tabler/icons-react';


// Mantine
import {
  Button, Container, Flex, MultiSelect, Table, Text
 } from '@mantine/core'
import { notifications } from '@mantine/notifications'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PersonaTable(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  

  const [heading, setHeading] = useState(`Personas`);
  const personas = useSelector((store) => store.personas);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_PERSONAS' });
  }, [dispatch]);

  const handleClick = (persona) => {
    dispatch({ type: 'ADD_TO_PARTY', payload: persona })
    notifications.show({
      title: 'Nice Click!',
      message: 'Added to party',
      color: 'pink',
      icon: <IconCheck />,
      autoClose: 5000,
    })
    dispatch({ type: 'FETCH_PERSONAS'})
  }

    const rows = personas.map((persona) => (
      <tr key={persona.id}>
        <td>{persona.lvl}</td>
        <td>{persona.name}</td>
        <td>{persona.race}</td>
        <td><Button onClick={() => handleClick(persona)}>Add</Button></td>
      </tr>
    ));

  return (
    <Container>
      <Text>{heading}</Text>
      <Flex
      mih={50}
      gap="xs"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >
          <MultiSelect
      data={[
        'Chariot', 'Death', 'Devil', 'Emperor', 'Empress', 'Fool', 
        'Fortune', 'Hanged', 'Hermit', 'Hierophant', 'Judgement', 
        'Justice', 'Lovers', 'Magician', 'Moon', 'Preistess', 
        'Star', 'Strength', 'Sun', 'Temperance', 'Tower'
      ]}
      label="Narrow Results"
      placeholder="Select Arcana"
      clearButtonProps={{ 'aria-label': 'Clear selection' }}
      clearable
      searchable
    />
      <Button>Sort</Button>
      </Flex>
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Level</th>
          <th>Name</th>
          <th>Arcana</th>
          <th>Add to Party</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </Container>
  );
}

export default PersonaTable;