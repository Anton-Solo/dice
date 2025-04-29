'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface GameResult {
  time: string;
  guess: string;
  result: number;
  success: boolean;
}

interface GameHistoryProps {
  history: GameResult[];
}

export const GameHistory = ({ history }: GameHistoryProps) => {
  return (
    <div style={{ margin: '2rem 0' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Time</TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Guess</TableCell>
              <TableCell sx={{ fontSize: 14, fontWeight: 500 }}>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.time}>
                <TableCell sx={{ fontSize: 14 }}>{item.time}</TableCell>
                <TableCell sx={{ fontSize: 14 }}>{item.guess}</TableCell>
                <TableCell sx={{ color: item.success ? '#1B5E20' : '#C62828', fontSize: 14 }}>
                    {item.result}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

