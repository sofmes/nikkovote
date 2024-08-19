import { getDataManager } from "$lib/server/db";
import type { RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const voteBoxData = z.object({
    voteBoxId: z.number(),
    name: z.string().min(2).max(100),
    thumbnailUrl: z.string().min(7).max(4096)
});

export const POST: RequestHandler = async ({ request, platform }) => {
    const dataManager = getDataManager(platform!.env.DB);

    const data = voteBoxData.parse(await request.json());
    await dataManager.character.add(
        data.voteBoxId,
        data.name,
        data.thumbnailUrl
    );

    return new Response("OK", { status: 201 });
};
