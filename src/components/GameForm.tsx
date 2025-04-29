'use client';

import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface GameFormProps {
  onPlay: (threshold: number, condition: 'under' | 'over') => number;
}

export const GameForm = ({ onPlay }: GameFormProps) => {
  const [threshold, setThreshold] = useState<number>(50);
  const [condition, setCondition] = useState<'under' | 'over'>('under');
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [tempNumber, setTempNumber] = useState<number | null>(null);

  const handlePlay = () => {
    setRolling(true);
    setTempNumber(null);
    setTimeout(() => {
      const rolledNumber = onPlay(threshold, condition);
      setResult(rolledNumber);
      setRolling(false);
    }, 1500);
  };

  const handleSliderChange = (_: Event, value: number) => {
    setThreshold(value as number);
  };

  const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondition((event.target as HTMLInputElement).value as 'under' | 'over');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (rolling) {
      interval = setInterval(() => {
        const randomTemp = Math.floor(Math.random() * 100) + 1;
        setTempNumber(randomTemp);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [rolling]);

  return (
    <Stack spacing={4} direction="column" sx={{ maxWidth: 320, margin: '0 auto', mt: 2 }}>
      <div>
        <Typography
            align="center"
            variant="h2"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
                animation: rolling ? 'shake 0.5s infinite' : 'none',
                backgroundColor: '#0000000A',
                height: '200px',
            }}
        >
            🎲 {rolling ? tempNumber : result}
        </Typography>
        <FormControl 
            component="fieldset"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 2, mb: 2 }}
        >
            <RadioGroup 
                row 
                value={condition} 
                onChange={handleConditionChange}
            >
                <FormControlLabel color="secondary" value="under" control={<Radio size="small" color="secondary"/>} label="Under" labelPlacement="start"  />
                <FormControlLabel color="secondary" value="over" control={<Radio size="small" color="secondary"/>} label="Over" labelPlacement="start" />
            </RadioGroup>
        </FormControl>
        <Slider
          value={threshold}
          onChange={handleSliderChange}
          aria-labelledby="threshold-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 0, label: '0' },
            { value: 100, label: '100' },
          ]}
          min={0}
          max={100}
          color="secondary"
        />
      </div>

      <Button variant="contained" color="secondary" onClick={handlePlay} size="large" disabled={rolling}>
        {rolling ? 'Throw...' : 'Play'}
      </Button>
    </Stack>
  );
};
