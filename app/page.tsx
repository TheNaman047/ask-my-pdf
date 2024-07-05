"use client";
import {
  Container,
  Title,
  Textarea,
  Button,
  Text,
  Input,
  Loader,
  Flex,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
export default function Ask() {
  const [questions, setQuestions] = useState([
    {
      q1: "",
      ans1: "",
    },
    {
      q2: "",
      ans2: "",
    },
    {
      q3: "",
      ans3: "",
    },
    {
      q4: "",
      ans4: "",
    },
    {
      q5: "",
      ans5: "",
    },
  ]);

  const [isPdfUploading, setPdfUploading] = useState(false);
  const [pdfAbout, setPdfAbout] = useState("");
  const [pdfName, setPdfName] = useState("");

  const handleQuestionSubmit = async () => {
    try {
      const response = await fetch("api/ask", {
        method: "POST",
        body: JSON.stringify({ data: questions, brief: pdfAbout }),
        headers: {
          ["Content-Type"]: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      const answers = questions.map((val, i) => {
        return res[`Ans${i + 1}`]
          ? {
              ...val,
              [`ans${i + 1}`]:
                typeof res[`Ans${i + 1}`] == "object"
                  ? JSON.stringify(res[`Ans${i + 1}`])
                  : res[`Ans${i + 1}`],
            }
          : val;
      });
      setQuestions([...answers]);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  const handlePdfUpload = async (e: any) => {
    setPdfUploading(true);
    setPdfName(e[0].name);
    const formData = new FormData();
    formData.append("file", e[0]);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPdfUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  return (
    <>
      {" "}
      <Title
        mt={20}
        order={2}
        style={{ marginBottom: "20px", textAlign: "center" }}
        w={"100%"}
      >
        Ask Your questions
      </Title>
      <div
        style={{
          textAlign: "center",
          height: "100%",
          display: "flex",
          // flexDirection: 'column',
          justifyContent: "center",
          // flexWrap: 'wrap',
          // alignItems: 'start',
          marginInline: "0px",
          // maxWidth: '100%',
          width: "auto",
        }}
      >
        <div style={{ width: "100%" }}>
          <Container
            // mb={20}
            // mx={5}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Input
              name={"pdfAbout"}
              value={pdfAbout}
              placeholder="Write Brief about PDF."
              onChange={(e: any) => {
                setPdfAbout(e.target.value);
              }}
              style={{
                width: "100%",
                maxWidth: "600px",
                marginBottom: "10px",
              }}
            />
          </Container>
          <Flex justify={"center"} mt={20}>
            {" "}
            <Dropzone
              onDrop={handlePdfUpload}
              accept={[MIME_TYPES.pdf]}
              multiple={false}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "2px solid #79abfc",
                borderRadius: "10px",
                outline: "1px solid #79abfc",
                outlineOffset: "2px",
              }}
            >
              {pdfName && !isPdfUploading ? (
                <>
                  <Flex w="100%" justify={"center"} align={"center"}>
                    {" "}
                    <BsFillFileEarmarkPdfFill
                      style={{ fill: "#cd2f2f" }}
                    />{" "}
                    <Text style={{ color: "#79abfc", fontWeight: "bold" }}>
                      {pdfName}
                    </Text>
                  </Flex>
                </>
              ) : (
                <Text
                  style={{
                    color: "#79abfc",
                    fontWeight: "bold",
                  }}
                >
                  Drag PDF file here or click to select file
                </Text>
              )}
            </Dropzone>
            {isPdfUploading && (
              <Flex align={"center"} justify={"center"} h={40} ml={15}>
                {" "}
                {isPdfUploading && <Loader size={20} />}
              </Flex>
            )}
          </Flex>
          {questions.map((num: any, i) => {
            return (
              <Flex key={i} align={"center"} justify={"center"}>
                <Container
                  // mb={20}
                  // mx={5}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0px",
                    width: "100%",
                    maxWidth: "400px",
                  }}
                >
                  <Input.Label
                    style={{
                      textAlign: "left",
                      fontWeight: "600",
                      // marginRight: '20px',
                    }}
                  >{`Question ${i + 1}`}</Input.Label>
                  <Input
                    key={i}
                    name={`q${i + 1}`}
                    value={num[`q${i + 1}`]}
                    onChange={(e) => {
                      questions.splice(i, 1, {
                        ...num,
                        [`q${i + 1}`]: e.target.value,
                      });

                      setQuestions([...questions]);
                    }}
                    style={{
                      width: "100%",
                      maxWidth: "600px",
                      marginBottom: "10px",
                    }}
                  />

                  <Textarea
                    disabled={true}
                    placeholder={"Answer"}
                    key={i}
                    value={num[`ans${i + 1}`]}
                    style={{
                      width: "100%",
                      maxWidth: "400px",
                      marginBottom: "10px",
                      maxHeight: "300px",
                      height: "100%",
                      wordBreak: "break-word",
                    }}
                  />
                </Container>
              </Flex>
            );
          })}
        </div>
      </div>
      <Flex justify={"center"} align={"center"} my={20} w={"100%"}>
        <Button
          ml={20}
          onClick={() => {
            if (pdfName !== "") {
              if (!isPdfUploading) handleQuestionSubmit();
            }
          }}
          disabled={pdfName === "" ? true : false}
        >
          Submit
        </Button>
        <Button
          ml={20}
          color="red"
          onClick={() => {
            setPdfAbout("");
            setPdfName("");
            setPdfUploading(false);
            setQuestions([
              {
                q1: "",
                ans1: "",
              },
              {
                q2: "",
                ans2: "",
              },
              {
                q3: "",
                ans3: "",
              },
              {
                q4: "",
                ans4: "",
              },
              {
                q5: "",
                ans5: "",
              },
            ]);
          }}
          disabled={pdfName === "" && isPdfUploading ? true : false}
        >
          Clear
        </Button>
      </Flex>
    </>
  );
}
