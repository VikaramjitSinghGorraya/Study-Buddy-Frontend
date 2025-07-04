import {
  Box,
  Flex,
  Textarea,
  Button,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { ChatBoxProps } from "../types/ChatBox";

const ChatBox = ({ pdfText }: ChatBoxProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;

    setMessages((prev) => [...prev, `You: ${userMessage}`]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/ask/question`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: userMessage,
            text: pdfText,
          }),
        }
      );

      const data = await res.json();
      const aiMessage = data.answer || "Sorry, I couldn't find an answer.";

      setMessages((prev) => [...prev, `AI: ${aiMessage}`]);
    } catch (err) {
      setMessages((prev) => [...prev, "AI: Error reaching the server."]);
    } finally {
      setLoading(false); // hide spinner
    }
  };

  return (
    <Flex direction="column" height="100%">
      <VStack
        flex="1"
        spacing={3}
        align="stretch"
        overflowY="auto"
        mb={4}
        bg="gray.50"
        p={4}
        borderRadius="md"
      >
        {messages.length === 0 ? (
          <Text color="gray.400">Ask something about the PDF...</Text>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {loading && (
              <Flex justify="center">
                <Spinner size="xl" color="teal.500" />
              </Flex>
            )}
            <div ref={endRef} />
          </>
        )}
      </VStack>

      <Flex direction={{ base: "column", md: "row" }}>
        <Textarea
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          mb={{ base: 2, md: 0 }}
          mr={{ md: 2 }}
        />
        <Button colorScheme="teal" onClick={sendMessage}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChatBox;
