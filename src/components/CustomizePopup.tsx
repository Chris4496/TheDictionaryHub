import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
} from "@chakra-ui/react";

import { useDisclosure, Button, Box } from "@chakra-ui/react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function CustomizePopup(props) {
  let dictList = props.dictList;
  const setdictList = props.setdictList;
  const setCookie = props.setCookie;

  const { isOpen, onOpen, onClose } = useDisclosure();

  function confirmHandler() {
    setCookie("Layout_Preference", JSON.stringify(dictList), { path: "/" });
  }

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    dictList = reorder(dictList, result.source.index, result.destination.index);

    console.log(dictList);
    setdictList(dictList);
  }

  return (
    <>
      <Button onClick={onOpen}>Customize Layout</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Layout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <VStack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    alignItems="flex-start"
                    spacing={0}
                    overflow="hidden"
                  >
                    {dictList.map((dict, index) => (
                      <Draggable
                        key={dict.name}
                        draggableId={dict.name + "_" + index}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            borderRadius="lg"
                            overflow="hidden"
                            bg="rgba(255, 255, 255, 0.08)"
                          >
                            <Text fontSize="xl" m={2} px={2}>
                              {index +
                                1 +
                                ". " +
                                dict.name[0].toUpperCase() +
                                dict.name.slice(1)}
                            </Text>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </DragDropContext>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                confirmHandler();
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomizePopup;
