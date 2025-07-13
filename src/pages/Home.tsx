// src/pages/Home.tsx
import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import PDFUploader from "../components/PDFUploader";
import ChatBox from "../components/ChatBox";

const Home = () => {
  const [pdfText, setPdfText] = useState("");
  const [fileId, setFileId] = useState("");
  const [resetFlag, setResetFlag] = useState(false);

  const resetChat = () => setResetFlag(true);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      height="100vh"
      overflow="hidden"
    >
      <Box
        w={{ base: "100%", md: "30%" }}
        bg="gray.100"
        p={4}
        borderRight="1px solid #e2e8f0"
      >
        <PDFUploader
          onTextReady={(text, id) => {
            setPdfText(text);
            setFileId(id);
            resetChat();
          }}
        />
      </Box>

      <Box flex="1" p={4}>
        <ChatBox
          pdfText={pdfText}
          fileId={fileId}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
        />
      </Box>
    </Flex>
  );
};

export default Home;
