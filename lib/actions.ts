"use server"

import { revalidatePath } from "next/cache";
import { createSupabaseForServerAction } from "./supabase.server";
import { redirect } from "next/navigation";
import { string } from "zod";

export const addBusiness = async (formData: any) =>{
	const {businessname} = Object.fromEntries(formData);
	let email: string | undefined = "";	
	try {
		const supabase = createSupabaseForServerAction();
		const user = await supabase.auth.getUser();
		if (user && user.data && user.data.user) {
			email = user.data.user.email
		}
		const { data, error} = await supabase
		.from('businesses')
		.insert([
			{ business_name: businessname, email: email },
		])
		.select()
		if (error)
			throw error;
	} catch (error) {
		return {error: "Business Name already exist"};
	}
	revalidatePath("/dashboard")
	redirect("/dashboard")

}

export const deleteBusiness = async (formData: any) =>{
	const {id} = Object.fromEntries(formData);
	try {
		const supabase = createSupabaseForServerAction();
		const { error } = await supabase
		.from('businesses')
		.delete()
		.eq('id', id)
		if (error)
			throw error;
	} catch (error) {
	}

	revalidatePath("/dashboard")
	redirect("/dashboard")
}

export const updateBusiness = async (formData: any) =>{
	const {id, businessname} = Object.fromEntries(formData);	
	try {
		const supabase = createSupabaseForServerAction();
		
		const updateFields: { [key: string]: any } = {
			businessname
		}

		Object.keys(updateFields).forEach(
			(key)=>
				(updateFields[key] ===""|| undefined) && delete updateFields[key])

		const { data, error } = await supabase
		.from('businesses')
		.update({ business_name: updateFields.businessname})
		.eq('id', id)
		.select()
		if (error)
			throw error;
	} catch (error) {
		console.log(error);
		return {error: "Business Name already exist"};
	}

	revalidatePath("/dashboard")
	redirect("/dashboard")
}