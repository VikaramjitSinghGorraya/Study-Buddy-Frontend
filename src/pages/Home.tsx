// src/pages/Home.tsx
import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import PDFUploader from "../components/PDFUploader";
import ChatBox from "../components/ChatBox";

const Home = () => {
  const [pdfText, setPdfText] = useState("");

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      height="100vh"
      overflow="hidden"
    >
      {/* Left Sidebar */}
      <Box
        w={{ base: "100%", md: "30%" }}
        bg="gray.100"
        p={4}
        borderRight="1px solid #e2e8f0"
      >
        <PDFUploader onTextReady={setPdfText} />
      </Box>

      {/* Right Chat Area */}
      <Box flex="1" p={4}>
        <ChatBox pdfText={pdfText} />
      </Box>
    </Flex>
  );
};

export default Home;
