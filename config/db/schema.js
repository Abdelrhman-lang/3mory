import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const productsTable = pgTable("products", {
    id: serial().primaryKey(),
    name: text("product_name").notNull(),
    newPrice: numeric("product_newPrice", { precision: 10, scale: 2 }).notNull(),
    oldPrice: numeric("product_oldPrice", { precision: 10, scale: 2 }),
    quantity: integer("product_quantity").default(1).notNull(),
    lowStock: integer().default(5).notNull(),
    brand: text("brand"),
    image: text("product_image").notNull(),
    description: text("product_description").notNull(),
    category: text("product_category").notNull(),
})

export const sizesTable = pgTable("sizes", {
    id: serial("id").primaryKey(),
    sizeValue: text("size_value").notNull(),
    productId: integer("product_id").references(() => productsTable.id, { onDelete: "cascade" }).notNull(),
});

export const colorsTable = pgTable("colors", {
    id: serial("id").primaryKey(),
    colorName: text("color_name").notNull(),
    colorImage: text("color_image"),
    sizeId: integer("size_id").references(() => sizesTable.id, { onDelete: "cascade" }).notNull(),
});

// Relations

// 1- product relation
export const productsRelations = relations(productsTable, ({ many }) => ({
    sizes: many(sizesTable)
}))

// 2- sizes relation
export const sizesRelations = relations(sizesTable, ({ one, many }) => ({
    product: one(productsTable, {
        fields: [sizesTable.productId],
        references: [productsTable.id]
    }),
    colors: many(colorsTable)
}))

// 3- colors relation
export const colorsRelations = relations(colorsTable, ({ one }) => ({
    size: one(sizesTable, {
        fields: [colorsTable.sizeId],
        references: [sizesTable.id],
    }),
}));