import styles from "./login.module.css"
import { login } from './actions'
import LoginForm from "./loginForm/loginForm";

export default async function LoginPage() {
  return (
	<div className={styles.container}>
		<LoginForm/>
	</div>
  );
}
