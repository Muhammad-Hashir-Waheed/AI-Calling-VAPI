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

type Product = 'product_a' | 'product_b' | 'product_c' | 'product_d';

type Week = keyof typeof weeklyData;

const weeks = ['last_week', '2_weeks_ago', '3_weeks_ago', '4_weeks_ago'];

const weeklyData = {
  last_week: {
    totalMinutes: 15800,
    percentageChange: 5,
    isIncrease: true,
    products: {
      product_a: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 70,
        remainingPercentage: 30,
      },
      product_b: {
        used: 10500,
        remaining: 4500,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      product_c: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      product_d: {
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
    products: {
      product_a: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 70,
        remainingPercentage: 30,
      },
      product_b: {
        used: 10500,
        remaining: 4500,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      product_c: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      product_d: {
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
    products: {
      product_a: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 70,
        remainingPercentage: 30,
      },
      product_b: {
        used: 10500,
        remaining: 4500,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      product_c: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      product_d: {
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
    products: {
      product_a: {
        used: 8400,
        remaining: 3600,
        usedPercentage: 25,
        remainingPercentage: 75,
      },
      product_b: {
        used: 10500,
        remaining: 4500,

        usedPercentage: 70,
        remainingPercentage: 30,
      },
      product_c: {
        used: 7000,
        remaining: 3000,
        usedPercentage: 91,
        remainingPercentage: 9,
      },
      product_d: {
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

const productsData = [
  { name: 'Product A', value: 'product_a' },
  { name: 'Product B', value: 'product_b' },
  { name: 'Product C', value: 'product_c' },
  { name: 'Product D', value: 'product_d' },
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

export function ProductUsageChart() {
  const [selectedWeek, setSelectedWeek] = useState<Week>('last_week');
  const [selectedProduct, setSelectedProduct] = useState<Product>('product_a');

  const currentWeekData = useMemo(
    () => weeklyData[selectedWeek],
    [selectedWeek],
  );

  const chartData = useMemo(
    () => [
      {
        name: 'usedMinutes',
        value: currentWeekData.products[selectedProduct].usedPercentage,
        fill: 'var(--color-brand-800)',
      },
      {
        name: 'remainingMinutes',
        value: currentWeekData.products[selectedProduct].remainingPercentage,
        fill: 'var(--color-brand-600)',
      },
    ],
    [currentWeekData.products, selectedProduct],
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
          <span>Product Usage</span>
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
          value={selectedProduct}
          onValueChange={(v) => setSelectedProduct(v as Product)}
          className="w-full"
        >
          <TabsList className="border-brand-slate-300 h-fit w-full justify-between overflow-x-auto rounded-[6px] border-1 bg-white">
            {productsData.map((prod) => (
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
