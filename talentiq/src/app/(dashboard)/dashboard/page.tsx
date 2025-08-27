"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";
import { RoleGate } from "@/components/RoleGate";
import { UserRole } from "@/lib/rbac";

const data = [
  { name: "Mon", applicants: 12 },
  { name: "Tue", applicants: 18 },
  { name: "Wed", applicants: 9 },
  { name: "Thu", applicants: 22 },
  { name: "Fri", applicants: 15 },
];

export default function DashboardPage() {
  const [role] = useState<UserRole>("hr_manager");
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">TalentIQ Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-64 w-full border rounded p-3">
          <h2 className="font-medium mb-2">Applicants this week</h2>
          <div className="h-[85%]">
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
        <RoleGate allow={["super_admin", "hr_manager", "hiring_manager"]} currentRole={role}>
          <div className="h-64 w-full border rounded p-3">
            <h2 className="font-medium mb-2">Open roles</h2>
            <div className="text-sm text-muted-foreground">Widget content here</div>
          </div>
        </RoleGate>
      </div>
    </div>
  );
}

