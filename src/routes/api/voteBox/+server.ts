import { getDataManager } from "$lib/server/db";
import { json, type RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const voteBoxData = z.object({
    title: z.string().min(2).max(100),
    thumbnailUrl: z.string().min(7).max(4096)
});

export const POST: RequestHandler = async ({ request, platform }) => {
    const dataManager = getDataManager(platform!.env.DB);

    const data = voteBoxData.parse(await request.json());
    const { id } = await dataManager.voteBox.add(data.title, data.thumbnailUrl);

    return new Response(`ID: ${id}`, { status: 201 });
};

export const GET: RequestHandler = async ({ request, platform }) => {
    const dataManager = getDataManager(platform!.env.DB);
    const maybePage = new URL(request.url).searchParams.get("page");
    const page = maybePage ? parseInt(maybePage) : 0;

    const data = await dataManager.voteBox.fetchMany(page);

    return json(data);
};
