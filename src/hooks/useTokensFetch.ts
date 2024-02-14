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
    ];
    setTimeout(() => resolve(data), 2000);
  });
};

export const useTokenData = (
  autoRefresh = false
): [TokenData[], () => void] => {
  const [tokens, setTokens] = useState<TokenData[]>([]);

  const refresh = useCallback(() => {
    fetchTokenData().then(setTokens);
  }, []);

  useEffect(() => {
    refresh();
    if (autoRefresh) {
      const interval = setInterval(() => {
        refresh();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refresh]);

  return [tokens, refresh];
};
