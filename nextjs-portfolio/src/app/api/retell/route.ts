import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { agentId } = await req.json();

        if (!agentId) {
            return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
        }

        const apiKey = process.env.RETELL_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Retell API Key is not configured' }, { status: 500 });
        }

        const response = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                agent_id: agentId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Retell API Error:', errorData);
            return NextResponse.json({ error: 'Failed to create web call', details: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ access_token: data.access_token });
    } catch (error) {
        console.error('Error generating Retell access token:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
