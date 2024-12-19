import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dyrmzpptypidxrhtintc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5cm16cHB0eXBpZHhyaHRpbnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTMzNzUsImV4cCI6MjA0OTE2OTM3NX0.R1coXys0qHV9_JgGServk8-O9e6dh0bpOG9egA28AKg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
