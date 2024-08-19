import { getDataManager } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, platform }) => {
    const { voteBoxId } = params;

    const data = getDataManager(platform!.env.DB);
    return await data?.fetchDetails(parseInt(voteBoxId));
};
