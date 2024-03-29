import { MdCreate, MdDashboard, MdLogout } from "react-icons/md"
import styles from "./sidebar.module.css"
import MenuLink from "./menuLink/menuLink"
import { AiOutlinePlus } from "react-icons/ai"
import Image from "next/image"
import { createClient } from "@/lib/supabase.server"
import { signOut } from "../../../login/actions"
import { redirect } from "next/navigation"
const menuItems = [
	{
		title: "Pages",
		list: [
			{
				title: "Dashboard",
				path: "/dashboard",
				icon: <MdDashboard />,
			},
			{
				title: "Create",
				path: "/dashboard/create",
				icon: <AiOutlinePlus  />,
			},
			{
				title: "Edit",
				path: "/dashboard/edit",
				icon: <MdCreate />,
			},
		],
	}
]

const Sidebar = async ()  => {
	const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50"/>
				<div className={styles.userDetail}>
					<span className={styles.email}>{data.user.email}</span>
				</div>
			</div>
			<ul className={styles.list}>
				{menuItems.map(cat => (
					<li key={cat.title}>
						<span className={styles.cat}>{cat.title}</span>
						{cat.list.map(item=>(
							<MenuLink item={item} key={item.title}/>
						))}
					</li>
				))}
			</ul>
			<form action={signOut}>
				<button className={styles.logout}>
					<MdLogout />
					Logout
				</button>
			</form>
		</div>
	)
}

export default Sidebar