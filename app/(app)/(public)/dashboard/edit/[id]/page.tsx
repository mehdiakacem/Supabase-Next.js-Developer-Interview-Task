


import styles from "@/app/(app)/(public)/ui/dashboard/businesses/singleEdit.module.css"
import { deleteBusiness, updateBusiness } from "@/lib/actions";
import { fetchBusiness } from "@/lib/data";
import LoginForm from "../editForm/editForm";
import { redirect } from "next/navigation";


const SingleEditPage = async ({params}: any) => {
	const {id} = params;
		const business = await fetchBusiness(id);
		if (business?.error) {
			redirect('/dashboard')
		}
	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				{business.business_name}
			</div>
			<div className={styles.formContainer}>
				<LoginForm business={business} />
				<form action={deleteBusiness} className={styles.form}>
					<input type="hidden" name="id" value={id} />
					<button  className={styles.delete} type="submit">Delete</button>
				</form>

			</div>
		</div>
	)
}

export default SingleEditPage