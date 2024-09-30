import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://jvcnqjxrkzvrjoggapns.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Y25xanhya3p2cmpvZ2dhcG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MTI4MzcsImV4cCI6MjA0MzE4ODgzN30.sEHVaYZ--MX6XADQRKK6cl1lXR58aRaBdL8OfCL0nV0'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;