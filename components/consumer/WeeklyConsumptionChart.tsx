'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
    { day: "Mon", consumption: 3.2, cost: 280 },
    { day: "Tue", consumption: 4.1, cost: 355 },
    { day: "Wed", consumption: 3.8, cost: 330 },
    { day: "Thu", consumption: 4.5, cost: 390 },
    { day: "Fri", consumption: 3.9, cost: 340 },
    { day: "Sat", consumption: 5.2, cost: 450 },
    { day: "Sun", consumption: 4.8, cost: 420 },
];

const chartConfig = {
    consumption: {
        label: "Consumption",
        color: "hsl(var(--chart-1))",
    },
    cost: {
        label: "Cost",
        color: "hsl(var(--chart-2))",
    },
};

export default function WeeklyConsumptionChart() {
    return (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-white">
            <CardHeader>
                <CardTitle className="text-white">Weekly Consumption</CardTitle>
                <CardDescription className="text-white/60">
                    Energy usage pattern for the past 7 days
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            stroke="rgba(255,255,255,0.6)"
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={5}
                            stroke="rgba(255,255,255,0.6)"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="consumption"
                            type="natural"
                            fill="url(#fillConsumption)"
                            fillOpacity={0.4}
                            stroke="var(--color-consumption)"
                            strokeWidth={2}
                        />
                        <defs>
                            <linearGradient id="fillConsumption" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
