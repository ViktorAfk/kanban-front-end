import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  boardId: string;
  onClose: () => void;
  isOpen: boolean;
  finalRef: React.MutableRefObject<null>;
  isDisabled: boolean;
  isError: boolean;
  onHandleSubmit: (event: React.FormEvent<HTMLDivElement>) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  title: string;
  description: string;
}

export const TodoModal: FC<Props> = ({
  isOpen,
  onClose,
  finalRef,
  isDisabled,
  isError,
  onHandleSubmit,
  title,
  description,
  handleDescriptionChange,
  handleTitleChange,
}) => {
  return (
    <>
      <Modal
        size={"sm"}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isDisabled={isDisabled}
              as="form"
              w="100%"
              justifyContent="center"
              mb="4"
              isRequired={isError}
              isInvalid={isError}
              onSubmit={onHandleSubmit}
            >
              <Box w="100%">
                <FormLabel visibility={"hidden"} id="form-issue">
                  Enter your title
                </FormLabel>
                <Box>
                  <Input
                    w="100%"
                    aria-label="form-issue"
                    placeholder="Enter your title"
                    type="text"
                    bgColor="white"
                    value={title}
                    onChange={handleTitleChange}
                    mb={2}
                  />

                  <Textarea
                    as={"textarea"}
                    w="100%"
                    aria-label="form-issue"
                    placeholder="Enter your description"
                    bgColor="white"
                    value={description}
                    onChange={handleDescriptionChange}
                    mb={4}
                  />
                  <Button
                    isDisabled={title.length === 0 || description.length === 0}
                    type="submit"
                    color="black"
                    alignSelf="center"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
              <FormErrorMessage color={"black"} fontSize="large">
                Value should not be empty.
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
