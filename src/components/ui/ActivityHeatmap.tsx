"use client";

import { useEffect, useMemo, useRef } from "react";
import { State } from "@/lib/state";
import clsx from "clsx";

export function ActivityHeatmap({ state }: { state: State }) {
  const activityLog = state.progress.activityLog || [];
  
  const stats = useMemo(() => {
    const uniqueDates = Array.from(
      new Set(activityLog.map(d => new Date(d).toISOString().split("T")[0]))
    ).sort();
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < uniqueDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(uniqueDates[i - 1]);
        const currDate = new Date(uniqueDates[i]);
        const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          if (tempStreak > longestStreak) longestStreak = tempStreak;
          tempStreak = 1;
        }
      }
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;

    const todayStr = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (uniqueDates.length > 0) {
      const lastDateStr = uniqueDates[uniqueDates.length - 1];
      if (lastDateStr === todayStr || lastDateStr === yesterdayStr) {
        currentStreak = 0;
        let curr = new Date(lastDateStr);
        let j = uniqueDates.length - 1;
        while (j >= 0) {
          const checkStr = new Date(uniqueDates[j]).toISOString().split("T")[0];
          if (checkStr === curr.toISOString().split("T")[0]) {
            currentStreak++;
            curr.setDate(curr.getDate() - 1);
            j--;
          } else {
            break;
          }
        }
      } else {
        currentStreak = 0;
      }
    }

    const hours = activityLog.map(d => new Date(d).getHours());
    const hourCounts = hours.reduce((acc, h) => {
      acc[h] = (acc[h] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    let peakHour = "N/A";
    let maxCount = 0;
    for (const h in hourCounts) {
      if (hourCounts[h] > maxCount) {
        maxCount = hourCounts[h];
        const hr = parseInt(h);
        peakHour = hr === 0 ? "12 AM" : hr < 12 ? `${hr} AM` : hr === 12 ? "12 PM" : `${hr - 12} PM`;
      }
    }

    return {
      sessions: activityLog.length,
      messages: state.plankyChat.length,
      activeDays: uniqueDates.length,
      currentStreak,
      longestStreak,
      peakHour,
      uniqueDates
    };
  }, [activityLog, state.plankyChat.length]);

  const heatmap = useMemo(() => {
    const WEEKS = 24;
    const DAYS_IN_WEEK = 7;
    const cells: { date: string, active: boolean, future: boolean, count: number }[][] = Array.from({ length: WEEKS }, () => []);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDayOfWeek = today.getDay();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (WEEKS - 1) * DAYS_IN_WEEK - currentDayOfWeek);

    let currentRenderDate = new Date(startDate);
    
    const dateCounts = activityLog.reduce((acc, d) => {
      const dStr = new Date(d).toISOString().split("T")[0];
      acc[dStr] = (acc[dStr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    for (let w = 0; w < WEEKS; w++) {
      for (let d = 0; d < DAYS_IN_WEEK; d++) {
        const isFuture = currentRenderDate > today;
        const dateStr = currentRenderDate.toISOString().split("T")[0];
        const count = dateCounts[dateStr] || 0;
        
        cells[w].push({
          date: dateStr,
          active: count > 0,
          future: isFuture,
          count
        });
        currentRenderDate.setDate(currentRenderDate.getDate() + 1);
      }
    }
    return cells;
  }, [activityLog]);

  // The most recent weeks sit at the right end of the strip; on narrow screens
  // start scrolled to the end so the user sees their latest activity first.
  const heatmapScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heatmapScrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [heatmap]);

  return (
    <div className="bg-[#1a1b1e] border border-border rounded-2xl p-6 overflow-hidden flex flex-col font-sans text-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Sessions</span>
          <span className="text-text font-bold text-xl">{stats.sessions}</span>
        </div>
        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Messages</span>
          <span className="text-text font-bold text-xl">{stats.messages}</span>
        </div>
        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Total tokens</span>
          <span className="text-text font-bold text-xl">
            {stats.messages > 0 ? (stats.messages * 1.2).toFixed(1) + "k" : "0"}
          </span>
        </div>
        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Active days</span>
          <span className="text-text font-bold text-xl">{stats.activeDays}</span>
        </div>

        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Current streak</span>
          <span className="text-text font-bold text-xl">{stats.currentStreak}d</span>
        </div>
        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Longest streak</span>
          <span className="text-text font-bold text-xl">{stats.longestStreak}d</span>
        </div>
        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Peak hour</span>
          <span className="text-text font-bold text-xl">{stats.peakHour}</span>
        </div>
        <div className="bg-[#2a2b2f] p-4 rounded-xl flex flex-col">
          <span className="text-muted text-[13px] font-medium mb-1">Favorite model</span>
          <span className="text-text font-bold text-xl">Planky 1.0</span>
        </div>
      </div>

      <div ref={heatmapScrollRef} className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-surface-2 scrollbar-track-transparent">
        {heatmap.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-[3px] flex-shrink-0">
            {week.map((day, dIndex) => (
              <div
                key={dIndex}
                title={day.future ? undefined : `${day.date}: ${day.count} sessions`}
                className={clsx(
                  "w-4 h-4 rounded-[3px] transition-colors",
                  day.future 
                    ? "bg-transparent" 
                    : day.active 
                      ? day.count > 2 ? "bg-blue-400" : "bg-blue-500"
                      : "bg-[#2a2b2f] hover:bg-[#34363a]"
                )}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-muted">
        <span>You've used ~12× more tokens than The Great Gatsby.</span>
      </div>
    </div>
  );
}
