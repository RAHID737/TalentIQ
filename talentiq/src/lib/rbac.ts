export type UserRole =
  | "super_admin"
  | "hr_manager"
  | "hiring_manager"
  | "interviewer"
  | "candidate"
  | "viewer";

export const RolePriority: Record<UserRole, number> = {
  super_admin: 5,
  hr_manager: 4,
  hiring_manager: 3,
  interviewer: 2,
  candidate: 1,
  viewer: 0,
};

export function canAccess(required: UserRole[] | UserRole, current: UserRole): boolean {
  const req = Array.isArray(required) ? required : [required];
  return req.includes(current) || current === "super_admin";
}

