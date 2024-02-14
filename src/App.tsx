import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import useTokenData from './hooks/useTokensFetch';
import WalletAddressInput from './components/walletAddressInput';
import AssetsTable from './components/assetTable';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  // pass boolean true to the hook to activate auto refresh
  const [tokens, fetch, loading, error] = useTokenData();

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
        fetchTokens={fetch}
        loading={loading}
      />
      <AssetsTable error={error} tokens={tokens} loading={loading} />
    </Flex>
  );
}

export default App;
