import { Layout } from "@/components/Layout";
import TypeSelector from "@/components/orion/entity_form/TypeSelector";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import EntityForm from "@/components/orion/entity_form/EntityForm";
import { parse } from "papaparse";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const FiwareOrionEintitiesCsv: NextPage = () => {
  // on change input file event, read csv file and set state
  const [uploadData, setUploadData] = useState<any[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [type, setType] = useState<string>("");

  const handleChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      const rowData: any = reader.result;
      const { data } = parse(rowData, { header: true });
      // convert value to boolean if value is "true" or "false"
      data.forEach((d: any) => {
        Object.keys(d).forEach((key) => {
          if (d[key] === "true") d[key] = true;
          if (d[key] === "false") d[key] = false;
        });
      });
      setUploadData(data);
    };
    value.target.files && reader.readAsText(value.target.files?.[0]);
  }, []);

  // trigger child component function from this component
  const entityFormRef = useRef<any>();

  useEffect(() => {
    if (!uploadData || !uploadData[currentIndex]) return;
    const data = uploadData[currentIndex];
    entityFormRef.current.handleSetData(data);
  }, [currentIndex, uploadData, type]);

  return (
    <Layout>
      <Stack spacing={10}>
        <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              CSVからEntity作成
            </Heading>
          </CardHeader>
          <CardBody>
            <Button as="label" mb={5}>
              <input
                accept="text/csv"
                onChange={(v) => handleChange(v)}
                type="file"
                hidden
              />
              Upload CSV
            </Button>

            {uploadData && (
              <>
                <TypeSelector
                  onChange={(data) => {
                    setType(data.type);
                    entityFormRef.current.handleSelectType(data);
                  }}
                  value={type}
                />

                <Flex gap={3} alignItems="center">
                  <IconButton
                    icon={<FiChevronLeft />}
                    aria-label=""
                    variant=""
                    onClick={() => {
                      if (currentIndex === 0) return;
                      setCurrentIndex(currentIndex - 1);
                    }}
                  />
                  <Box>
                    {currentIndex + 1}/{uploadData.length}
                  </Box>
                  <IconButton
                    icon={<FiChevronRight />}
                    aria-label=""
                    variant=""
                    onClick={() => {
                      if (currentIndex === uploadData.length - 1) return;
                      setCurrentIndex(currentIndex + 1);
                    }}
                  />
                </Flex>
                <Box p={4} boxShadow="0 0 3px 0 gray" borderRadius={5}>
                  <EntityForm
                    ref={entityFormRef}
                    onSuccess={() => {
                      setCurrentIndex(currentIndex + 1);
                      window.scrollTo(0, 0);
                    }}
                    resetOnSuccess={false}
                  />
                </Box>
              </>
            )}
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
};

export default FiwareOrionEintitiesCsv;
