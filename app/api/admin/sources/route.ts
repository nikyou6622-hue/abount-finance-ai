import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: sources, error } = await supabase.from('sources').select('*').order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ sources: sources || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { name, type, url, category, scrape_interval_minutes = 30, is_active = true } = body;

    if (!name || !type || !url) return NextResponse.json({ error: 'Name, type, and url are required' }, { status: 400 });

    const { data, error } = await supabase.from('sources').insert({ name, type, url, category: category || 'AI & Tech', scrape_interval_minutes: parseInt(scrape_interval_minutes, 10), is_active }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ source: data, message: 'Source created successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { id, is_active, name, type, url, category, scrape_interval_minutes } = body;

    if (!id) return NextResponse.json({ error: 'Source ID is required' }, { status: 400 });

    const updateFields: any = {};
    if (typeof is_active === 'boolean') updateFields.is_active = is_active;
    if (name) updateFields.name = name;
    if (type) updateFields.type = type;
    if (url) updateFields.url = url;
    if (category) updateFields.category = category;
    if (scrape_interval_minutes) updateFields.scrape_interval_minutes = parseInt(scrape_interval_minutes, 10);

    const { data, error } = await supabase.from('sources').update(updateFields).eq('id', id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ source: data, message: 'Source updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Source ID is required' }, { status: 400 });

    const { error } = await supabase.from('sources').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: 'Source deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
