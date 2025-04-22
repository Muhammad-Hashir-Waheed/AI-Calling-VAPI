'use client';

import { AverageCallDurationByBatchChart } from './charts/average-call-duration-by-batch-chart';
import { BotUsageChart } from './charts/bot-usage-chart';
import { CallEndedReasonChart } from './charts/call-ended-reason-chart';
import { CallMinutesChartByBot } from './charts/call-minutes-chart-by-bot';
import { CallMinutesChartByProperty } from './charts/call-minutes-chart-by-property';
import { CallSuccessRateChart } from './charts/call-success-rate-chart';
import { ConcurrentCallsChart } from './charts/concurrent-calls-chart';
import { CostBreakdownByPropertyChart } from './charts/cost-breakdown-by-property-chart';
import { ProductUsageChart } from './charts/product-usage-chart';
import { TotalCallsNumberChart } from './charts/total-calls-number-chart';
import { UserEngagementChart } from './charts/user-engagement-chart';
import { VoicemailRateChart } from './charts/voicemail-rate-chart';

export default function Dashboard() {
  function SectionTitle(props: React.PropsWithChildren) {
    return (
      <h1
        className={
          'font-heading text-brand-slate-800 mb-6 text-xl leading-none font-semibold tracking-tight dark:text-white'
        }
      >
        {props.children}
      </h1>
    );
  }

  return (
    <div
      className={
        'animate-in fade-in flex flex-col space-y-4 pb-36 duration-500'
      }
    >
      <section>
        <SectionTitle>Summary Statistics</SectionTitle>
        <div
          className={
            'grid grid-cols-1 gap-9 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
          }
        >
          <CallMinutesChartByProperty />
          <CallMinutesChartByBot />
          <TotalCallsNumberChart />
          <CostBreakdownByPropertyChart />
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle>Analysis</SectionTitle>
        <div
          className={
            'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
          }
        >
          <CallSuccessRateChart />
          <CallEndedReasonChart />
          <AverageCallDurationByBatchChart />
          <VoicemailRateChart />
          <ProductUsageChart />
          <BotUsageChart />
          <UserEngagementChart />
          <ConcurrentCallsChart />
        </div>
      </section>
    </div>
  );
}
