import { createFileRoute } from "@tanstack/react-router";

const ACCOUNTS = [
  { email: "admin@zentramedhealth.co.ke", password: "Zentra@Admin26" },
  { email: "manager@zentramedhealth.co.ke", password: "Zentra@Mgr26" },
  { email: "sales@zentramedhealth.co.ke", password: "Zentra@Sales26" },
  { email: "stores@zentramedhealth.co.ke", password: "Zentra@Stores26" },
  { email: "catalogue@zentramedhealth.co.ke", password: "Zentra@Cat26" },
];

export const Route = createFileRoute("/api/public/seed-admins")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("x-seed-token");
        const expected = process.env["ADMIN_SEED_TOKEN"];
        if (!expected || token !== expected) {
          return new Response("Forbidden", { status: 403 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const results: string[] = [];

        for (const acct of ACCOUNTS) {
          let userId: string | undefined;
          const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
            email: acct.email,
            password: acct.password,
            email_confirm: true,
          });
          if (created?.user) {
            userId = created.user.id;
            results.push(`created ${acct.email}`);
          } else {
            const { data: list } = await supabaseAdmin.auth.admin.listUsers({
              page: 1,
              perPage: 200,
            });
            userId = list?.users.find((u) => u.email === acct.email)?.id;
            results.push(`exists ${acct.email} (${error?.message ?? "found"})`);
          }
          if (userId) {
            const { error: roleError } = await supabaseAdmin
              .from("user_roles")
              .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
            if (roleError) results.push(`role error ${acct.email}: ${roleError.message}`);
          }
        }

        return Response.json({ results });
      },
    },
  },
});
