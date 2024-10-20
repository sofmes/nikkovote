import { getDataManager } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, platform }) => {
	if (!platform) throw new Error();

	const { voteBoxId } = params;

	const data = getDataManager(platform.env.DB);
	return await data?.fetchDetails(Number.parseInt(voteBoxId));
};
