import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const db = drizzle(supabase);

// Création de l'admin par défaut
async function createDefaultAdmin() {
  try {
    await db.insert(users).values({
      email: 'admin@ecosolidaire.org',
      password: 'admin', // À changer en production !
      role: 'admin'
    });
    console.log('Admin par défaut créé');
  } catch (error) {
    console.log('Admin déjà existant');
  }
}

async function main() {
  try {
    // Exécuter les migrations
    await migrate(db, {
      migrationsFolder: './drizzle/migrations'
    });
    
    // Créer l'admin par défaut
    await createDefaultAdmin();
    
    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

main();