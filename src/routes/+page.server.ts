import { getDataManager, type VoteBox } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export interface VoteBoxWithRanking extends VoteBox {
	// 順位の順番で並んだキャラクターの名前のリスト
	ranking: string[];
}

export const load: PageServerLoad = async ({ request, platform }) => {
	if (!platform) throw new Error();
	const dataManager = getDataManager(platform.env.DB);

	const maybePage = new URL(request.url).searchParams.get("page");
	const page = maybePage ? Number.parseInt(maybePage) : 0;

	const voteBoxes = [];
	for (const voteBox of await dataManager.fetchMany(page)) {
		voteBox.characters.sort((a, b) => {
			if (a.votes.length > b.votes.length) return -1;
			if (a.votes.length < b.votes.length) return 1;
			return 0;
		});

		voteBoxes.push({
			id: voteBox.id,
			title: voteBox.title,
			thumbnailUrl: voteBox.thumbnailUrl,
			ranking: voteBox.characters.map((c) => c.name),
		});
	}

	return { voteBoxes };
};
