import { useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import { type Elements, ElementsArr, type InputForm } from './App';

const InpuitList = [
  {
    label: 'ゲーム数',
    input: [
      { name: '総ゲーム数', key: 'all_games' },
      // { name: 'ATゲーム数', key: 'at_games' },
    ],
  },
  {
    label: '子役',
    input: [
      { name: 'チェリー', key: 'cherry' },
      { name: 'スイカ', key: 'suica' },
      // { name: 'チャンス目', key: 'chance' },
    ],
  },
  {
    label: 'ボーナス',
    input: [
      { name: 'HBB', key: 'b_hbb' },
      { name: 'NBB', key: 'b_nbb' },
      { name: 'RB', key: 'b_rb' },
      { name: 'チェリー+RB', key: 'b_cherry_rb' },
      { name: 'チャンス目+RB', key: 'b_chance_rb' },
      { name: '共通ベル+赤7', key: 'b_bell_red7' },
    ],
  },
  {
    label: '終了背景',
    input: [
      { name: 'デフォルト', key: 'bg_default' },
      { name: 'カレン', key: 'bg_kallen' },
      { name: '写真', key: 'bg_photo' },
      { name: 'C.C.', key: 'bg_cc' },
      { name: 'ナナリー&スザク&ルルーシュ', key: 'bg_nana_suzu_lulu' },
      { name: 'ルルーシュ&ヒロイン', key: 'bg_lulu_heroine' },
      { name: '黒の騎士団', key: 'bg_black_knights' },
      { name: '双貌のオズ', key: 'bg_oz' },
      // { name: '[ED]デフォルト', key: 'ed_bg_default' },
      // { name: '[ED]集合', key: 'ed_bg_gathering' },
    ],
  },
  // {
  //   label: 'AT',
  //   input: [
  //     { name: 'カットイン高確G数', key: 'at_cutin_high_games' },
  //     { name: '無限昇格回数', key: 'at_infinite_promotion' },
  //   ],
  // },
  {
    label: 'その他',
    input: [
      { name: '銅トロフィー', key: 'tr_bronze' },
      { name: '銀トロフィー', key: 'tr_silver' },
      { name: '金トロフィー', key: 'tr_gold' },
      { name: 'キリントロフィー', key: 'tr_kirin' },
      { name: '虹トロフィー', key: 'tr_rainbow' },
    ],
  },
];

const isElements = (arg: string): arg is Elements =>
  ElementsArr.some((v) => v === arg);

export const InputArea = (props: {
  register: UseFormRegister<InputForm>;
}): JSX.Element => {
  const { register } = props;
  const [tab, setTab] = useState('1');

  const handleChange = (_: unknown, newValue: string) => setTab(newValue);

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {InpuitList.map(({ label }, i) => (
                <Tab key={i} label={label} value={i.toString()} />
              ))}
            </TabList>
          </Box>
          {InpuitList.map(({ input }, i) => (
            <TabPanel key={i} value={i.toString()}>
              <Stack component="form" spacing={2} autoComplete="off">
                {input.map(({ name, key }) => (
                  <TextField
                    {...(isElements(key) &&
                      register(key, {
                        setValueAs: (value: string) =>
                          value === '' ? '' : Number(value),
                      }))}
                    key={key}
                    label={name}
                    name={key}
                    type="number"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                ))}
              </Stack>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};
