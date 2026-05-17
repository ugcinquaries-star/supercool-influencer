import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function ask(prompt: string, maxTokens = 2000): Promise<string> {
  const r = await claude.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  });
  const block = r.content[0];
  return block.type === 'text' ? block.text : '';
}

function safeJSON(text: string, fallback: any = {}): any {
  try {
    const cleaned = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ')
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('JSON parse failed:', (e as Error).message);
    console.error('Raw:', text.slice(0, 300));
    return fallback;
  }
}

function extractSection(text: string, marker: string): string {
  const parts = text.split(marker);
  if (parts.length < 2) return text.trim();
  const section = parts[1];
  const nextMarker = section.indexOf('===');
  if (nextMarker === -1) return section.trim();
  return section.slice(0, nextMarker).trim();
}
import { auth } from '@clerk/nextjs/server';
import { createUserIfNotExists, deductCredit, getUserCredits } from '@/lib/supabase';
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    await createUserIfNotExists(userId, '');
    const credits = await getUserCredits(userId);
if (credits <= 0) {
      return NextResponse.json({ error: 'NO_CREDITS', message: 'You have no credits remaining. Please upgrade your plan.' }, { status: 402 });
    }    const { mode, niche, platform, adAngle, targetAudience, influencerVibe, aesthetic, gender, characterArchetype, ethnicity, ageRange, bodyType, hairstyle, hairColor, outfit, sceneLocation, cameraAngle, lightingType, realismMode, ugcStyle, productDescription } = body;
    const { beardOption, tattooOption, accessories } = body;
    const CHARACTER = `${gender} | ${characterArchetype} | ${ethnicity} | Age ${ageRange} | Body: ${bodyType} | Hair: ${hairstyle} in ${hairColor}${beardOption ? ' | Beard: ' + beardOption : ''}${tattooOption ? ' | Tattoos: ' + tattooOption : ''} | Outfit: ${outfit}${accessories ? ' | Accessories: ' + accessories : ''}`;

    const SCENES: Record<string, string> = {
      bathroom: 'Bathroom: mirror fogging, showerhead dripping, steam rising, phone timer on counter',
      bedroom: 'Bedroom: sunbeam through curtains, duvet rumpled, phone charging, ceiling fan rotating',
      kitchen: 'Kitchen: coffee maker gurgling, morning sunlight on tiles, phone buzzing face-down',
      living_room: 'Living Room: TV muted, throw blanket falling off couch, window light fading',
      car: 'Car: parking lot ambient, AC humming, phone on dashboard, sunlight through windshield',
      hotel: 'Hotel: marble counter, city view window, crisp white towels, premium quiet',
      spa: 'Spa: ambient music, candles flickering, treatment room warm light, robe and towel',
      fitness: 'Gym: gym echo, workout clothes on, water bottle condensating, skin dewy',
      coffee_shop: 'Coffee Shop: espresso machine, coffee steaming, laptop open, street through window',
      outdoor_street: 'Street: city sounds, golden hour light, pedestrians passing, wind in hair',
      airport: 'Airport: departure gate ambient, rolling luggage, boarding announcement, terminal lighting',
      hospital: 'Hospital/Clinic: clinical lighting, clean white environment, professional personal moment',
      travel_city: 'Travel/City: iconic city backdrop, outdoor light, cultural landmarks softly blurred',
      gala_celebrity: 'Gala/Red Carpet: dramatic event lighting, formal venue, crowd energy, luxury environment',
      amusement_museum: 'Amusement/Museum: ambient crowd noise, colorful environment, curiosity and wonder',
      concert_event: 'Concert/Event: venue lighting, crowd energy, music atmosphere, phone flashlights',
    };

    const REALISM: Record<string, string> = {
      alive: 'ALIVE REALISM: exact blink schedule with timestamps, micro-expressions (lip press 0.2s before speech), nervous system (micro head drift 0.3mm constant, shoulder breath every 2.5s), skin truth (visible pores, T-zone shine, peach fuzz), eye micro-darting.',
      ultra: 'ULTRA REALISM: maximum raw authenticity, rolling shutter, zero beauty filter, environmental friction, interruption logic, asymmetric blinks.',
      everyday: 'EVERYDAY REALISM: relatable, natural, unposed, casual creator energy, zero over-polish.',
      brand_clean: 'BRAND CLEAN: polished but human, subtle posture shift, natural blink, fabric movement, premium feel.',
    };

    const ctxLines = [
      'MODE: ' + (mode === 'ugc_ads' ? 'UGC ADS' : 'Content Creator'),
      'NICHE: ' + niche,
      'PLATFORM: ' + platform,
      mode === 'ugc_ads' ? 'AD ANGLE: ' + adAngle : null,
      mode === 'ugc_ads' ? 'UGC STYLE: ' + ugcStyle : null,
      mode === 'ugc_ads' ? 'PRODUCT: ' + productDescription : null,
      'AUDIENCE: ' + targetAudience,
      'VIBE: ' + influencerVibe,
      'AESTHETIC: ' + aesthetic,
      'CHARACTER: ' + CHARACTER,
      'SCENE: ' + (SCENES[sceneLocation] || SCENES['bathroom']),
      'CAMERA: ' + cameraAngle,
      'LIGHTING: ' + lightingType,
      REALISM[realismMode] || REALISM['alive'],
    ].filter(Boolean).join('\n');

    const b1 = `You are an elite AI UGC creative director. Generate a production brief for:\n${ctxLines}\n\nRespond with ONLY this JSON structure. Keep ALL string values under 80 characters. No line breaks inside strings:\n{"brief":{"title":"short title","concept":"short concept","emotional_arc":"short arc","hook":"short hook"},"calendar":[{"day":1,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":2,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":3,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":4,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":5,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":6,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":7,"concept":"concept","hook":"hook","format":"format","goal":"goal"}]}`;

    const b2 = `You are a viral content strategist and platform algorithm expert in 2026. Your job: analyse what is CURRENTLY driving views on TikTok, Instagram Reels and YouTube Shorts for this niche, then generate platform-native content with the highest viral potential.

NICHE: \${niche}
CONTEXT: \${ctxLines}

MENTALLY RESEARCH FIRST before writing anything:
What FORMAT is dominating TikTok for this niche right now? What SPECIFIC keywords are people typing into TikTok and Instagram search? What pain points are getting 1M+ views? What exact first words are stopping scroll? What hashtag mix drives discovery?

RULES — ZERO EXCEPTIONS:
1. ZERO generic captions. Every line niche-specific, topic-specific, audience-specific
2. Captions are 5-7 sentences minimum. Written like a REAL creator not AI. Conversational chaos energy
3. ZERO corporate language. Write like texting your audience
4. ZERO basic hooks. No POV: No This changed my life. Use specific unexpected angles, controversy, or curiosity gap
5. Keywords = exactly what people type in search. Long-tail, specific. Not skincare — think is X serum worth it 2026
6. Hashtags: 2 mega (1M+), 3 mid (100K-500K), 3 micro (10K-50K niche)
7. First comment: pinnable, adds value, includes keywords the caption could not fit
8. Every output must be ready to copy-paste and post right now

Respond with ONLY valid compact JSON. Use | for paragraph breaks inside strings. No actual newlines inside JSON string values:
{"research_insight":"specific viral trend happening NOW in this niche with exact format and reason it works","competitor_gap":"what top creators in this niche are NOT doing — the gap you can own","viral_angle":"the specific angle for this video with highest viral chance based on current platform behavior","tiktok":{"hooks":["hook 1 referencing exact niche pain or curiosity gap — ultra specific","hook 2 unexpected angle","hook 3 creates urgency","hook 4 controversial hot take","hook 5 question format that demands an answer"],"caption":"sentence 1 opens mid-thought like a real person texting not AI | sentence 2 deepens with specific niche detail not vague | sentence 3 names the daily pain your audience feels | sentence 4 delivers value with a keyword woven in naturally | sentence 5 FOMO or urgency specific to this niche | sentence 6 CTA that feels earned and natural not salesy","keywords":["long tail keyword 1","specific search phrase 2","question people actually type 3","how to phrase 4","best for phrase 5","vs comparison 6","review phrase 7","specific result phrase 8","niche specific 9","trending topic 10","problem phrase 11","beginner search 12","creator specific 13","platform native 14","2026 trend 15"],"hashtags":["#mega1","#mega2","#mid1","#mid2","#mid3","#microniche1","#microniche2","#microniche3"],"first_comment":"pinnable comment adding a specific tip that makes people save — 3-4 keywords used naturally"},"instagram":{"hooks":["reels hook 1","hook 2","hook 3","hot take hook 4","aspirational hook 5"],"caption":"opening that stops the double-tap completely | specific niche detail with real emotion | names the pain audience was afraid to say out loud | delivers value with keywords woven naturally | relatable real moment or social proof | CTA tied to this specific content | final line giving a reason to save right now","keywords":["ig search 1","reels discovery 2","explore term 3","niche long tail 4","save-worthy topic 5","beauty creator term 6","ai content term 7","product category 8","tutorial search 9","lifestyle niche 10","trend specific 11","audience pain 12","transformation term 13","comparison search 14","viral topic 15"],"hashtags":["#mega1","#mega2","#mid1","#mid2","#mid3","#micro1","#micro2","#micro3"],"first_comment":"drives saves and shares with a specific actionable tip and 3 keywords used naturally"},"youtube":{"hooks":["retention hook 1","hook 2","hook 3","hook 4","thumbnail click hook 5"],"caption":"opens with primary keyword exactly what video delivers | secondary keywords woven naturally | subscribe or related content CTA | SEO-rich context about the niche | timestamps if applicable","keywords":["youtube search 1","how to phrase 2","tutorial 3","review phrase 4","niche specific 5","beginner 6","advanced 7","2026 trend 8","comparison 9","best for 10","vs term 11","specific result 12","ai creator 13","channel niche 14","discovery 15"],"hashtags":["#ytshorts","#shortsviews","#mid1","#mid2","#mid3","#micro1","#micro2","#micro3"],"first_comment":"drives watch time and sparks comments with a question and specific value"},"voiceover":{"accent":"specific accent pace energy delivery style for this niche","script":"[0s] exact opening word [2s] specific line [5s] value delivery [8s] retention hook [10s] CTA"}}`;

    const b3 = `You are an elite AI UGC creative director at Velora standard. Write a COMPLETE Seedance 2.0 production document. Minimum 500 words. Match the Dina Beauty brief standard exactly.\n\n${ctxLines}\n\nFormat:\nSEEDANCE 2.0 — 10 SECOND VERTICAL 9:16 UGC AD\n${(realismMode || 'alive').toUpperCase()} MODE ACTIVE\n\nFACE LOCK: [full character description]\nIDENTITY MUST NOT DRIFT ACROSS ANY FRAME.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[0s - 3s] HOOK MOMENT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[world state, character position, biological realism with exact timestamps, exact dialogue with accent]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[3s - 6s] SCENE NAME\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[action, voiceover, product lock if applicable]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[6s - 9s] SCENE NAME\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[application, transformation, voiceover]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[9s - 10s] FINAL REVEAL\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[final action, emotion, camera. Video ends mid-natural moment.]\n\nBLINK SCHEDULE:\n[6 exact timestamps with blink type]\n\nNERVOUS SYSTEM BEHAVIOR:\n[micro head drift, breath cycle, posture shift, eye darts]\n\nCAMERA BEHAVIOR:\n[device, stabilization NONE, autofocus, exposure breathing, rolling shutter, framing]\n\nFULL VOICEOVER SCRIPT:\n[complete timestamped script]\n\nREALISM ENFORCEMENT:\nREALISM KILLERS: [10 NO statements]\nUGC KILLERS: [5 NO statements]\nIDENTITY KILLERS: [5 NO statements]`;

    const b4 = `Write two complete master production prompts for:\n${ctxLines}\n\n===KLING MASTER PROMPT===\nComplete Kling 1.6 prompt. Include: SUBJECT full character, ACTION sequence with timing, WORLD STATE, CAMERA angle and movement, LIGHTING full setup, ENVIRONMENT with background life, EMOTION, SKIN TRUTH realism, NEGATIVE PROMPTS 10 items, TECHNICAL 4K 24fps 9:16.\n\n===RUNWAY MASTER PROMPT===\nComplete Runway Gen-4 prompt. Include: SCENE cinematic description, SUBJECT full character, MOTION and camera, COLOR GRADE full description, MOOD, LIGHTING, CAMERA behavior, NEGATIVE 8 items, FORMAT 9:16.`;

    const SKIN_ENGINE = `SKIN REALISM ENGINE: Biologically accurate human skin with visible fine pores, realistic epidermal texture, subtle tonal variation, natural oil distribution, and soft subsurface scattering. Skin must retain texture integrity even during close-up shots. Fine peach fuzz visible in side lighting. Realistic under-eye depth, natural creasing around mouth and eyes, asymmetrical pore distribution, slight redness variations around nose and cheeks, tiny imperfections and micro texture inconsistencies. Skin reflections are uneven and physically grounded, never glossy or plastic. NO beauty filter, NO smoothing, NO airbrushed diffusion, NO waxy CGI texture, NO influencer makeup skin, NO over-retouched perfection. Lighting must interact naturally with skin surface, revealing pores, micro shadows, and texture transitions. Macro facial realism preserved at all zoom levels.`;

    const b5_mj = `You are an elite AI image director. Write ONE complete Midjourney v6.1 prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nWrite a single flowing paragraph — full character description, what the character is DOING (action), scene environment, lighting direction, mood, camera lens and angle, aesthetic, skin realism requirements. Minimum 250 words. End with:\n--ar 9:16 --v 6.1 --style raw --q 2 --s 750`;

    const b5_flux = `You are an elite AI image director. Write ONE complete Flux Dev prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nWrite a complete commercial photography prompt. Full subject with action, scene, lighting with specific sources, mood, camera, composition, skin realism. Minimum 250 words. End with:\n--ar 9:16 --steps 30 --guidance 3.5`;

    const b5_nano = `You are an elite AI image director. Write ONE complete Nano Banana 2 prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nStart with ACTION — what the character is doing. Apply full skin realism engine. HAIR: individual strands visible, natural movement, flyaways, NO helmet hair NO waxy shine. Full character, scene, lighting, emotion, camera. Every word must reinforce biological accuracy. Minimum 250 words.`;

    const [r1, r2, r3, r4, r_mj, r_flux, r_nano] = await Promise.all([
      ask(b1, 800),
      ask(b2, 1200),
      ask(b3, 1200),
      ask(b4, 2000),
      ask(b5_mj, 600),
      ask(b5_flux, 600),
      ask(b5_nano, 800),
    ]);

    const briefData = safeJSON(r1, {
      brief: { title: '', concept: '', emotional_arc: '', hook: '' },
      calendar: [],
    });

    const brandData = safeJSON(r2, {
      research_insight: '',
      competitor_gap: '',
      tiktok: { hooks: [], caption: '', keywords: [], hashtags: [], first_comment: '' },
      instagram: { hooks: [], caption: '', keywords: [], hashtags: [], first_comment: '' },
      youtube: { hooks: [], caption: '', keywords: [], hashtags: [], first_comment: '' },
      voiceover: { accent: '', script: '' },
    });

    await deductCredit(userId);
    return NextResponse.json({
      success: true,
      data: {
        brief_summary: briefData.brief,
        calendar: briefData.calendar,
        brand_identity: brandData,
        seedance_master: r3,
        kling_master: extractSection(r4, '===KLING MASTER PROMPT==='),
        runway_master: extractSection(r4, '===RUNWAY MASTER PROMPT==='),
        midjourney_master: r_mj,
        flux_master: r_flux,
        nanobanana_master: r_nano,
      },
    });

  } catch (error: any) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
