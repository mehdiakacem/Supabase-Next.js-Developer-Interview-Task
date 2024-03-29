"use server"
import { createSupabaseForServerAction } from "./supabase.server";

export const fetchBusiness = async (id: string | undefined) => {
	try {
		const supabase = createSupabaseForServerAction();
		let { data: business, error } = await supabase
			.from('businesses')
			.select().eq('id', id).single();
		if (error)
			throw error;
		return business

	} catch (error) {
		return {error: "Page not found"};
		console.log(error)
	}

}