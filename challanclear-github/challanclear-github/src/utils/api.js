const PROMPT = (challan, statement) =>
  `You are an AI traffic violation evidence analyzer for ChallanClear, India's official traffic dispute platform.

Analyze this evidence image for a traffic dispute:
- Violation: ${challan.offense}
- Date/Time: ${challan.date} at ${challan.time}
- Location: ${challan.loc}
- Fine: Rs.${challan.fine}
- Citizen Statement: "${statement || 'None provided'}"

Respond ONLY with valid JSON (no markdown, no code blocks):
{"desc":"1-2 sentence description","verdict":"SUPPORTS_DISPUTE","conf":75,"obs":["point 1","point 2","point 3"],"rec":"APPROVE_DISPUTE","summary":"one line for officer"}

verdict: SUPPORTS_DISPUTE | REFUTES_DISPUTE | INCONCLUSIVE
rec: APPROVE_DISPUTE | REJECT_DISPUTE | NEEDS_REVIEW
conf: integer 0-100`;

export async function analyzeEvidence(b64, mime, challan, statement) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mime, data: b64 } },
            { type: 'text',  text: PROMPT(challan, statement) },
          ],
        }],
      }),
    });
    const data = await response.json();
    const raw = (data.content?.[0]?.text || '{}')
      .replace(/```json?|```/g, '').trim();
    return JSON.parse(raw);
  } catch (err) {
    console.error('AI analysis error:', err);
    return {
      desc: 'Automated analysis unavailable.',
      verdict: 'INCONCLUSIVE', conf: 0,
      obs: ['Manual review required.'],
      rec: 'NEEDS_REVIEW',
      summary: 'Automated analysis failed — please review manually.',
    };
  }
}

export async function reverseGeocode(lat, lng) {
  try {
    const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await res.json();
    return data.display_name || `${lat.toFixed(5)}N, ${lng.toFixed(5)}E`;
  } catch {
    return `${lat.toFixed(5)}N, ${lng.toFixed(5)}E`;
  }
}
