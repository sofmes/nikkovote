import { getDataManager } from "$lib/server/db";
import { json, type RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

const voteData = z.object({
    characterId: z.preprocess((v) => parseInt(v as string), z.number()),
    comment: z.string().min(2).max(100).nullable()
});

export const POST: RequestHandler = async ({
    request,
    params,
    platform,
    getClientAddress
}) => {
    const dataManager = getDataManager(platform!.env.DB);
    const { voteBoxId } = params;
    if (!voteBoxId)
        return new Response("投票箱IDを指定してください。", { status: 400 });

    const data = voteData.parse(Object.fromEntries(await request.formData()));
    await dataManager.vote.add(
        parseInt(voteBoxId),
        data.characterId,
        getClientAddress(),
        data.comment
    );

    return new Response(null, { status: 201 });
};
