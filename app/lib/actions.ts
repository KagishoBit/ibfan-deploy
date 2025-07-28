'use server';

import { supabaseAdmin } from './supabase-admin';
import { revalidatePath } from 'next/cache';
import { User } from './types'; // Import your User type

// --- USER ACTIONS ---

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabaseAdmin
    .from('users_profile')
    .select('id, username, email, role');

  if (error) {
    console.error('Supabase error (getUsers):', error.message);
    throw new Error('Failed to fetch users.');
  }
  return data || [];
}

export async function addUser(data: { username: string; email: string; }): Promise<User> {
  // 1. Create the user in Supabase Auth
  // NOTE: A temporary password is required. You should have a proper flow for this.
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: 'temporary-secure-password-for-user', // IMPORTANT: Change this logic
    email_confirm: true, // Skips the confirmation email
  });

  if (authError) {
    console.error('Supabase auth error (addUser):', authError.message);
    throw new Error(authError.message);
  }
  if (!authData.user) {
    throw new Error('User was not created in Supabase Auth.');
  }

  // 2. Insert the user's profile into the 'users_profile' table
  const { data: newUser, error: profileError } = await supabaseAdmin
    .from('users_profile')
    .insert({
      id: authData.user.id, // Links profile to the auth user
      username: data.username,
      email: data.email,
      role: 'user', // Default role
    })
    .select()   // Return the created profile
    .single();  // Expect a single object back

  if (profileError) {
    console.error('Supabase profile error (addUser):', profileError.message);
    throw new Error('Failed to create user profile.');
  }

  revalidatePath('/dashboard/users');
  return newUser;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) {
    console.error('Supabase error (deleteUser):', error.message);
    throw new Error('Failed to delete user.');
  }
  revalidatePath('/dashboard/users');
}

export async function updateUser(id: string, updatedData: { username: string; role: 'admin' | 'user' | null }): Promise<User> {
  const { data: updatedUser, error } = await supabaseAdmin
    .from('users_profile')
    .update({
      username: updatedData.username,
      role: updatedData.role,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase error (updateUser):', error.message);
    throw new Error('Failed to update user.');
  }
  revalidatePath('/dashboard/users');
  return updatedUser;
}

// --- VIOLATION ACTIONS ---
// (No changes were needed for the violation actions, they appear correct)
export async function getViolations() {
  const { data, error } = await supabaseAdmin
    .from('violations')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Supabase error (getViolations):', error.message);
    throw new Error('Failed to fetch violations.');
  }
  return data;
}

import { Violation } from './types'; // Ensure Violation type is imported

// --- VIOLATION ACTIONS ---

/**
 * Creates a new violation record from form data.
 */
export async function addViolation(formData: FormData): Promise<void> {
  const newViolation = {
    description: formData.get('description') as string,
    violation_type: formData.get('violation_type') as string,
    location: formData.get('location') as string,
    date: new Date().toISOString(),
    resolved: formData.get('resolved') === 'on', // Handles checkbox value
  };

  const { error } = await supabaseAdmin.from('violations').insert(newViolation);
  if (error) {
    console.error('Supabase error (addViolation):', error.message);
    throw new Error('Failed to create violation.');
  }
  
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/violations');
}

/**
 * Updates an existing violation record from form data.
 */
export async function updateViolation(formData: FormData): Promise<void> {
  // Ensure 'id' from the form is treated as a number
  const id = Number(formData.get('id'));
  
  if (isNaN(id)) {
    throw new Error('Invalid ID provided for update.');
  }

  const updatedViolation = {
    description: formData.get('description') as string,
    violation_type: formData.get('violation_type') as string,
    location: formData.get('location') as string,
    resolved: formData.get('resolved') === 'on',
  };

  const { error } = await supabaseAdmin
    .from('violations')
    .update(updatedViolation)
    .eq('id', id);

  if (error) {
    console.error('Supabase error (updateViolation):', error.message);
    throw new Error('Failed to update violation.');
  }
  
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/violations');
}

/**
 * Deletes a violation record by its ID.
 */
export async function deleteViolation(id: number): Promise<void> {
  const { error } = await supabaseAdmin
    .from('violations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase error (deleteViolation):', error.message);
    throw new Error('Failed to delete violation.');
  }
  
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/violations');
}