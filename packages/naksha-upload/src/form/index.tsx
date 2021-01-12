import {
  Box,
  Button,
  FormLabel,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatDate, LICENSES } from "@ibp/naksha-commons";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ACCESS, LAYER_TYPES } from "../icons/constants";
import useLayerUpload from "../hooks/use-layer-upload";
import DataPreview from "./data-preview";
import InputField from "./input";
import SelectMultipleField from "./multi-select";
import SelectField from "./select";
import TagsField from "./tags";
import TextareaField from "./textarea";

export default function LayerUploadForm() {
  const {
    shapeFiles: { dbf, shp },
    uploadLayer,
  } = useLayerUpload();

  const hForm = useForm<any>({
    resolver: yupResolver(
      yup.object().shape({
        layerName: yup.string().required(),
        layerDescription: yup.string().required(),
        layerType: yup.string().required(),
        titleColumn: yup.string().required(),
        createdBy: yup.string().required(),
        summaryColumns: yup.array().of(yup.mixed()),
        colorBy: yup.string().required(),
        attribution: yup.string().required(),
        url: yup.string().notRequired(),
        pdfLink: yup.string().notRequired(),
        tags: yup.string().required(),
        license: yup.string().required(),
        createdDate: yup.date().required(),
        downloadAccess: yup.string().required(),
        layerColumnDescription: yup
          .object()
          .shape(
            Object.fromEntries(
              dbf.meta.keys.map((k) => [k, yup.string().required()])
            )
          )
          .required(),
      })
    ),
    defaultValues: {
      layerType: shp.meta.type.toUpperCase(),
      layerColumnDescription: Object.fromEntries(
        dbf.meta.keys.map((k) => [k, k])
      ),
      summaryColumns: [],
    },
  });

  const handleOnSubmit = (values) => {
    uploadLayer({
      ...values,
      createdDate: formatDate(values.createdDate),
      layerFileDescription: {
        fileType: "shp",
        encoding: "ISO-8859-1",
      },
      editAccess: "ALL",
      summaryColumns: values.summaryColumns
        .map((o) => o.value)
        .toString()
        .toLowerCase(),
    });
  };

  return (
    <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
      <SimpleGrid columns={{ base: 1, md: 7 }} spacing={4} h="100%">
        <Box gridColumn="1/6" h="100%">
          <DataPreview />
          <Heading size="md" mb={4}>
            📝 Column Description
          </Heading>
          {dbf.meta.keys.map((key) => (
            <HStack spacing={4} maxW="32rem" mb={4}>
              <FormLabel w="15rem">{key}</FormLabel>
              <InputField
                key={key}
                name={`layerColumnDescription.${key}`}
                f={hForm}
              />
            </HStack>
          ))}
        </Box>
        <Box gridColumn="6/8" h="100%">
          <Heading size="md" mb={4}>
            🗺️ Layer Information
          </Heading>
          <Stack spacing={4}>
            <InputField name="layerName" label="Name" f={hForm} />
            <TextareaField
              name="layerDescription"
              label="Description"
              f={hForm}
            />
            <SelectField
              name="layerType"
              options={LAYER_TYPES}
              label="Layer Type"
              f={hForm}
            />
            <SelectField
              name="titleColumn"
              options={dbf.meta.keys}
              label="Title Column"
              f={hForm}
            />
            <SelectMultipleField
              name="summaryColumns"
              label="Summary Columns"
              options={dbf.meta.keys.map((option) => ({
                label: option,
                value: option,
              }))}
              f={hForm}
            />
            <SelectField
              name="colorBy"
              options={dbf.meta.keys}
              label="Color By"
              f={hForm}
            />
            <InputField name="createdBy" label="Created By" f={hForm} />
            <InputField name="attribution" label="Attribution" f={hForm} />
            <InputField name="url" label="URL" f={hForm} />
            <InputField name="pdfLink" label="PDF Link" f={hForm} />
            <TagsField
              name="tags"
              label="Tags"
              hint="Press enter to add tags"
              f={hForm}
            />
            <SelectField
              name="license"
              options={Object.keys(LICENSES)}
              label="License"
              f={hForm}
            />
            <InputField
              name="createdDate"
              label="Created Date"
              type="date"
              f={hForm}
            />
            <SelectField
              name="downloadAccess"
              options={ACCESS}
              label="Download Access"
              f={hForm}
            />
            <Button colorScheme="blue" type="submit">
              Create
            </Button>
          </Stack>
        </Box>
      </SimpleGrid>
    </form>
  );
}
