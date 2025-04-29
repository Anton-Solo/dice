'use client';

import { useState, useCallback } from 'react';
import { GameForm } from '../components/GameForm';
import { GameHistory } from '../components/GameHistory';
import { Container, Snackbar, Alert, AlertTitle } from '@mui/material';

interface GameResult {
  time: string;
  guess: string;
  result: number;
  success: boolean;
}

export default function HomePage() {
  const [history, setHistory] = useState<GameResult[]>([]);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    success: boolean;
    detail?: string;
    key: number; 
  }>({
    open: false,
    message: '',
    success: false,
    key: new Date().getTime(),
  });

  const handlePlay = (threshold: number, condition: 'under' | 'over'): number => {
    const rolledNumber = Math.floor(Math.random() * 100) + 1;
    const now = new Date();
    const time = now.toLocaleTimeString();

    const success = condition === 'over' ? rolledNumber > threshold : rolledNumber < threshold;
    const guess = `${condition === 'over' ? 'Over' : 'Under'} ${threshold}`;

    const gameResult: GameResult = { time, guess, result: rolledNumber, success };

    setHistory(prev => [gameResult, ...prev.slice(0, 9)]);

    setNotification({
      open: true,
      success: success,
      message: success ? 'You won' : 'You lost',
      detail: !success 
        ? condition === 'over'
          ? 'Number was less'
          : 'Number was higher'
        : '',
      key: new Date().getTime(),
    });

    return rolledNumber;
  };

  const handleCloseNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <GameForm onPlay={handlePlay} />
      <GameHistory history={history} />

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          maxWidth: 600,
          width: '100%',
        }}
        onClose={handleCloseNotification}
        key={notification.key} 
      >
        <Alert
          severity={notification.success ? 'success' : 'error'}
          variant="filled"
          sx={{
            width: '100%',
          }}
        >
          <AlertTitle>{notification.success ? 'You won' : 'You lost'}</AlertTitle>
          {notification.detail}
        </Alert>
      </Snackbar>
    </Container>
  );
}



