"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
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
  const [layout, setLayout] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("dashboard-layout");
      return saved ? JSON.parse(saved) : [0, 1];
    } catch {
      return [0, 1];
    }
  });
  useEffect(() => {
    localStorage.setItem("dashboard-layout", JSON.stringify(layout));
  }, [layout]);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">TalentIQ Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="h-64 w-full border rounded p-3"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "0")}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const from = Number(e.dataTransfer.getData("text/plain"));
            const newLayout = [...layout];
            const to = 0;
            [newLayout[from], newLayout[to]] = [newLayout[to], newLayout[from]];
            setLayout(newLayout);
          }}
        >
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
          <div
            className="h-64 w-full border rounded p-3"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", "1")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const from = Number(e.dataTransfer.getData("text/plain"));
              const newLayout = [...layout];
              const to = 1;
              [newLayout[from], newLayout[to]] = [newLayout[to], newLayout[from]];
              setLayout(newLayout);
            }}
          >
            <h2 className="font-medium mb-2">Open roles</h2>
            <div className="text-sm text-muted-foreground">Widget content here</div>
          </div>
        </RoleGate>
      </div>
    </div>
  );
}

