import { useState } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setBoard } from "../redux/services/board";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const FormIssue = () => {
  const [query, setQuery] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const onHanleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDisabled(true);
    setIsError(false);
    const preparedValue = query.trim();
    const shouldStartWith = /^(?=.*[a-zA-Z])(?=.*\d).{10,}$/;

    if (!shouldStartWith.test(preparedValue)) {
      setIsError(true);
      setTimeout(()=> {
        setIsError(false);
      },2000);
      setIsDisabled(false);
      return;
    }

    dispatch(setBoard(preparedValue));
    setIsDisabled(false);
    setQuery("");
  };

  return (
    <FormControl
      isDisabled={isDisabled}
      as="form"
      w="100%"
      onSubmit={onHanleSubmit}
      justifyContent="center"
      mb="4"
      isRequired={isError}
      isInvalid={isError}
    >
      <Box w="100%">
        <FormLabel visibility={"hidden"} id="form-issue">
          Enter board ID
        </FormLabel>
        <Box display="flex" gap="4">
          <Input
            w="100%"
            aria-label="form-issue"
            placeholder="Enter board ID"
            type="text"
            bgColor="white"
            value={query}
            onChange={onHandleChange}
          />
          <Button
            isDisabled={query.length === 0}
            type="submit"
            color="black"
            alignSelf="center"
          >
            Load
          </Button>
        </Box>
      </Box>
      <FormErrorMessage color={"black"} fontSize="large">
        The ID should include letters and numbers and not be shorter than 10
        characters.
      </FormErrorMessage>
    </FormControl>
  );
};
