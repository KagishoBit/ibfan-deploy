import { supabase } from './supabase';
import { DashboardStats } from './types'; // Import our new type
import { unstable_noStore as noStore } from 'next/cache';

// The function now explicitly promises to return our DashboardStats type
export async function fetchDashboardStats(): Promise<DashboardStats> {
  // Prevents the response from being cached, ensuring fresh data on every request
  noStore();

  try {
    const sevenDaysAgo = new Date();
    // Using the current date of July 27, 2025
    sevenDaysAgo.setDate(new Date('2025-07-27T00:00:00Z').getDate() - 7);

    // Perform all queries concurrently
    const [
      reportedResult,
      confirmedResult,
      pendingResult,
      newResult,
      userResult
    ] = await Promise.all([
      supabase.from('violations').select('*', { count: 'exact', head: true }),
      supabase.from('violations').select('*', { count: 'exact', head: true }).eq('resolved', true),
      supabase.from('violations').select('*', { count: 'exact', head: true }).eq('resolved', false),
      supabase.from('violations').select('*', { count: 'exact', head: true }).gte('date', sevenDaysAgo.toISOString()),
      supabase.from('users').select('*', { count: 'exact', head: true })
    ]);

    // Check for errors in each query result
    if (reportedResult.error) throw reportedResult.error;
    if (confirmedResult.error) throw confirmedResult.error;
    if (pendingResult.error) throw pendingResult.error;
    if (newResult.error) throw newResult.error;
    if (userResult.error) throw userResult.error;

    // Construct the type-safe return object
    const stats: DashboardStats = {
      reportedCount: reportedResult.count ?? 0,
      confirmedCount: confirmedResult.count ?? 0,
      pendingCount: pendingResult.count ?? 0,
      newCount: newResult.count ?? 0,
      userCount: userResult.count ?? 0,
    };

    return stats;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dashboard statistics.');
  }
}