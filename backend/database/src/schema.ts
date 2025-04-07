import { createId } from '@paralleldrive/cuid2';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const user = sqliteTable('user', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey()
		.unique(),
	name: text('name').notNull(),
	email: text('email').notNull(),
});

export type User = typeof user.$inferSelect;

export const userRelations = relations(user, ({ many }) => ({
	virtualBox: many(virtualBox),
}));

export const virtualBox = sqliteTable('virtualBox', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey()
		.unique(),
	name: text('name').notNull(),
	type: text('text', { enum: ['react', 'node'] }).notNull(),
	bucket: text('bucket'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
});

export type VirtualBox = typeof virtualBox.$inferSelect;

export const virtualBoxRelations = relations(virtualBox, ({ one }) => ({
	author: one(user, {
		fields: [virtualBox.userId],
		references: [user.id],
	}),
}));
