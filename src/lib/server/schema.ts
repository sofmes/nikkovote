import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const voteBox = sqliteTable("voteBox", {
    id: integer("id").notNull().primaryKey(),
    title: text("title").notNull(),
    thumbnailUrl: text("thumbnail_url").notNull()
});

export const voteBoxRelations = relations(voteBox, ({ many }) => ({
    characters: many(character)
}));

export const character = sqliteTable("character", {
    voteBoxId: integer("vote_box_id").notNull(),
    id: integer("id").notNull().primaryKey(),
    name: text("name").notNull(),
    thumbnailUrl: text("thumbnail_url").notNull()
});

export const characterRelations = relations(character, ({ one, many }) => ({
    voteBox: one(voteBox, {
        fields: [character.voteBoxId],
        references: [voteBox.id]
    }),
    votes: many(vote)
}));

export const vote = sqliteTable("vote", {
    voteBoxId: integer("vote_box_id").notNull(),
    characterId: integer("character_id").notNull(),
    authorIp: text("author_ip").notNull(),
    comment: text("comment")
});

export const voteRelations = relations(vote, ({ one }) => ({
    character: one(character, {
        fields: [vote.characterId],
        references: [character.id]
    })
}));
