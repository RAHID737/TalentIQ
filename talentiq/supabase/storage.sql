-- Create storage bucket for resumes
insert into storage.buckets (id, name, public) values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Storage RLS policies
create policy if not exists "resume read for org users" on storage.objects
  for select using (
    bucket_id = 'resumes'
  );

create policy if not exists "resume insert for service role" on storage.objects
  for insert with check (
    bucket_id = 'resumes'
  );

