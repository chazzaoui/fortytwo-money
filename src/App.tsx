import React, { useState } from 'react';
import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTokenData } from './hooks/useTokensFetch';
import WalletAddressInput from './components/walletAddressInput';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, refresh] = useTokenData(true);

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      bg={'#d9d9d9ff'}
      padding={4}
      flexDirection="column"
      alignItems={'center'}
    >
      <WalletAddressInput
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      <TableContainer rounded={'md'} border={'2px solid black'}>
        <Table variant="striped">
          <TableCaption placement="top">Your assets</TableCaption>
          <Thead>
            <Tr>
              <Th>Token</Th>
              <Th>Current price</Th>
              <Th>Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokens.map((token, index) => (
              <Tr key={index}>
                <Td>{token.name}</Td>
                <Td>${token.currentPrice}</Td>
                <Td>{token.balance}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default App;
