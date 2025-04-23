import React, { useMemo } from 'react';

import { ArrowDown, ArrowUp, Menu } from 'lucide-react';
import { DotProps } from 'recharts';

import { Badge } from '@kit/ui/badge';

function Trend(
  props: React.PropsWithChildren<{
    trend: 'up' | 'down' | 'stale';
  }>,
) {
  const Icon = useMemo(() => {
    switch (props.trend) {
      case 'up':
        return <ArrowUp className={'h-3 w-3 text-green-500'} />;
      case 'down':
        return <ArrowDown className={'text-destructive h-3 w-3'} />;
      case 'stale':
        return <Menu className={'h-3 w-3 text-orange-500'} />;
    }
  }, [props.trend]);

  return (
    <div>
      <BadgeWithTrend trend={props.trend}>
        <span className={'flex items-center space-x-1'}>
          {Icon}
          <span>{props.children}</span>
        </span>
      </BadgeWithTrend>
    </div>
  );
}

function BadgeWithTrend(props: React.PropsWithChildren<{ trend: string }>) {
  const className = useMemo(() => {
    switch (props.trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-destructive';
      case 'stale':
        return 'text-orange-500';
    }
  }, [props.trend]);

  return (
    <Badge
      variant={'outline'}
      className={'border-transparent px-1.5 font-normal'}
    >
      <span className={className}>{props.children}</span>
    </Badge>
  );
}

function Figure(props: React.PropsWithChildren) {
  return (
    <div className={'font-heading text-2xl font-semibold normal-nums'}>
      {props.children}
    </div>
  );
}

function CustomActiveDot(props: DotProps) {
  const { cx, cy } = props;

  return (
    <svg
      x={Number(cx) - 13}
      y={Number(cy) - 13}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2" filter="url(#filter0_d_20_82)">
        <ellipse
          cx="13.2864"
          cy="12"
          rx="11.5392"
          ry="12"
          fill="var(--color-brand-600)"
        />
      </g>
      <g filter="url(#filter1_d_20_82)">
        <ellipse cx="13.2873" cy="12" rx="7.84664" ry="8" fill="white" />
        <path
          d="M19.634 12C19.634 15.6174 16.7652 18.5 13.2873 18.5C9.8094 18.5 6.94067 15.6174 6.94067 12C6.94067 8.38265 9.8094 5.5 13.2873 5.5C16.7652 5.5 19.634 8.38265 19.634 12Z"
          stroke="var(--color-brand-600)"
          strokeWidth="3"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_20_82"
          x="0.747192"
          y="0"
          width="25.0784"
          height="26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_20_82"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_20_82"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_20_82"
          x="4.44067"
          y="4"
          width="17.6932"
          height="18"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_20_82"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_20_82"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export { Trend, BadgeWithTrend, Figure, CustomActiveDot };
