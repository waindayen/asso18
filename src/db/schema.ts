import { pgTable, text, integer, decimal, timestamp } from 'drizzle-orm/pg-core';

// Projets
export const projects = pgTable('projects', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  location: text('location').notNull(),
  image: text('image').notNull(),
  progress: decimal('progress').notNull(),
  goal: integer('goal').notNull(),
  raised: integer('raised').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Dons
export const donations = pgTable('donations', {
  id: integer('id').primaryKey(),
  amount: integer('amount').notNull(),
  projectId: integer('project_id').references(() => projects.id),
  donorName: text('donor_name').notNull(),
  donorEmail: text('donor_email').notNull(),
  frequency: text('frequency').notNull(), // Ajout de la colonne frequency
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Bénévoles
export const volunteers = pgTable('volunteers', {
  id: integer('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  skills: text('skills'),
  availability: text('availability'),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Utilisateurs (admin)
export const users = pgTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});