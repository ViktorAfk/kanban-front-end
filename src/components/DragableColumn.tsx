import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FC } from "react";
import { Status, Todo } from "../types/interface";
import { useDeleteTodoMutation } from "../redux/services/api-data";
import { useAppDispatch } from "../hooks/redux-hooks";
import { deleteTodoFromBoard } from "../redux/services/todos";

interface Props {
  todos: Todo[] | [];
  columnTitle: string;
  openModal: () => void;
  editTodo: (todo: Todo) => void;
}

export const DraggableColumn: FC<Props> = ({
  todos,
  columnTitle,
  openModal,
  editTodo,
}) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const onHandleDelete = async (_id: string, status: Status) => {
    try {
      await deleteTodo(_id).unwrap();
      dispatch(deleteTodoFromBoard({ _id, status }));
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "We couldn't save your post, try again!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <GridItem borderRadius="md" bg="white" w="100%" p={2}>
      <Heading as="h2" mb={"2"}>
        {columnTitle}
      </Heading>
      <Droppable droppableId={columnTitle} type="group">
        {(provided) => (
          <Box
            h={"370px"}
            overflowY={"scroll"}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => {
              return (
                <Draggable draggableId={todo._id} key={todo._id} index={index}>
                  {(provided) => (
                    <Card
                      data-testid="custom-element"
                      backgroundColor={"teal"}
                      mb={"2"}
                      maxW={"sm"}
                      h={"150px"}
                      borderRadius="md"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      p={2}
                    >
                      <CardHeader p={0}>
                        <Heading as="h3" size={"m"} mb={2}>
                          {todo.title}
                        </Heading>
                      </CardHeader>
                      <CardBody h={"100px"} p={0} overflowY={"scroll"}>
                        <Text align={"left"} p={2}>
                          {todo.body}
                        </Text>
                      </CardBody>
                      <CardFooter justifyContent={"flex-end"} p={0}>
                        <ButtonGroup size={"sm"}>
                          <Button
                            onClick={() => {
                              editTodo(todo);
                              openModal();
                            }}
                            backgroundColor={"teal"}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            onClick={() => {
                              onHandleDelete(todo._id, todo.status);
                              
                            }}
                            backgroundColor={"teal"}
                          >
                            <DeleteIcon />
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
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
