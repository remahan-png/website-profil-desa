import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Pastikan token ada dan cocok
  if (secret !== REVALIDATION_TOKEN || !REVALIDATION_TOKEN) {
    return NextResponse.json({ revalidated: false, message: 'Invalid or missing secret token' }, { status: 401 });
  }

  try {
    // Revalidasi path utama '/'
    revalidatePath('/');
    return NextResponse.json({ revalidated: true, now: Date.now(), path: '/' });
  } catch (err) {
    return NextResponse.json({ revalidated: false, message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}

