import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import "./App.css";
import { FormIssue } from "./components/BoardForm";
import { useAppSelector } from "./hooks/redux-hooks";
import { setBoardIdValue } from "./redux/services/board";
import { TodosTable } from "./components/TodosTable";

export const App = () => {
  const board = useAppSelector(setBoardIdValue);
  return (
    <main>
      <Container maxW={"920px"} bg="teal" centerContent pb={4}>
        <Heading as="h1" size="2xl" m="8">
          Kanban board
        </Heading>
        <FormIssue />
        {board && (
          <Flex w={'100%'} justify={'space-between'} align={'center'} gap={4} mb={"8"}>
            <Heading as={"h2"} size={"md"}>
              Board ID: {board}
            </Heading>
            <Button>Add todo</Button>
          </Flex>
        )}
        <TodosTable boardId={board} />
      </Container>
    </main>
  );
}

