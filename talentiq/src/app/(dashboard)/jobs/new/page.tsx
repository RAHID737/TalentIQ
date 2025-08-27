"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const JobSchema = z.object({
  title: z.string().min(3, "Title is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description is required"),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
});

type JobValues = z.infer<typeof JobSchema>;

export default function NewJobPage() {
  const form = useForm<JobValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      salaryMin: undefined,
      salaryMax: undefined,
    },
    mode: "onBlur",
  });

  // Auto-save to localStorage
  useEffect(() => {
    const sub = form.watch((values) => {
      localStorage.setItem("job-draft", JSON.stringify(values));
    });
    const saved = localStorage.getItem("job-draft");
    if (saved) {
      try { form.reset(JSON.parse(saved)); } catch {}
    }
    return () => sub.unsubscribe();
  }, [form]);

  async function onSubmit(values: JobValues) {
    alert("Saved job (placeholder). Values: " + JSON.stringify(values));
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Create Job</h1>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} aria-label="Job posting form">
        <div>
          <label className="block text-sm">Title</label>
          <input aria-label="Title" className="mt-1 w-full border rounded px-3 py-2" {...form.register("title")} />
          {form.formState.errors.title && (
            <p role="alert" className="text-sm text-red-600">{form.formState.errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Location</label>
          <input aria-label="Location" className="mt-1 w-full border rounded px-3 py-2" {...form.register("location")} />
          {form.formState.errors.location && (
            <p role="alert" className="text-sm text-red-600">{form.formState.errors.location.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <textarea aria-label="Description" rows={6} className="mt-1 w-full border rounded px-3 py-2" {...form.register("description")} />
          {form.formState.errors.description && (
            <p role="alert" className="text-sm text-red-600">{form.formState.errors.description.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Salary min</label>
            <input aria-label="Salary min" className="mt-1 w-full border rounded px-3 py-2" type="number" {...form.register("salaryMin")} />
          </div>
          <div>
            <label className="block text-sm">Salary max</label>
            <input aria-label="Salary max" className="mt-1 w-full border rounded px-3 py-2" type="number" {...form.register("salaryMax")} />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Save</button>
          <button
            type="button"
            className="border px-4 py-2 rounded"
            onClick={() => {
              localStorage.removeItem("job-draft");
              form.reset({ title: "", location: "", description: "", salaryMin: undefined, salaryMax: undefined });
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

