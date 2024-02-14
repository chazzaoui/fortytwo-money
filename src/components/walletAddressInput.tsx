// WalletAddressInput.tsx
import React, { useState } from 'react';
import { Button, Input, Text, VStack } from '@chakra-ui/react';

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

  const validateAddress = () => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (regex.test(walletAddress)) fetchTokens();
    if (!regex.test(walletAddress)) setIsValid(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e.target.value);
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
        backgroundColor={'#6cc879ff'}
        onClick={validateAddress}
        mt={2}
        border={'2px solid black'}
        isLoading={loading}
      >
        Get me my assets
      </Button>
    </VStack>
  );
};

export default WalletAddressInput;
