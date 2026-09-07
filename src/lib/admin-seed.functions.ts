import { createServerFn } from "@tanstack/react-start";

const ACCOUNTS = [
  { email: "admin@zentramedhealth.co.ke", password: "Zentra@Admin26" },
  { email: "manager@zentramedhealth.co.ke", password: "Zentra@Mgr26" },
  { email: "sales@zentramedhealth.co.ke", password: "Zentra@Sales26" },
  { email: "stores@zentramedhealth.co.ke", password: "Zentra@Stores26" },
  { email: "catalogue@zentramedhealth.co.ke", password: "Zentra@Cat26" },
];

/** One-off seeding of the five admin accounts. Requires the server-side token. */
export const seedAdmins = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_SEED_TOKEN"];
    if (!expected || data.token !== expected) throw new Error("Forbidden");

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
        const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
        const found = list?.users.find((u) => u.email === acct.email);
        userId = found?.id;
        results.push(`exists ${acct.email} (${error?.message ?? "found"})`);
      }
      if (userId) {
        await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
      }
    }

    return { results };
  });
