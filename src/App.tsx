import { Container, Heading } from "@chakra-ui/react";
import "./App.css";
import { FormIssue } from "./components/BoardForm";
import { useAppSelector } from "./hooks/redux-hooks";
import { setBoardIdValue } from "./redux/services/board";

function App() {
  const board = useAppSelector(setBoardIdValue);
  return (
    <main>
      <Container maxW={"920px"} bg="teal" centerContent pb={4}>
        <Heading as="h1" size="2xl" m="8">
          Kanban board
        </Heading>
        <FormIssue />
        {board && (
          <Heading as={"h2"} size={"md"} mb={"8"} alignSelf="flex-start">
            Board ID: {board}
          </Heading>
        )}
        {/* <IssuesTable userRepo={userRepo} /> */}
      </Container>
    </main>
  );
}

export default App;
