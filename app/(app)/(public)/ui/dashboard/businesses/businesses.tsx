import styles from './businesses.module.css'
import { createSupabaseForServerComponent } from "@/lib/supabase.server"

export default async function Businesses() {
	const supabase = createSupabaseForServerComponent();
	const { data: businesses } = await supabase.from("businesses").select();

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>All businesses</h2>
			<table className={styles.table}>
				<thead>
					<tr>
						<td>Business Name</td>
						<td>Creator Email</td>
						<td>Creation Date</td>
					</tr>
				</thead>
				<tbody>
					{businesses?.map(businesses => (
						<tr key={businesses.id}>
							<td>
								{businesses.business_name}
							</td>
							<td>
								{businesses.email}
							</td>
							<td>
								{businesses.created_at.slice(0, 10)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
