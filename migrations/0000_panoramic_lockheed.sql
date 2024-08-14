CREATE TABLE `character` (
	`vote_box_id` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`thumbnail_url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vote` (
	`vote_box_id` integer NOT NULL,
	`character_id` integer NOT NULL,
	`author_ip` text NOT NULL,
	`comment` text
);
--> statement-breakpoint
CREATE TABLE `voteBox` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`thumbnail_url` text NOT NULL
);
