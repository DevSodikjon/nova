export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // faqat sinov uchun — haqiqiy loyihada parol hech qachon shunday saqlanmaydi
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawUsers: Omit<User, "id">[] = [
  {
    firstName: "Maya",
    lastName: "Chen",
    email: "maya.chen@example.com",
    password: "password123",
  },
];

export const users: User[] = rawUsers.map((u) => ({
  id: slugify(u.email),
  ...u,
}));