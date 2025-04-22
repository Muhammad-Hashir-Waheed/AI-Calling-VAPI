'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';
import { Bar, BarChart, BarProps, XAxis, YAxis } from 'recharts';

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

type ViewType = string;

export function CallEndedReasonChart() {
  const [viewType, setViewType] = useState<ViewType>('property1');
  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i)),
  );

  const chartConfig = {
    completedSuccessfully: {
      label: 'Completed Successfully',
      color: '#22C55E',
    },
    agentDisconnected: {
      label: 'Agent Disconnected',
      color: '#3B82F6',
    },
    voicemailReached: {
      label: 'Voicemail Reached',
      color: '#6B3FE8',
    },
    noAnswer: {
      label: 'No Answer',
      color: '#6B7280',
    },
    customerHungUp: {
      label: 'Customer Hung Up',
      color: '#EF4444',
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      week: 'Week 1',
      completedSuccessfully: 110,
      agentDisconnected: 140,
      voicemailReached: 120,
      noAnswer: 130,
      customerHungUp: 64,
      total: 500,
    },
    {
      week: 'Week 2',
      completedSuccessfully: 80,
      agentDisconnected: 100,
      voicemailReached: 120,
      noAnswer: 110,
      customerHungUp: 64,
      total: 410,
    },
    {
      week: 'Week 3',
      completedSuccessfully: 140,
      agentDisconnected: 150,
      voicemailReached: 160,
      noAnswer: 150,
      customerHungUp: 64,
      total: 600,
    },
    {
      week: 'Week 4',
      completedSuccessfully: 80,
      agentDisconnected: 100,
      voicemailReached: 120,
      noAnswer: 100,
      customerHungUp: 64,
      total: 400,
    },
  ];

  const CustomBar = (props: BarProps) => {
    const { fill, x, y, width, height } = props;
    const gradientId = `paint0_linear_2162_11030_${Math.random()}`;
    return (
      <svg
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox="0 0 18 70"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id={`path-1-inside-1_2162_11030`} fill="white">
          <path d="M0.900024 0H17.3V70H0.900024V0Z" />
        </mask>
        <path
          d="M0.900024 0H17.3V70H0.900024V0Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M0.900024 2H17.3V-2H0.900024V2Z"
          fill={fill}
          mask={`url(#path-1-inside-1_2162_11030)`}
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="9.10002"
            y1="0"
            x2="9.10002"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={fill} stopOpacity="0.1" />
            <stop offset="1" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
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
          <span>Reason Call Ended</span>
          <Trend trend={'down'}>8%</Trend>
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
        </div>
      </CardHeader>

      <CardContent className="w-full p-0 pt-1.5">
        <Tabs
          value={viewType}
          onValueChange={(v) => setViewType(v as ViewType)}
          className="mb-5 w-full"
        >
          <TabsList className="border-brand-slate-300 h-fit w-full justify-between overflow-x-auto rounded-[6px] border-1 bg-white">
            {['Property 1', 'Property 2', 'Property 3', 'Property 4'].map(
              (property) => (
                <TabsTrigger
                  key={property}
                  value={property}
                  className="data-[state=active]:bg-brand-50 text-brand-slate-800 flex-1 cursor-pointer rounded-[6px] bg-white py-2 text-xs"
                >
                  {property}
                </TabsTrigger>
              ),
            )}
          </TabsList>
        </Tabs>

        <CardContent className="w-full p-0">
          <ChartContainer
            config={chartConfig}
            className="m-0 min-h-[190px] w-full justify-between p-0"
          >
            <BarChart
              data={chartData}
              margin={{
                left: -26,
                right: -15,
              }}
              barCategoryGap={0}
              barGap={0}
              barSize={100}
            >
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
                content={<ChartLegendContent className="w-min" />}
                verticalAlign="top"
                iconType="circle"
                className="w-full gap-1 text-[8px] [&>div]:w-min"
              />
              <Bar
                dataKey="agentDisconnected"
                fill="#3B82F6"
                shape={CustomBar}
              />
              <Bar
                dataKey="completedSuccessfully"
                fill="#22C55E"
                shape={CustomBar}
              />
              <Bar
                dataKey="voicemailReached"
                fill="#6B3FE8"
                shape={CustomBar}
              />
              <Bar dataKey="noAnswer" fill="#6B7280" shape={CustomBar} />
              <Bar dataKey="customerHungUp" fill="#EF4444" shape={CustomBar} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </CardContent>
    </Card>
  );
}
