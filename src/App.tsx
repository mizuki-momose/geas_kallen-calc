import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { InputArea } from './InputArea';
import { probCalc } from './func';
import Typography from '@mui/material/Typography';

export const ElementsArr = [
  'all_games',
  'at_games',
  'cherry',
  'suica',
  'chance',
  'b_hbb',
  'b_nbb',
  'b_rb',
  'b_cherry_rb',
  'b_chance_rb',
  'b_bell_red7',
  'bg_default',
  'bg_kallen',
  'bg_photo',
  'bg_cc',
  'bg_nana_suzu_lulu',
  'bg_lulu_heroine',
  'bg_black_knights',
  'bg_oz',
  'ed_bg_default',
  'ed_bg_gathering',
  'at_cutin_high_games',
  'at_infinite_promotion',
  'tr_bronze',
  'tr_silver',
  'tr_gold',
  'tr_kirin',
  'tr_rainbow',
] as const;

export type Elements = (typeof ElementsArr)[number];

const CalcData: {
  [key in Elements]?: {
    child?: number;
    prob: number[];
    kKeys: Elements[];
  };
} = {
  cherry: {
    child: 10,
    prob: [1265, 1248, 1218, 1142, 1071, 988],
    kKeys: ['all_games'],
  },
  suica: {
    child: 10,
    prob: [599, 588, 574, 554, 527, 499],
    kKeys: ['all_games'],
  },
  // chance: { prob: [], kKeys: [] },
  b_hbb: {
    child: 10,
    prob: [16384, 16384, 15241, 14894, 14247, 13374],
    kKeys: ['all_games'],
  },
  b_nbb: {
    child: 10,
    prob: [4121, 3996, 3832, 3681, 3504, 3343],
    kKeys: ['all_games'],
  },
  b_rb: {
    child: 10,
    prob: [4965, 4891, 4648, 3996, 3601, 3361],
    kKeys: ['all_games'],
  },
  b_cherry_rb: {
    child: 10,
    prob: [43691, 43691, 40960, 21845, 18204, 17246],
    kKeys: ['all_games'],
  },
  b_chance_rb: {
    child: 10,
    prob: [163840, 163840, 109227, 81920, 54613, 40960],
    kKeys: ['all_games'],
  },
  b_bell_red7: {
    child: 10,
    prob: [32768, 29789, 26214, 23406, 21845, 19859],
    kKeys: ['all_games'],
  },
  bg_default: {
    child: 1000,
    prob: [1497, 1724, 1658, 1980, 2008, 2325],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  bg_kallen: {
    child: 1000,
    prob: [5319, 4000, 5319, 4000, 5319, 4000],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  bg_photo: {
    child: 1000,
    prob: [10000, 10000, 8000, 8000, 6666, 6666],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  bg_cc: {
    child: 1000,
    prob: [22222, 22222, 16666, 16666, 10000, 10000],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  bg_nana_suzu_lulu: {
    prob: [0, 4, 4, 20, 20, 20],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  bg_lulu_heroine: {
    prob: [0, 0, 0, 100, 100, 100],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  bg_black_knights: {
    prob: [0, 0, 0, 0, 200, 200],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  bg_oz: {
    prob: [0, 0, 0, 0, 0, 200],
    kKeys: [
      'bg_default',
      'bg_kallen',
      'bg_photo',
      'bg_cc',
      'bg_nana_suzu_lulu',
      'bg_lulu_heroine',
      'bg_black_knights',
      'bg_oz',
    ],
  },
  // ed_bg_default: { prob: [], kKeys: [] },
  // ed_bg_gathering: { prob: [], kKeys: [] },
  at_infinite_promotion: {
    child: 10,
    prob: [9930, 9930, 9638, 5958, 4256, 3310],
    kKeys: ['ed_bg_gathering'],
  },
  tr_bronze: {
    prob: [0, 1, 1, 1, 1, 1],
    kKeys: ['all_games'],
  },
  tr_silver: {
    prob: [0, 0, 1, 1, 1, 1],
    kKeys: ['all_games'],
  },
  tr_gold: {
    prob: [0, 0, 0, 1, 1, 1],
    kKeys: ['all_games'],
  },
  tr_kirin: {
    prob: [0, 0, 0, 0, 1, 1],
    kKeys: ['all_games'],
  },
  tr_rainbow: {
    prob: [0, 0, 0, 0, 0, 1],
    kKeys: ['all_games'],
  },
};

export type InputForm = {
  [key in Elements]: number | '';
};

const getKeys = <T extends Record<string, unknown>>(obj: T): (keyof T)[] =>
  Object.keys(obj);

const App = (): JSX.Element => {
  const [settings, setSettings] = useState(Array<string>(6).fill('-'));

  const defaultValues = ElementsArr.reduce((a, c) => {
    a[c] = '';
    return a;
  }, {} as InputForm);

  const { register, handleSubmit, reset } = useForm<InputForm>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    const checkData = ElementsArr.reduce(
      (a, c) => {
        const num = data[c];
        if (num !== '') a[c] = num;
        return a;
      },
      {} as { [key in Elements]?: number },
    );

    const results = await Promise.all(
      getKeys(checkData).flatMap((key) => {
        const data = CalcData[key];
        if (data == null || data.prob.length === 0) return [];

        const n = data.kKeys
          .map((v) => checkData[v])
          .filter((v): v is number => typeof v == 'number')
          .reduce((a, c) => a + c, 0);
        if (n === 0) return [];

        const k = checkData[key] as number;
        const p1 = data.child || 1;

        return [probCalc(n, k, p1, data.prob)];
      }),
    );

    if (results.length === 0) return setSettings(Array(6).fill('-'));

    const ratio = results.reduce(
      (a, c) => a.map((v, i) => v * c[i]),
      Array<number>(6).fill(1),
    );
    const ratioSum = ratio.reduce((a, c) => a + c);

    setSettings(
      ratio.map((r) => (Math.round((r / ratioSum) * 1000) / 10).toString()),
    );
  };

  const onReset = () => {
    if (!window.confirm('リセットしますか？')) return;
    reset();
    setSettings(Array(6).fill('-'));
  };

  return (
    <>
      <CssBaseline />
      <Container>
      <Typography variant="h3">判別機</Typography>
        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid xs={12} md={8}>
            <InputArea register={register} />
          </Grid>
          <Grid xs={12} md={4}>
            <Box>
              <Stack spacing={2} direction="row">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  color="primary"
                >
                  計算
                </Button>
                <Button onClick={onReset} variant="contained" color="warning">
                  リセット
                </Button>
              </Stack>
            </Box>
            <Box>
              <List dense={true}>
                {settings.map((v, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={`設定${i + 1}： ${v} ％`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
