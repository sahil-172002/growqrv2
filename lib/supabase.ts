import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please check your .env file.');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);

// Helper function to check connection
export const checkSupabaseConnection = async () => {
    try {
        const { error } = await supabase.from('_test_connection').select('*').limit(1);
        // This will likely fail with a table not found error, but that's ok - it means we're connected
        if (error && !error.message.includes('does not exist')) {
            console.error('Supabase connection error:', error.message);
            return false;
        }
        console.log('Supabase connected successfully!');
        return true;
    } catch (err) {
        console.error('Supabase connection failed:', err);
        return false;
    }
};

// Export types for use in the app
export type { User, Session } from '@supabase/supabase-js';
