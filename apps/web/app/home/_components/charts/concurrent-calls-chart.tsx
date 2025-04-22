'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/types';

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

import { CustomActiveDot, Figure, Trend } from './common-chart-components';

type ViewType = 'bots' | 'property';

export function ConcurrentCallsChart() {
  const [viewType, setViewType] = useState<ViewType>('bots');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i)),
  );

  const chartConfig = {
    property1: {
      label: 'Property 1',
      color: 'hsl(var(--chart-1))',
    },
    property2: {
      label: 'Property 2',
      color: 'hsl(var(--chart-2))',
    },
    property3: {
      label: 'Property 3',
      color: 'hsl(var(--chart-3))',
    },
    property4: {
      label: 'Property 4',
      color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      week: 'Week 1',
      property: 75,
      Bot: 75,
    },
    {
      week: 'Week 2',
      property: 20,
      Bot: 27,
    },
    {
      week: 'Week 3',
      property: 78,
      Bot: 98,
    },
    {
      week: 'Week 4',
      property: 39,
      Bot: 29,
    },
  ];

  const handleMouseMove = (data: CategoricalChartState) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setActiveIndex(data.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="bg-brand-slate-50 border-brand-slate-100 rounded-md p-4 pb-0">
      <CardHeader className="p-0">
        <CardTitle
          className={
            'text-brand-slate-800 flex items-center justify-between gap-2.5 font-bold'
          }
        >
          <span>Number of Concurrent Calls</span>
          <Trend trend={'up'}>5%</Trend>
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
          <Figure>{Number(1023).toLocaleString()}</Figure>
          <span
            className={'font-heading text-brand-800 text-2xl font-semibold'}
          >
            Calls
          </span>
          <span className="text-brand-slate-500 text-sm">Avg 5 mins Call</span>
        </div>
      </CardHeader>

      <CardContent className="w-full p-0 pt-1.5">
        <Tabs
          value={viewType}
          onValueChange={(v) => setViewType(v as ViewType)}
          className="mb-5 w-full"
        >
          <TabsList className="border-brand-slate-300 h-fit w-full justify-between rounded-[6px] border-1 bg-white">
            <TabsTrigger
              value="bots"
              className="data-[state=active]:bg-brand-50 text-brand-slate-800 flex-1 cursor-pointer rounded-[6px] bg-white py-2 text-xs"
            >
              Bots
            </TabsTrigger>
            <TabsTrigger
              value="property"
              className="data-[state=active]:bg-brand-50 text-brand-slate-800 flex-1 cursor-pointer rounded-[6px] rounded-r-none bg-white py-2 text-xs"
            >
              Property
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <ChartContainer
          config={chartConfig}
          className="m-0 min-h-[166px] justify-between p-0"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -26,
              top: 20,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <XAxis
              className="text-[8px]"
              dataKey="week"
              tickLine={true}
              tickMargin={5}
              axisLine={{
                width: 1,
                stroke: '#E9E9E9',
              }}
            />
            <YAxis
              className="text-[8px]"
              tickMargin={5}
              axisLine={false}
              tickLine={false}
            />
            <CartesianGrid
              vertical={true}
              horizontal={false}
              strokeDasharray="5 5"
            />
            <ChartTooltip content={<ChartTooltipContent />} />

            {activeIndex !== null && (
              <ReferenceLine
                x={chartData[activeIndex]?.week}
                stroke="var(--color-brand-600)"
                strokeDasharray="3 3"
              />
            )}
            <Line
              dataKey="property"
              type="monotone"
              stroke="var(--color-brand-600)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
              activeDot={<CustomActiveDot />}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
