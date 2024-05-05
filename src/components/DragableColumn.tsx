import { Box, GridItem, Heading } from '@chakra-ui/react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FC } from 'react';
import { Todo } from '../types/interface';


interface Props {
  todos: Todo[] | [];
  columnTitle: string;
}

export const DraggableColumn: FC<Props> = ({ todos, columnTitle }) => {
  return (
    <GridItem borderRadius="md" bg="white" w="100%" p={2}>
      <Heading as="h2" mb={'2'}>
        {columnTitle}
      </Heading>
      <Droppable droppableId={columnTitle} type="group">
        {(provided) => (
          <Box h={'370px'} overflowY={'scroll'} {...provided.droppableProps} ref={provided.innerRef}>
            {todos?.map((todo, index) => {
              return (
                <Draggable draggableId={todo.id.toString()} key={todo.id} index={index}>
                  {(provided) => (
                    <Box
                      data-testid="custom-element"
                      textAlign={'left'}
                      backgroundColor={'teal'}
                      mb={'2'}
                      borderRadius="md"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      p={2}
                    >
                      <Heading as="h3" size={'m'} mb={2}>
                        {todo.title}
                      </Heading>
                      <p>{todo.body} </p>
                    </Box>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </GridItem>
  );
};