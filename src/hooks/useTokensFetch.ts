import { useState, useEffect, useCallback } from 'react';

import { getRandomPrice } from '../utils/getRandomPrice';

interface TokenData {
  name: string;
  currentPrice: number;
  balance: number;
}

const fetchTokenData = (): Promise<TokenData[]> => {
  return new Promise((resolve) => {
    const data: TokenData[] = [
      {
        name: 'Ethereum',
        currentPrice: getRandomPrice(),
        balance: 22.5,
      },
      {
        name: 'Bitcoin',
        currentPrice: getRandomPrice(),
        balance: 1.6,
      },
      {
        name: 'Lite coin',
        currentPrice: getRandomPrice(),
        balance: 300,
      },
      {
        name: 'Forty two coin',
        currentPrice: getRandomPrice(),
        balance: 69420,
      },
    ];
    setTimeout(() => resolve(data), 2000);
  });
};

// Chose to do a custom hook here, would normally work with react query
// Especially working with live data its great to invalidate stuff and refresh in the background

const useTokenData = (
  autoRefresh = false
): [TokenData[] | undefined, () => void, boolean, string | null] => {
  const [tokens, setTokens] = useState<TokenData[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTokenData();
      setTokens(data);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch token data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetch();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetch]);

  return [tokens, fetch, loading, error];
};

export default useTokenData;
