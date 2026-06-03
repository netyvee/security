import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = new Date();

    // Calculate next scheduled times based on current date/time
    const getNextMonday9AM = () => {
      const next = new Date(now);
      next.setDate(next.getDate() + ((1 + 7 - next.getDay()) % 7 || 7));
      next.setHours(9, 0, 0, 0);
      return next.toISOString();
    };

    const getNextThursday9AM = () => {
      const next = new Date(now);
      next.setDate(next.getDate() + ((4 + 7 - next.getDay()) % 7 || 7));
      next.setHours(9, 0, 0, 0);
      return next.toISOString();
    };

    const getTomorrow7AM = () => {
      const next = new Date(now);
      next.setDate(next.getDate() + 1);
      next.setHours(7, 0, 0, 0);
      return next.toISOString();
    };

    const agents = [
      {
        name: 'Site Agent',
        description: 'Daily health checks and auto-fixes',
        schedule: 'Daily at 7:00 AM',
        lastRun: null,
        nextRun: getTomorrow7AM(),
        status: 'active',
        actionsThisWeek: 0,
        lastAction: null,
      },
      {
        name: 'Content Agent',
        description: 'Weekly blog draft generation',
        schedule: 'Monday at 9:00 AM',
        lastRun: null,
        nextRun: getNextMonday9AM(),
        status: 'active',
        draftsWaiting: 0,
        lastDraft: null,
      },
      {
        name: 'SEO Agent',
        description: 'Thursday CTR analysis and optimisation',
        schedule: 'Thursday at 9:00 AM',
        lastRun: null,
        nextRun: getNextThursday9AM(),
        status: 'active',
        pagesOptimised: 0,
        lastOptimisation: null,
      },
      {
        name: 'Borough Agent',
        description: 'On-demand borough page creation',
        schedule: 'On demand',
        lastRun: null,
        nextRun: null,
        status: 'standby',
        pagesCreated: 0,
      },
      {
        name: 'Support Agent',
        description: 'Always-on issue diagnosis and fixing',
        schedule: 'Always on',
        lastRun: now.toISOString(),
        nextRun: null,
        status: 'active',
        issuesResolvedToday: 0,
        currentQueue: 0,
      },
    ];

    return NextResponse.json({
      agents,
      autonomous_mode: true,
      checked_at: now.toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, agents: [], autonomous_mode: false },
      { status: 500 }
    );
  }
}
