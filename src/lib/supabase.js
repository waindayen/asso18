import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase ne sont pas définies');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (error) {
      throw error;
    }

    // Retourne un tableau vide si aucune donnée n'est trouvée
    return {
      success: true,
      data: data || [],
      message: data?.length ? 'Données récupérées avec succès' : 'Aucune donnée trouvée'
    };
  } catch (error) {
    console.error('Erreur Supabase:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erreur de connexion à Supabase'
    };
  }
}