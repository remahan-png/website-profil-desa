"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '../lib/supabaseClient';

// Komponen ini digunakan sebagai wrapper di Client Components yang membutuhkan 
// pengecekan status admin.
export default function AdminCheck({ children, showIfAdmin = true, redirectUrl = '/login' }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            setLoading(true);
            const { data: { session } } = await supabaseClient.auth.getSession();
            
            if (session) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                if (showIfAdmin) {
                    router.push(redirectUrl);
                }
            }
            setLoading(false);
        };
        
        checkSession();

        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    setIsAuthenticated(true);
                }
                if (event === 'SIGNED_OUT') {
                    setIsAuthenticated(false);
                    if (showIfAdmin) {
                        router.push(redirectUrl);
                    }
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [router, redirectUrl, showIfAdmin]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold text-gray-500">Memuat sesi admin...</div>
            </div>
        );
    }

    if (showIfAdmin) {
        // Jika hanya ditampilkan jika admin, dan sudah terotentikasi, tampilkan konten
        return isAuthenticated ? children : null;
    } else {
        // Jika digunakan untuk toggle visibility (misal tombol di public page), 
        // return null jika tidak terautentikasi, atau children jika iya.
        return isAuthenticated ? children : null;
    }
}