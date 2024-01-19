import { useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { langchainProcess } from "../utils/langchain";
import { openaiProcess } from "../utils/openai";

interface ExtractedDataRow {
  header: string;
  value: string;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedDataRow[] | null>(
    null
  );

  useEffect(() => {
    // Your useEffect logic, if needed
  }, []); // Add dependencies if necessary

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        throw Error("An PDF file is required.");
      }
      const extractedText = await langchainProcess(file);
      const openaiResult = await openaiProcess(extractedText);

      const structuredData: ExtractedDataRow[] = [...openaiResult];
      setExtractedData(structuredData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="container">
      <Input type="file" onChange={handleFileChange} />
      <Button
        onClick={handleUpload}
        disabled={!file}
        variant="contained"
        sx={{ marginTop: "1rem" }}
      >
        Upload File
      </Button>

      {extractedData && (
        <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Header</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {extractedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.header}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default FileUpload;
