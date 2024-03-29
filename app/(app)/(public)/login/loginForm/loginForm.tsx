"use client"

import { formData } from 'zod-form-data'
import { login } from '../actions'
import styles from './loginForm.module.css'
import { useState } from 'react'

const LoginForm = () => {
	const [err, setErr] = useState("")

	const handleLogin = async (formData: any) => {
		const data = await login(formData)
		data.error && setErr(data.error)
	}
	return (
		<form action={handleLogin} className={styles.form}>
			<h1>Login</h1>
			<input id="email" name="email" type="email" placeholder="email" required/>
			<input id="password" name="password" type="password" placeholder="password" required/>
			<button>Login</button>
			{err && err}
		</form>
	)
}

export default LoginForm