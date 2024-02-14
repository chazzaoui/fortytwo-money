// WalletAddressInput.tsx
import React, { useState } from 'react';
import { Button, Input, Text, VStack } from '@chakra-ui/react';
import { colors } from '../styles/colors';

interface WalletAddressInputProps {
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  fetchTokens: () => void;
  loading: boolean;
}

const WalletAddressInput: React.FC<WalletAddressInputProps> = ({
  walletAddress,
  setWalletAddress,
  fetchTokens,
  loading,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const validateAddress = () => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (regex.test(walletAddress)) {
      fetchTokens();
      setIsValid(true);
      setHasFetched(true);
    }
    if (!regex.test(walletAddress)) setIsValid(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e.target.value);
    // whenever you want to refetch with new adress update the copy
    if (!e.target.value) {
      setHasFetched(false);
    }
  };

  return (
    <VStack mb={12} width={['100%', '80%', '50%']}>
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
        backgroundColor={colors.button}
        onClick={validateAddress}
        mt={2}
        border={'2px solid black'}
        isLoading={loading}
        width={['100%', '100%', '50%']}
      >
        {hasFetched ? 'Refresh' : 'Get me my assets'}
      </Button>
    </VStack>
  );
};

export default WalletAddressInput;
