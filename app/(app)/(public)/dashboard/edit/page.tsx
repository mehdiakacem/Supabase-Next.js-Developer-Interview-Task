import styles from "@/app/(app)/(public)/ui/dashboard/businesses/edit.module.css"
import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import Link from "next/link"

export default async function EditPage() {
	const supabase = createSupabaseForServerComponent();
	const user = await supabase.auth.getUser();
	let email: string | undefined = "";
	if (user && user.data && user.data.user) {
		email = user.data.user.email
	}
	const { data: businesses } = await supabase.from("businesses").select().eq('email', email);

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<tr>
						<td>Business Name</td>
					</tr>
				</thead>
				<tbody>
					{businesses?.map(businesses => (
					<tr key={businesses.id}>
						<td>
						{businesses.business_name}
						</td>
						<td>
							<Link href={`/dashboard/edit/${businesses.id}`}>
								<button className={`${styles.button} ${styles.edit}`}>Edit</button>
							</Link>
						</td>
					</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
