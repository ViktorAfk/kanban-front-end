import {
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import "./App.css";
import { FormIssue } from "./components/BoardForm";
import { useAppSelector } from "./hooks/redux-hooks";
import { setBoardIdValue } from "./redux/services/board";
import { TodosTable } from "./components/TodosTable";
import { TodoModal } from "./components/TodoModal";
import { useRef } from "react";
import { useHandleChange } from "./hooks/useHandleChange";

export const App = () => {
  const board = useAppSelector(setBoardIdValue);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const {
    isDisabled,
    isError,
    onHandleSubmit,
    handleTitleChange,
    handleDescriptionChange,
    title,
    description,
    onEditHandleChange,
  } = useHandleChange(board, onClose);

  return (
    <main>
      <Container maxW={"920px"} bg="teal" centerContent pb={4}>
        <Heading as="h1" size="2xl" m="8">
          Kanban board
        </Heading>
        <Heading alignSelf={'flex-start'} as={"h2"} size={"md"}>
          Board ID: {board}
        </Heading>
        <FormIssue />
        {board && (
          <Flex
            w={"100%"}
            justify={"space-between"}
            align={"center"}
            gap={4}
            mb={"8"}
          >
            <Button onClick={onOpen}>Add todo</Button>
          </Flex>
        )}
        <TodosTable
          editTodo={onEditHandleChange}
          openModal={onOpen}
          boardId={board}
        />
        {board && (
          <TodoModal
            isOpen={isOpen}
            finalRef={finalRef}
            onClose={onClose}
            boardId={board}
            isDisabled={isDisabled}
            isError={isError}
            onHandleSubmit={onHandleSubmit}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange}
            title={title}
            description={description}
          />
        )}
      </Container>
    </main>
  );
};
