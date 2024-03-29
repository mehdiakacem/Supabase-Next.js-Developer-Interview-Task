"use client"
import styles from "@/app/(app)/(public)/ui/dashboard/businesses/create.module.css"
import { addBusiness } from "@/lib/actions";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast"


const CreatePage = () => {
	const formRef = useRef<HTMLFormElement | null>(null);

	const handleCancel = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };
	const [err, setErr] = useState("")

	const handleCreate = async (formData: any) => {
		const data = await addBusiness(formData)
		if (data?.error) {
			toast.error(data.error);
		}
		data.error && setErr(data.error)
	}

	return (
		<div className={styles.container}>
			<form ref={formRef} action={handleCreate} className={styles.form}>
				<input type="text" placeholder="Business Name" name="businessname" required/>
				<button  className={styles.save} type="submit">Save</button>
				<button className={styles.cancel} type="button" onClick={handleCancel}>Cancel</button>
			</form>

		</div>
	)
}

export default CreatePage