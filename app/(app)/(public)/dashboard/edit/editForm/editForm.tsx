"use client"

import { formData } from 'zod-form-data'
import styles from './editForm.module.css'
import { useState } from 'react'
import { updateBusiness } from '@/lib/actions'
import toast from 'react-hot-toast'

const LoginForm = (props: any) => {

	const handleEdit = async (formData: any) => {
		const data = await updateBusiness(formData)
		if (data?.error) {
			toast.error(data.error);
		}
	}
	return (
		<form action={handleEdit} className={styles.form}>
					<input type="hidden" name="id" value={props.business.id} />
					<label>New Business Name</label>
					<input type="text" name="businessname" required placeholder={props.business.business_name} />
					<button  className={styles.save} type="submit">Save</button>
					<button className={styles.cancel} type="reset">Cancel</button>
				</form>
	)
}

export default LoginForm