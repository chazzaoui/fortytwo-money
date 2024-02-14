import React, { useState } from 'react';
import {
  Button,
  Center,
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTokenData } from './hooks/useTokensFetch';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [tokens, refresh] = useTokenData(true);

  const validateAddress = () => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    setIsValid(regex.test(walletAddress));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e.currentTarget.value);
  };

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      bg={'#d9d9d9ff'}
      padding={4}
      flexDirection="column"
      alignItems={'center'}
    >
      <Center
        mb={12}
        flexDirection={'column'}
        width={['100%', '80%', '50%']}
      >
        <Input
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={handleInputChange}
          errorBorderColor="crimson"
          backgroundColor={'white'}
        />
        {!isValid && (
          <Text color="crimson">
            Please enter a valid wallet address.
          </Text>
        )}
        <Button
          backgroundColor={'#6cc879ff'}
          onClick={validateAddress}
          mt={2}
          border={'2px solid black'}
        >
          Get me my assets
        </Button>
      </Center>
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
