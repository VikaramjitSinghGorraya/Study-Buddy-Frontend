import { useState, ChangeEvent } from "react";
import {
  VStack,
  IconButton,
  Input,
  Text,
  useToast,
  Spinner,
  Box,
  Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

type PDFUploaderProps = {
  onTextReady: (text: string, fileId: string) => void;
};

const PDFUploader = ({ onTextReady }: PDFUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const toast = useToast();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setPdfUrl(URL.createObjectURL(file)); // Show preview immediately

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      onTextReady(data.text, data.fileId); // ✅ pass fileId

      toast({
        title: "Upload successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Error uploading file",
        status: "error",
        description: err.message,
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" height="100%">
      <VStack spacing={4} align="stretch">
        <Text fontWeight="bold" fontSize="xl" textAlign="center">
          Upload PDF <br />
          <Text as="span" fontSize="md" color="gray.500">
            (Max 10 MB)
          </Text>
        </Text>

        <IconButton
          icon={<AddIcon />}
          aria-label="Upload PDF"
          colorScheme="teal"
          size="lg"
          onClick={() => document.getElementById("fileInput")?.click()}
        />

        <Input
          id="fileInput"
          type="file"
          accept=".pdf"
          display="none"
          onChange={handleFileChange}
        />
      </VStack>

      {/* PDF Preview */}
      <Box flex="1" mt={4} overflow="auto">
        {loading ? (
          <Flex justify="center" align="center" height="100%">
            <Spinner size="md" />
          </Flex>
        ) : (
          pdfUrl && (
            <object
              data={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
            >
              <Text>PDF preview not available</Text>
            </object>
          )
        )}
      </Box>
    </Flex>
  );
};

export default PDFUploader;
