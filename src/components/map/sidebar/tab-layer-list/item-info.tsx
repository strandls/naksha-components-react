import {
  Box,
  Button,
  Flex,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal
} from "@chakra-ui/core";
import React from "react";

import {
  IconCredit,
  IconDownload,
  IconExternalLink,
  IconInfo,
  IconLicense,
  IconTag
} from "../../../../components/map/icons";
import { overflowStyle1 } from "../../../../static/constants";
import licenses from "../../../../static/licenses";

const ListItem = ({ icon: Icon, children }) => (
  <Box style={overflowStyle1} fontSize="sm">
    <Icon ml={1} mr={3} />
    {children}
  </Box>
);

export default function ItemInfo({ layer, onDownload, mb = 0 }) {
  return (
    <Box color="gray.600" mb={mb}>
      <ListItem icon={IconCredit}>{layer.attribution}</ListItem>
      <ListItem icon={IconTag}>{layer?.tags?.join(", ")}</ListItem>
      <ListItem icon={IconLicense}>
        <Link
          target="_blank"
          color="blue.500"
          fontWeight="bold"
          rel="noopener"
          href={licenses[layer.license]}
        >
          {layer.license} <IconExternalLink />
        </Link>
      </ListItem>
      <Flex justifyContent="space-between" mt={2}>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<IconDownload />}
          disabled={!layer.isDownloadable}
          onClick={onDownload}
        >
          Download
        </Button>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm" leftIcon={<IconInfo />}>
              More Info
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody fontSize="sm">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <b>Created By</b>
                      </td>
                      <td>{layer.createdBy}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Author</b>
                      </td>
                      <td>{layer.author.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>URL</b>
                      </td>
                      <td>{layer.url}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Created On</b>
                      </td>
                      <td>{new Date(layer.createdDate).toDateString()}</td>
                    </tr>
                  </tbody>
                </table>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
    </Box>
  );
}
