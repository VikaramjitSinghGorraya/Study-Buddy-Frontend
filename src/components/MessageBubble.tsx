import { Box, Text } from "@chakra-ui/react";
import { MessageBubbleProps } from "../types/MessageBubble";

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <Box
      bg="blue.100"
      p={3}
      borderRadius="xl"
      alignSelf="flex-start"
      maxW="80%"
    >
      <Text>{message}</Text>
    </Box>
  );
};

export default MessageBubble;
