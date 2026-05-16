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

    const b2 = `You are a senior UGC ad strategist (2026 standard) for ${niche}. Brief:\n${ctxLines}\n\nCAPTIONS must be 5+ sentences, conversational, chaotic energy, NOT corporate, naturally include 5-6 keywords, platform-native. Use | for line breaks.\nHOOKS must stop scroll in 2 seconds, feel native not like an ad.\nKEYWORDS: 15 per platform, what real people search.\nHASHTAGS: 8 per platform, platform-safe.\n\nRespond with ONLY valid compact JSON. No line breaks inside strings. Use | for line breaks in captions:\n{"research_insight":"current trend insight","competitor_gap":"what competitors miss","tiktok":{"hooks":["hook1","hook2","hook3","hook4","hook5"],"caption":"full 5+ sentence caption with | between thoughts and 5-6 keywords woven in naturally","keywords":["kw1","kw2","kw3","kw4","kw5","kw6","kw7","kw8","kw9","kw10","kw11","kw12","kw13","kw14","kw15"],"hashtags":["#t1","#t2","#t3","#t4","#t5","#t6","#t7","#t8"],"first_comment":"first comment with keywords"},"instagram":{"hooks":["hook1","hook2","hook3","hook4","hook5"],"caption":"full 6+ sentence instagram caption with | between paragraphs story format with keywords woven in","keywords":["kw1","kw2","kw3","kw4","kw5","kw6","kw7","kw8","kw9","kw10","kw11","kw12","kw13","kw14","kw15"],"hashtags":["#t1","#t2","#t3","#t4","#t5","#t6","#t7","#t8"],"first_comment":"first comment encouraging saves"},"youtube":{"hooks":["hook1","hook2","hook3","hook4","hook5"],"caption":"full youtube description with keywords for search optimization","keywords":["kw1","kw2","kw3","kw4","kw5","kw6","kw7","kw8","kw9","kw10","kw11","kw12","kw13","kw14","kw15"],"hashtags":["#t1","#t2","#t3","#t4","#t5","#t6","#t7","#t8"],"first_comment":"first comment driving watch time"},"voiceover":{"accent":"accent and delivery","script":"timestamped script with markers"}}`;

    const b3 = `You are an elite AI UGC creative director at Velora standard. Write a COMPLETE Seedance 2.0 production document. Minimum 500 words. Match the Dina Beauty brief standard exactly.\n\n${ctxLines}\n\nFormat:\nSEEDANCE 2.0 — 10 SECOND VERTICAL 9:16 UGC AD\n${(realismMode || 'alive').toUpperCase()} MODE ACTIVE\n\nFACE LOCK: [full character description]\nIDENTITY MUST NOT DRIFT ACROSS ANY FRAME.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[0s - 3s] HOOK MOMENT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[world state, character position, biological realism with exact timestamps, exact dialogue with accent]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[3s - 6s] SCENE NAME\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[action, voiceover, product lock if applicable]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[6s - 9s] SCENE NAME\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[application, transformation, voiceover]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[9s - 10s] FINAL REVEAL\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[final action, emotion, camera. Video ends mid-natural moment.]\n\nBLINK SCHEDULE:\n[6 exact timestamps with blink type]\n\nNERVOUS SYSTEM BEHAVIOR:\n[micro head drift, breath cycle, posture shift, eye darts]\n\nCAMERA BEHAVIOR:\n[device, stabilization NONE, autofocus, exposure breathing, rolling shutter, framing]\n\nFULL VOICEOVER SCRIPT:\n[complete timestamped script]\n\nREALISM ENFORCEMENT:\nREALISM KILLERS: [10 NO statements]\nUGC KILLERS: [5 NO statements]\nIDENTITY KILLERS: [5 NO statements]`;

    const b4 = `Write two complete master production prompts for:\n${ctxLines}\n\n===KLING MASTER PROMPT===\nComplete Kling 1.6 prompt. Include: SUBJECT full character, ACTION sequence with timing, WORLD STATE, CAMERA angle and movement, LIGHTING full setup, ENVIRONMENT with background life, EMOTION, SKIN TRUTH realism, NEGATIVE PROMPTS 10 items, TECHNICAL 4K 24fps 9:16.\n\n===RUNWAY MASTER PROMPT===\nComplete Runway Gen-4 prompt. Include: SCENE cinematic description, SUBJECT full character, MOTION and camera, COLOR GRADE full description, MOOD, LIGHTING, CAMERA behavior, NEGATIVE 8 items, FORMAT 9:16.`;

    const SKIN_ENGINE = `SKIN REALISM ENGINE: Biologically accurate human skin with visible fine pores, realistic epidermal texture, subtle tonal variation, natural oil distribution, and soft subsurface scattering. Skin must retain texture integrity even during close-up shots. Fine peach fuzz visible in side lighting. Realistic under-eye depth, natural creasing around mouth and eyes, asymmetrical pore distribution, slight redness variations around nose and cheeks, tiny imperfections and micro texture inconsistencies. Skin reflections are uneven and physically grounded, never glossy or plastic. NO beauty filter, NO smoothing, NO airbrushed diffusion, NO waxy CGI texture, NO influencer makeup skin, NO over-retouched perfection. Lighting must interact naturally with skin surface, revealing pores, micro shadows, and texture transitions. Macro facial realism preserved at all zoom levels.`;

    const b5_mj = `You are an elite AI image director. Write ONE complete Midjourney v6.1 prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nWrite a single flowing paragraph — full character description, what the character is DOING (action), scene environment, lighting direction, mood, camera lens and angle, aesthetic, skin realism requirements. Minimum 250 words. End with:\n--ar 9:16 --v 6.1 --style raw --q 2 --s 750`;

    const b5_flux = `You are an elite AI image director. Write ONE complete Flux Dev prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nWrite a complete commercial photography prompt. Full subject with action, scene, lighting with specific sources, mood, camera, composition, skin realism. Minimum 250 words. End with:\n--ar 9:16 --steps 30 --guidance 3.5`;

    const b5_nano = `You are an elite AI image director. Write ONE complete Nano Banana 2 prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nStart with ACTION — what the character is doing. Apply full skin realism engine. HAIR: individual strands visible, natural movement, flyaways, NO helmet hair NO waxy shine. Full character, scene, lighting, emotion, camera. Every word must reinforce biological accuracy. Minimum 250 words.`;

    const [r1, r2, r3, r4, r_mj, r_flux, r_nano] = await Promise.all([
      ask(b1, 1500),
      ask(b2, 2500),
      ask(b3, 3000),
      ask(b4, 2000),
      ask(b5_mj, 1200),
      ask(b5_flux, 1200),
      ask(b5_nano, 1800),
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