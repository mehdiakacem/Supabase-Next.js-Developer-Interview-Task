import { createClient } from "@/lib/supabase.server";
import { redirect } from "next/navigation";

export default async function Homepage() {
	const supabase = createClient()
	const user = await supabase.auth.getUser();

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
	<div>Homepage</div>
  );
}
