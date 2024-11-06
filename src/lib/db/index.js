import { supabase } from '../supabase';

// Projects
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getProjectById = async (id) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Donations
export const createDonation = async (donation) => {
  const { data, error } = await supabase
    .from('donations')
    .insert([donation])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Volunteers
export const createVolunteerApplication = async (volunteer) => {
  const { data, error } = await supabase
    .from('volunteers')
    .insert([volunteer])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Authentication
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Admin functions
export const getAdminStats = async () => {
  const { data: donations, error: donationsError } = await supabase
    .from('donations')
    .select('amount')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  const { data: volunteers, error: volunteersError } = await supabase
    .from('volunteers')
    .select('id')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  if (donationsError || volunteersError) throw donationsError || volunteersError;

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const newVolunteers = volunteers.length;

  return {
    monthlyDonations: totalDonations,
    newVolunteers,
  };
};