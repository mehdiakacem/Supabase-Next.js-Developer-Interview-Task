import { createClient } from "@/lib/supabase.server";
import Businesses from "../ui/dashboard/businesses/businesses";
import styles from "../ui/dashboard/dashboard.module.css"
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<Businesses />
			</div>

		</div>
	);
}
