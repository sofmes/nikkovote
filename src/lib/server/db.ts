import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "./schema";
import { eq } from "drizzle-orm";

export const getDataManager = (db: D1Database) => {
	return new DataManager(drizzle(db, { schema }));
};

export interface VoteBox {
	id: number;
	title: string;
	thumbnailUrl: string;
}

export interface Vote {
	comment: string | null;
}

export interface Character {
	id: number;
	name: string;
	thumbnailUrl: string;
	votes: Vote[];
}

export interface VoteBoxWithPartialCharacters extends VoteBox {
	characters: Character[];
}

export class VoteBoxDataManager {
	constructor(private db: DrizzleD1Database<typeof schema>) {}

	async add(title: string, thumbnailUrl: string): Promise<{ id: number }> {
		return (
			await this.db
				.insert(schema.voteBox)
				.values({
					title,
					thumbnailUrl,
				})
				.returning({ id: schema.voteBox.id })
		)[0];
	}

	async remove(id: number) {
		await this.db.delete(schema.voteBox).where(eq(schema.voteBox.id, id));
	}

	async fetchMany(page: number): Promise<VoteBox[]> {
		return await this.db
			.select()
			.from(schema.voteBox)
			.limit(10 * page)
			.offset(10 * (page - 1))
			.all();
	}
}

export class CharacterDataManager {
	constructor(private db: DrizzleD1Database<typeof schema>) {}

	async add(voteBoxId: number, name: string, thumbnailUrl: string) {
		await this.db.insert(schema.character).values({
			voteBoxId,
			name,
			thumbnailUrl,
		});
	}

	async remove(id: number) {
		await this.db.delete(schema.character).where(eq(schema.character.id, id));
	}

	async purge(voteBoxId: number) {
		await this.db
			.delete(schema.character)
			.where(eq(schema.character.voteBoxId, voteBoxId));
	}
}

export class VoteDataManager {
	constructor(private db: DrizzleD1Database<typeof schema>) {}

	async add(
		voteBoxId: number,
		characterId: number,
		authorIp: string,
		comment: string | null,
	) {
		await this.db.insert(schema.vote).values({
			voteBoxId,
			characterId,
			authorIp,
			comment,
		});
	}

	async purge(voteBoxId: number) {
		await this.db
			.delete(schema.vote)
			.where(eq(schema.vote.voteBoxId, voteBoxId));
	}
}

export class DataManager {
	voteBox: VoteBoxDataManager;
	character: CharacterDataManager;
	vote: VoteDataManager;

	constructor(private db: DrizzleD1Database<typeof schema>) {
		this.voteBox = new VoteBoxDataManager(db);
		this.character = new CharacterDataManager(db);
		this.vote = new VoteDataManager(db);
	}

	async fetchMany(page: number): Promise<VoteBoxWithPartialCharacters[]> {
		return await this.db.query.voteBox.findMany({
			offset: 10 * (page - 1),
			limit: 10,
			with: {
				characters: {
					columns: {
						voteBoxId: false,
					},
					with: {
						votes: {
							columns: {
								characterId: false,
							},
						},
					},
				},
			},
		});
	}

	async fetchDetails(
		voteBoxId: number,
	): Promise<VoteBoxWithPartialCharacters | undefined> {
		return await this.db.query.voteBox.findFirst({
			where: eq(schema.voteBox.id, voteBoxId),
			with: {
				characters: {
					columns: {
						voteBoxId: false,
					},
					with: {
						votes: {
							columns: {
								characterId: false,
							},
						},
					},
				},
			},
		});
	}

	async purgeVote(voteBoxId: number) {
		await this.vote.purge(voteBoxId);
		await this.character.purge(voteBoxId);
		await this.voteBox.remove(voteBoxId);
	}
}
