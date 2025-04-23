'use client';

import { ChevronDown } from 'lucide-react';
import { Bar, BarChart, ReferenceLine, XAxis, YAxis } from 'recharts';

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

import { Figure, Trend } from './common-chart-components';

export function AverageCallDurationByBatchChart() {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i)),
  );

  const chartConfig = {
    batch1: {
      label: 'Batch 1',
      color: 'hsl(var(--chart-1))',
    },
    batch2: {
      label: 'Batch 2',
      color: 'hsl(var(--chart-2))',
    },
    batch3: {
      label: 'Batch 3',
      color: 'hsl(var(--chart-3))',
    },
    batch4: {
      label: 'Batch 4',
      color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      week: 'Week 1',
      batch1: 10,
      batch2: 4,
      batch3: 7,
      batch4: 3,
      total: 25,
    },
    {
      week: 'Week 2',
      batch1: 8,
      batch2: 7,
      batch3: 12,
      batch4: 1,
      total: 28,
    },
    {
      week: 'Week 3',
      batch1: 9,
      batch2: 5,
      batch3: 6,
      batch4: 15,
      total: 35,
    },
    {
      week: 'Week 4',
      batch1: 8,
      batch2: 10,
      batch3: 12,
      batch4: 10,
      total: 50,
    },
  ];

  const CustomLabel = (props: { viewBox: { y: number } }) => (
    <svg
      x={10}
      y={props.viewBox.y - 10}
      width="61"
      height="20"
      viewBox="0 0 61 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H51V20H4C1.79086 20 0 18.2091 0 16V4Z"
        fill="#4A24AB"
      />
      <foreignObject width={60} height={20}>
        <div className="text-brand-50 flex h-[20px] w-full items-center pl-1 text-center text-[8px] font-[400]">
          Avg 5m 30s
        </div>
      </foreignObject>
      <path
        d="M60.2929 9.29289C60.6834 9.68342 60.6834 10.3166 60.2929 10.7071L51 20L51 -4.37114e-07L60.2929 9.29289Z"
        fill="#4A24AB"
      />
    </svg>
  );

  return (
    <Card className="bg-brand-slate-50 border-brand-slate-100 rounded-md p-4 pb-0">
      <CardHeader className="mb-3 p-0">
        <CardTitle
          className={
            'text-brand-slate-800 flex items-center justify-between gap-2.5 font-bold'
          }
        >
          <span>Average Call Duration by Batch</span>
          <Trend trend={'up'}>30%</Trend>
        </CardTitle>

        <CardDescription className="text-brand-slate-500 justify-between p-0">
          <div className="flex w-full items-center justify-between">
            <span>Monthly View</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button
                  variant="outline"
                  className="bg-brand-slate-100 border-brand-slate-200 text-brand-slate-900 max-h-[28px] rounded-[4px] px-3 py-0 text-sm"
                >
                  April
                  <ChevronDown
                    className="ml-2 h-4 w-4"
                    color="var(--color-brand-slate-900)"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-brand-slate-100">
                {months.map((month) => (
                  <DropdownMenuItem
                    key={month}
                    // onClick={() => setSelectedMonth(month)}
                    className="cursor-pointer"
                  >
                    {month}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardDescription>

        <div className="flex items-center gap-2">
          <Figure>{Number(6016).toLocaleString()}</Figure>
          <span
            className={'font-heading text-brand-800 text-2xl font-semibold'}
          >
            Mins
          </span>
        </div>
      </CardHeader>

      <CardContent className="w-full p-0">
        <ChartContainer
          config={chartConfig}
          className="m-0 min-h-[245px] w-full justify-between p-0"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -26,
              right: -15,
            }}
          >
            <XAxis
              className="mr-10 text-[8px]"
              dataKey="week"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <YAxis
              className="text-[8px]"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              unit="Min"
              width={80}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend
              content={<ChartLegendContent />}
              verticalAlign="top"
              iconType="circle"
              className="mb-5 text-[10px]"
            />
            <Bar dataKey="batch1" stackId="a" fill="#5C2DD4" barSize={28} />
            <Bar dataKey="batch2" stackId="a" fill="#37ADFA" barSize={28} />
            <Bar dataKey="batch3" stackId="a" fill="#A5B4FC" barSize={28} />
            <Bar dataKey="batch4" stackId="a" fill="#94A3B8" barSize={28} />

            <ReferenceLine
              y={5.5}
              stroke="#5C2DD4"
              strokeDasharray="3 3"
              strokeWidth={1.5}
              label={CustomLabel}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
