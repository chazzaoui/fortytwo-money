import React from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Center,
} from '@chakra-ui/react';

interface TokenData {
  name: string;
  currentPrice: number;
  balance: number;
}

interface AssetsTableProps {
  tokens: TokenData[] | undefined;
  loading: boolean;
  error: string | null;
}

const AssetsTable: React.FC<AssetsTableProps> = ({
  tokens,
  loading,
  error,
}) => {
  if (!loading && tokens?.length === 0) {
    return (
      <Center my={4}>
        <Text>No assets found</Text>
      </Center>
    );
  }

  if (!loading && error) {
    return (
      <Center my={4}>
        <Text>{error}</Text>
      </Center>
    );
  }

  return (
    <TableContainer
      width="100%"
      rounded="md"
      border="2px solid black"
    >
      <Table variant="striped">
        <TableCaption placement="top">Your assets</TableCaption>
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th>Current price</Th>
            <Th>Current Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens?.map((token, index) => (
            <Tr key={index}>
              <Td>{token.name}</Td>
              <Td>${token.currentPrice}</Td>
              <Td>{token.balance}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AssetsTable;
