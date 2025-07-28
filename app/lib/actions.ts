'use server';

import { supabaseAdmin } from './supabase-admin';
import { revalidatePath } from 'next/cache';

// --- USER ACTIONS ---

export async function getUsers() {
  const { data, error } = await supabaseAdmin
    .from('users_profile') // Assuming a 'users_profile' table
    .select('id, username, email, role');

  if (error) {
    console.error('Supabase error:', error.message);
    throw new Error('Failed to fetch users.');
  }
  return data;
}

export async function addUser(formData: FormData) {
  const newUser = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  
  const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser(newUser);

  if (authError) {
    console.error('Supabase auth error:', authError.message);
    throw new Error(authError.message);
  }

  const { error: profileError } = await supabaseAdmin
    .from('users_profile')
    .update({
      username: formData.get('username') as string,
      role: formData.get('role') as string,
    })
    .eq('id', user!.id);

  if (profileError) {
    console.error('Supabase profile error:', profileError.message);
    throw new Error('Failed to update user profile.');
  }

  revalidatePath('/dashboard/users');
}

export async function deleteUser(id: string) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) {
    console.error('Supabase error:', error.message);
    throw new Error('Failed to delete user.');
  }
  revalidatePath('/dashboard/users');
}

export async function updateUser(formData: FormData) {
  const id = formData.get('id') as string;
  const updatedData = {
    username: formData.get('username') as string,
    role: formData.get('role') as string,
  };
  
  const { error } = await supabaseAdmin
    .from('users_profile')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    console.error('Supabase error:', error.message);
    throw new Error('Failed to update user.');
  }
  revalidatePath('/dashboard/users');
}

// --- VIOLATION ACTIONS ---

export async function getViolations() {
  const { data, error } = await supabaseAdmin
    .from('violations')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Supabase error:', error.message);
    throw new Error('Failed to fetch violations.');
  }
  return data;
}

export async function addViolation(formData: FormData) {
  const newViolation = {
    description: formData.get('description') as string,
    violation_type: formData.get('violation_type') as string,
    location: formData.get('location') as string,
    date: new Date().toISOString(),
    resolved: formData.get('resolved') === 'on',
  };

  const { error } = await supabaseAdmin.from('violations').insert(newViolation);
  if (error) throw new Error('Failed to create violation.');
  
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/violations');
}

export async function updateViolation(formData: FormData) {
  const id = formData.get('id') as string;
  const updatedViolation = {
    description: formData.get('description') as string,
    violation_type: formData.get('violation_type') as string,
    location: formData.get('location') as string,
    resolved: formData.get('resolved') === 'on',
  };

  const { error } = await supabaseAdmin.from('violations').update(updatedViolation).eq('id', id);
  if (error) throw new Error('Failed to update violation.');
  
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/violations');
}

export async function deleteViolation(id: number) {
  const { error } = await supabaseAdmin.from('violations').delete().eq('id', id);
  if (error) throw new Error('Failed to delete violation.');
  
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/violations');
}