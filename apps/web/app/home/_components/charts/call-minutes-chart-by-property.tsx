'use client';

import { ChevronDown } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

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

export function CallMinutesChartByProperty() {
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
      property1: 1100,
      property2: 1400,
      property3: 1200,
      property4: 1300,
      total: 5000,
    },
    {
      week: 'Week 2',
      property1: 800,
      property2: 1000,
      property3: 1200,
      property4: 1100,
      total: 4100,
    },
    {
      week: 'Week 3',
      property1: 1400,
      property2: 1500,
      property3: 1600,
      property4: 1500,
      total: 6000,
    },
    {
      week: 'Week 4',
      property1: 800,
      property2: 1000,
      property3: 1200,
      property4: 1000,
      total: 4000,
    },
  ];

  return (
    <Card className="bg-brand-slate-50 border-brand-slate-100 rounded-md p-4 pb-0">
      <CardHeader className="p-0">
        <CardTitle
          className={
            'text-brand-slate-800 flex items-center justify-between gap-2.5 font-bold'
          }
        >
          <span>Total Call Minutes By Property</span>
          <Trend trend={'up'}>20%</Trend>
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
            Minutes
          </span>
        </div>
      </CardHeader>

      <CardContent className="w-full p-0">
        <ChartContainer
          config={chartConfig}
          className="m-0 -ml-5 min-h-[223px] w-[110%] justify-between p-0"
        >
          <BarChart accessibilityLayer data={chartData} width={730}>
            <XAxis
              className="text-[8px]"
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
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend
              content={<ChartLegendContent />}
              verticalAlign="top"
              iconType="circle"
              className="mb-8 text-[10px]"
            />
            <Bar dataKey="property1" stackId="a" fill="#5C2DD4" barSize={28} />
            <Bar dataKey="property2" stackId="a" fill="#37ADFA" barSize={28} />
            <Bar dataKey="property3" stackId="a" fill="#A5B4FC" barSize={28} />
            <Bar dataKey="property4" stackId="a" fill="#94A3B8" barSize={28} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
