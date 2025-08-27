"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", applicants: 12 },
  { name: "Tue", applicants: 18 },
  { name: "Wed", applicants: 9 },
  { name: "Thu", applicants: 22 },
  { name: "Fri", applicants: 15 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">TalentIQ Dashboard</h1>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applicants" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

