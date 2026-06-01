import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }),
  phoneNumber: integer(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: text("role").default("user").notNull(),
});

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("product_name").notNull(),
  newPrice: numeric("product_newPrice", { precision: 10, scale: 2 }).notNull(),
  oldPrice: numeric("product_oldPrice", { precision: 10, scale: 2 }),
  quantity: integer("product_quantity").default(1).notNull(),
  lowStock: integer().default(5).notNull(),
  brand: text("brand"),
  image: text("product_image").notNull(),
  description: text("product_description").notNull(),
  category: text("product_category").notNull(),
});

export const sizesTable = pgTable("sizes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sizeValue: text("size_value").notNull(),
  productId: integer("product_id")
    .references(() => productsTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const colorsTable = pgTable("colors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  colorName: text("color_name").notNull(),
  colorImage: text("color_image"),
  colorQuantity: integer("color_quantity"),

  sizeId: integer("size_id")
    .references(() => sizesTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const cartTable = pgTable("cart", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userEmail: text("user_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cartItemsTable = pgTable("cart_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  cartId: integer("cart_id")
    .references(() => cartTable.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  name: text("product_name").notNull(),
  price: numeric("product_price").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  colorImage: text("color_image"),
  colorValue: text("color_value"),
  size: text("size"),
});

export const orderTable = pgTable("order", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userEmail: text("user_email").notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("order_status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  note: text("order_note"),
});
export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id")
    .references(() => orderTable.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("product_id").notNull(),
  productName: text("product_name").notNull(),
  color: text("color"),
  size: text("size"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  image: text().notNull(),
});
export const wishlistTable = pgTable("wishlist", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userEmail: text("user_email").notNull(),
});
export const wishlistItemsTable = pgTable("wishlist_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  wishlistId: integer("wishlist_id")
    .references(() => wishlistTable.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("product_id").notNull(),
  productName: text("product_name").notNull(),
  color: text("color"),
  size: text("size"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity"),
  image: text().notNull(),
});
// Relations

// 1- product relation
export const productsRelations = relations(productsTable, ({ many }) => ({
  sizes: many(sizesTable),
}));

// 2- sizes relation
export const sizesRelations = relations(sizesTable, ({ one, many }) => ({
  product: one(productsTable, {
    fields: [sizesTable.productId],
    references: [productsTable.id],
  }),
  colors: many(colorsTable),
}));

// 3- colors relation
export const colorsRelations = relations(colorsTable, ({ one }) => ({
  size: one(sizesTable, {
    fields: [colorsTable.sizeId],
    references: [sizesTable.id],
  }),
}));
