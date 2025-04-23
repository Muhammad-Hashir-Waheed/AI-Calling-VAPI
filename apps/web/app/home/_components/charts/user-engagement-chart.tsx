'use client';

import { useMemo, useState } from 'react';

import { ChevronDown } from 'lucide-react';
import { Pie, PieChart, PieLabelRenderProps } from 'recharts';

import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@kit/ui/chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@kit/ui/tabs';

import { Figure, Trend } from './common-chart-components';

type Bot = 'user_1' | 'user_2' | 'user_3' | 'user_4';

type Week = keyof typeof weeklyData;

const weeks = ['last_week', '2_weeks_ago', '3_weeks_ago', '4_weeks_ago'];

const weeklyData = {
  last_week: {
    totalMinutes: 15800,
    percentageChange: 5,
    isIncrease: true,
    users: {
      user_1: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 70,
        remainingPercentage: 30,
      },
      user_2: {
        used: 10500,
        remaining: 4500,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      user_3: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      user_4: {
        used: 9800,
        remaining: 4200,
        usedPercentage: 30,
        remainingPercentage: 70,
      },
    },
    usedPercentage: 70,
    remainingPercentage: 30,
  },
  '2_weeks_ago': {
    totalMinutes: 14200,
    percentageChange: 3,
    isIncrease: true,
    users: {
      user_1: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 70,
        remainingPercentage: 30,
      },
      user_2: {
        used: 10500,
        remaining: 4500,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      user_3: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      user_4: {
        used: 9800,
        remaining: 4200,
        usedPercentage: 30,
        remainingPercentage: 70,
      },
    },
    usedPercentage: 65,
    remainingPercentage: 35,
  },
  '3_weeks_ago': {
    totalMinutes: 13800,
    percentageChange: 2,
    isIncrease: false,
    users: {
      user_1: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 70,
        remainingPercentage: 30,
      },
      user_2: {
        used: 10500,
        remaining: 4500,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      user_3: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      user_4: {
        used: 9800,
        remaining: 4200,
        usedPercentage: 30,
        remainingPercentage: 70,
      },
    },
    usedPercentage: 60,
    remainingPercentage: 40,
  },
  '4_weeks_ago': {
    totalMinutes: 14100,
    percentageChange: 4,
    isIncrease: true,
    users: {
      user_1: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      user_2: {
        used: 10500,
        remaining: 4500,

        usedPercentage: 70,
        remainingPercentage: 30,
      },
      user_3: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      user_4: {
        used: 9800,
        remaining: 4200,
        usedPercentage: 30,
        remainingPercentage: 70,
      },
    },
    usedPercentage: 68,
    remainingPercentage: 32,
  },
};

const botsData = [
  { name: 'User 1', value: 'user_1' },
  { name: 'User 2', value: 'user_2' },
  { name: 'User 3', value: 'user_3' },
  { name: 'User 4', value: 'user_4' },
];

const RADIAN = Math.PI / 180;
const chartConfig = {
  usedMinutes: {
    label: 'Used Minutes',
    color: 'hsl(var(--color-brand-800))',
  },
  remainingMinutes: {
    label: 'Remaining Minutes',
    color: 'hsl(var(--color-brand-600))',
  },
} satisfies ChartConfig;

export function UserEngagementChart() {
  const [selectedWeek, setSelectedWeek] = useState<Week>('last_week');
  const [selectedUser, setSelectedUser] = useState<Bot>('user_1');

  const currentWeekData = useMemo(
    () => weeklyData[selectedWeek],
    [selectedWeek],
  );

  const chartData = useMemo(
    () => [
      {
        name: 'usedMinutes',
        value: currentWeekData.users[selectedUser].usedPercentage,
        fill: 'var(--color-brand-800)',
      },
      {
        name: 'remainingMinutes',
        value: currentWeekData.users[selectedUser].remainingPercentage,
        fill: 'var(--color-brand-600)',
      },
    ],
    [currentWeekData.users, selectedUser],
  );

  const CustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: Required<PieLabelRenderProps>) => {
    const radius =
      Number(innerRadius) +
      (Number(outerRadius) - Number(innerRadius)) * 0.5 -
      10;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={Number(x) > Number(cx) ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="bg-brand-slate-50 border-brand-slate-100 rounded-md p-4 pb-0">
      <CardHeader className="p-0">
        <CardTitle
          className={
            'text-brand-slate-800 flex items-center justify-between gap-2.5 font-bold'
          }
        >
          <span>User Engagement</span>
          <Trend trend={'up'}>8%</Trend>
        </CardTitle>

        <CardDescription className="text-brand-slate-500 justify-between p-0">
          <div className="flex w-full items-center justify-between">
            <span>Weekly View</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button
                  variant="outline"
                  className="bg-brand-slate-100 border-brand-slate-200 text-brand-slate-900 max-h-[28px] rounded-[4px] px-3 py-0 text-sm capitalize"
                >
                  {selectedWeek.replaceAll('_', ' ')}
                  <ChevronDown
                    className="ml-2 h-4 w-4"
                    color="var(--color-brand-slate-900)"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-brand-slate-100">
                {weeks.map((week) => (
                  <DropdownMenuItem
                    key={week}
                    onClick={() => setSelectedWeek(week as Week)}
                    className="cursor-pointer"
                  >
                    {week.replaceAll('_', ' ')}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardDescription>

        <div className="flex items-center gap-2">
          <Figure>{Number(1023).toLocaleString()}</Figure>
          <span
            className={'font-heading text-brand-800 text-2xl font-semibold'}
          >
            Total Mins
          </span>
        </div>
      </CardHeader>

      <CardContent className="w-full p-0 pt-1.5">
        <Tabs
          value={selectedUser}
          onValueChange={(v) => setSelectedUser(v as Bot)}
          className="w-full"
        >
          <TabsList className="border-brand-slate-300 h-fit w-full justify-between overflow-x-auto rounded-[6px] border-1 bg-white">
            {botsData.map((prod) => (
              <TabsTrigger
                key={prod.value}
                value={prod.value}
                className="data-[state=active]:bg-brand-50 text-brand-slate-800 flex-1 cursor-pointer rounded-[6px] bg-white py-2 text-xs"
              >
                {prod.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <CardContent className="w-full p-0">
          <ChartContainer
            id="pie-interactive"
            config={chartConfig}
            className="m-0 min-h-[180px] w-full justify-between p-0"
          >
            <PieChart width={250} height={250}>
              <ChartTooltip content={<ChartTooltipContent separator=":" />} />
              <Pie
                data={chartData}
                outerRadius={70}
                dataKey="value"
                label={CustomizedLabel}
                labelLine={false}
              />
              <ChartLegend
                content={<ChartLegendContent />}
                verticalAlign="top"
                iconType="circle"
                className="rounded-full pb-5 text-[8px]"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </CardContent>
    </Card>
  );
}
