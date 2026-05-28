import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { auth } from '@clerk/nextjs/server';
import { createUserIfNotExists, deductCredit, getUserCredits } from '@/lib/supabase';

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function ask(prompt: string, maxTokens = 2500): Promise<string> {
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
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\t/g, ' ')
      .trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1) return fallback;
    const jsonStr = cleaned.substring(start, end + 1);
    return JSON.parse(jsonStr);
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

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await createUserIfNotExists(userId, '');
    const credits = await getUserCredits(userId);

    if (credits <= 0) {
      return NextResponse.json({ error: 'NO_CREDITS', message: 'You have no credits remaining. Please upgrade your plan.' }, { status: 402 });
    }

    const {
      mode, niche, platform, adAngle, targetAudience, influencerVibe, aesthetic,
      gender, characterArchetype, ethnicity, ageRange, bodyType, hairstyle, hairColor,
      outfit, sceneLocation, cameraAngle, lightingType, realismMode, ugcStyle,
      productDescription, reelDuration, videoTopic, customScene,
    } = body;

    const { beardOption, tattooOption, accessories } = body;

    const DURATION = reelDuration || '10';
    const TOPIC = videoTopic || '';

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
      '=== PRIMARY CREATIVE BRIEF (MUST FOLLOW EXACTLY) ===',
      TOPIC ? `VIDEO TOPIC & SCENE: ${TOPIC}` : null,
      TOPIC ? '⚠️ CRITICAL: Every single output — seedance brief, image prompts, captions, hooks, calendar — MUST be 100% about this exact topic and scene. Do NOT default to generic beauty or skincare content. Do NOT invent a different topic. The VIDEO TOPIC above is the ONLY topic.' : null,
      '=== SUPPORTING CONTEXT ===',
      `MODE: ${mode === 'ugc_ads' ? 'UGC ADS' : 'Content Creator'}`,
      `NICHE: ${niche}`,
      `PLATFORM: ${platform}`,
      mode === 'ugc_ads' ? `AD ANGLE: ${adAngle}` : null,
      mode === 'ugc_ads' ? `UGC STYLE: ${ugcStyle}` : null,
      mode === 'ugc_ads' ? `PRODUCT: ${productDescription}` : null,
      `AUDIENCE: ${targetAudience}`,
      `VIBE: ${influencerVibe}`,
      `AESTHETIC: ${aesthetic}`,
      `CHARACTER: ${CHARACTER}`,
      `SCENE SETTING: ${customScene ? customScene : (SCENES[sceneLocation] || SCENES['bathroom'])}`,
      `CAMERA: ${cameraAngle}`,
      `LIGHTING: ${lightingType}`,
      REALISM[realismMode] || REALISM['alive'],
    ].filter(Boolean).join('\n');

    // ── BRIEF + CALENDAR ──────────────────────────────────────────
    const b1 = `You are an elite AI UGC creative director. Generate a production brief STRICTLY based on the VIDEO TOPIC provided in the context below.

CRITICAL RULES:
- If the topic is about a therapist office, generate content about a therapist office
- If it is about morning skincare, generate that
- If it is about a coffee shop, generate that
- NEVER default to a generic topic or beauty content
- The VIDEO TOPIC is the ONLY topic — read it first before writing anything

CONTEXT:
${ctxLines}

Rules:
- title must reflect the exact VIDEO TOPIC word for word
- concept must be built around the exact scene and topic described
- hook must stop scroll for THIS specific topic only
- calendar must have 7 different content angles on THIS specific topic
- ALL string values under 80 chars, no line breaks inside strings

Respond with ONLY valid JSON, no markdown, no explanation:
{"brief":{"title":"specific title matching the video topic exactly","concept":"concept built around the exact scene described","emotional_arc":"emotional journey specific to this topic","hook":"scroll-stopping hook for this exact topic"},"calendar":[{"day":1,"concept":"angle on the specific topic","hook":"hook","format":"format","goal":"goal"},{"day":2,"concept":"different angle on same topic","hook":"hook","format":"format","goal":"goal"},{"day":3,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":4,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":5,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":6,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":7,"concept":"concept","hook":"hook","format":"format","goal":"goal"}]}`;

    // ── BRAND BOT ─────────────────────────────────────────────────
    const b2 = `You are a viral content strategist and platform algorithm expert in 2026.

CONTEXT:
${ctxLines}

CRITICAL RULES — ZERO EXCEPTIONS:
1. Read the VIDEO TOPIC first. Every hook, caption, keyword must be about THAT specific topic
2. ZERO generic placeholders like [niche], [specific niche context], [time/money/effort] — replace ALL with specific content from the topic above
3. ZERO generic captions. Every line must be topic-specific and audience-specific
4. Captions are 5-7 sentences minimum. Written like a REAL creator, not AI. Conversational chaos energy
5. ZERO corporate language. Write like texting your audience
6. ZERO basic hooks. No "POV:", no "This changed my life". Use specific unexpected angles
7. Keywords = exactly what people type in search for THIS topic. Long-tail, specific
8. Hashtags: 2 mega (1M+), 3 mid (100K-500K), 3 micro (10K-50K niche)
9. First comment: pinnable, adds value, includes keywords
10. Every output must be ready to copy-paste and post right now

Respond with ONLY valid compact JSON. Use | for paragraph breaks inside strings. No actual newlines inside JSON string values:
{"research_insight":"specific viral trend happening NOW for this exact topic with format and reason it works","competitor_gap":"what creators in this specific niche are NOT doing — the gap to own","viral_angle":"the specific angle for this exact video with highest viral chance","tiktok":{"hooks":["hook 1 — ultra specific to the video topic","hook 2 unexpected angle on this topic","hook 3 creates urgency around this topic","hook 4 controversial take on this topic","hook 5 question that demands an answer about this topic"],"caption":"sentence 1 opens mid-thought about the specific topic | sentence 2 deepens with specific detail | sentence 3 names the daily pain your audience feels about this | sentence 4 delivers value with a keyword woven in | sentence 5 FOMO or urgency specific to this topic | sentence 6 CTA that feels earned","keywords":["long tail keyword 1 specific to topic","specific search phrase 2","question people actually type about this","how to phrase 4","best for phrase 5","vs comparison 6","review phrase 7","specific result phrase 8","niche specific 9","trending topic 10","problem phrase 11","beginner search 12","creator specific 13","platform native 14","2026 trend 15"],"hashtags":["#mega1","#mega2","#mid1","#mid2","#mid3","#microniche1","#microniche2","#microniche3"],"first_comment":"pinnable comment adding a specific tip about this topic — 3-4 keywords used naturally"},"instagram":{"hooks":["reels hook 1 about this topic","hook 2","hook 3","hot take hook 4","aspirational hook 5"],"caption":"opening that stops the double-tap completely | specific detail with real emotion about this topic | names the pain audience was afraid to say out loud | delivers value with keywords woven naturally | relatable real moment or social proof | CTA tied to this specific content | final line giving a reason to save right now","keywords":["ig search 1","reels discovery 2","explore term 3","niche long tail 4","save-worthy topic 5","creator term 6","ai content term 7","product category 8","tutorial search 9","lifestyle niche 10","trend specific 11","audience pain 12","transformation term 13","comparison search 14","viral topic 15"],"hashtags":["#mega1","#mega2","#mid1","#mid2","#mid3","#micro1","#micro2","#micro3"],"first_comment":"drives saves and shares with a specific actionable tip and 3 keywords used naturally"},"youtube":{"hooks":["retention hook 1","hook 2","hook 3","hook 4","thumbnail click hook 5"],"caption":"opens with primary keyword — exactly what video delivers | secondary keywords woven naturally | subscribe or related content CTA | SEO-rich context about this topic","keywords":["youtube search 1","how to phrase 2","tutorial 3","review phrase 4","niche specific 5","beginner 6","advanced 7","2026 trend 8","comparison 9","best for 10","vs term 11","specific result 12","ai creator 13","channel niche 14","discovery 15"],"hashtags":["#ytshorts","#shortsviews","#mid1","#mid2","#mid3","#micro1","#micro2","#micro3"],"first_comment":"drives watch time and sparks comments with a question and specific value"},"voiceover":{"accent":"specific accent pace energy delivery style for this topic","script":"[0s] exact opening word about this topic [2s] specific line [5s] value delivery [8s] retention hook [10s] CTA"}}`;

    // ── SEEDANCE ──────────────────────────────────────────────────
    const b3 = `You are an elite Seedance 2.0 cinematic UGC director.

⚠️ RULE #1 — TOPIC LOCK: Read the VIDEO TOPIC in the context below RIGHT NOW. Your ENTIRE brief — every scene, every voiceover line, every action, every environment detail — must be about THAT specific topic. Not about beauty. Not about skincare. Not about anything else. About exactly what the user typed as their video topic.

⚠️ RULE #2 — COMPLETE SCENE BREAKDOWN: Write the complete scene breakdown with exact timestamps showing what happens second by second. This is the most important part.

⚠️ RULE #3 — COMPLETE VOICEOVER: The voiceover script must include every single word the character says, timestamped. NEVER start with "okay", "so", "hey guys". Always mid-thought, mid-action, caught in real life.

CONTEXT:
${ctxLines}

REEL DURATION: ${DURATION} seconds
REALISM MODE: ${(realismMode || 'alive').toUpperCase()}

---

SEEDANCE 2.0 — ${DURATION}s VERTICAL 9:16 UGC
${(realismMode || 'alive').toUpperCase()} MODE

WHAT THIS VIDEO IS ABOUT:
[Write 2-3 sentences describing exactly what happens in this video based on the user's VIDEO TOPIC. Be specific. Not generic. This is the story.]

FACE LOCK & IDENTITY SYSTEM:
[Full biometric anchor — bone structure, exact skin tone hex, eye shape/color, lip volume, jaw angle. Every frame must match. Drift = reject.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCENE BREAKDOWN — ${DURATION}s TOTAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Write ALL scenes with exact timestamps. For ${DURATION}s use:
- 7s = 3 scenes
- 10s = 4 scenes
- 15s = 5 scenes

FOR EACH SCENE WRITE:
[Xs – Xs] SCENE NAME IN CAPS
Setting: exactly where the character is and what the environment looks like — specific to the VIDEO TOPIC
Character action: what they are physically doing — caught mid-action, not posing
Voiceover — EXACT WORDS: "write every single word they say here in quotes"
Facial reaction: which muscles activate, how emotion builds
Biological detail: blink at [X.Xs] type, micro head drift
Camera: how iPhone frames this naturally]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL VOICEOVER SCRIPT — TIMESTAMPED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Complete script with timestamps. Every word. Every pause.
[0s] "—already mid-sentence when video starts"
[2s] [breath] "specific line about the actual topic"
NEVER start with okay / so / hey / guys / let me show you]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKIN REALISM LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pore depth, SSS intensity, T-zone oil zones + timing, under-eye depth, peach fuzz, 3 asymmetric imperfections. NO beauty filter. NO smoothing. NO waxy finish.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HUMAN BEHAVIOR SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5 involuntary behaviors specific to THIS scene and topic:
1. [before speaking]
2. [distraction — glance off-camera]
3. [concentration]
4. [reaction]
5. [habitual nervous tell]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLINK SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Every blink with timestamp and type: asymmetric / double micro / slow deliberate / half-refocus]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NERVOUS SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Head drift, breath cycle, posture shift, eye dart path with timestamps.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAMERA — iPhone handheld
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No stabilization. Autofocus hunts at specific transition. Exposure breathes. Rolling shutter micro-warp. Framing drifts — never corrected.

FINAL CUT: Video ends mid-natural movement. Last ambient sound continues 0.3s after voiceover.

REALISM KILLERS — 10 hard NOs specific to THIS scene and topic:
[10 things that would break realism for this specific topic]

UGC KILLERS — 5 hard NOs:
[5 things that would make this look studio not real life]`;

    // ── KLING + RUNWAY ────────────────────────────────────────────
    const b4 = `Write two complete master production prompts for:
${ctxLines}

===KLING MASTER PROMPT===
Complete Kling 1.6 prompt. Include: SUBJECT full character, ACTION sequence with timing specific to the video topic, WORLD STATE, CAMERA angle and movement, LIGHTING full setup, ENVIRONMENT with background life, EMOTION, SKIN TRUTH realism, NEGATIVE PROMPTS 10 items, TECHNICAL 4K 24fps 9:16.

===RUNWAY MASTER PROMPT===
Complete Runway Gen-4 prompt. Include: SCENE cinematic description specific to the video topic, SUBJECT full character, MOTION and camera, COLOR GRADE full description, MOOD, LIGHTING, CAMERA behavior, NEGATIVE 8 items, FORMAT 9:16.`;

    // ── SKIN ENGINE ───────────────────────────────────────────────
    const SKIN_ENGINE = `SKIN REALISM ENGINE: Biologically accurate human skin with visible fine pores, realistic epidermal texture, subtle tonal variation, natural oil distribution, and soft subsurface scattering. Skin must retain texture integrity even during close-up shots. Fine peach fuzz visible in side lighting. Realistic under-eye depth, natural creasing around mouth and eyes, asymmetrical pore distribution, slight redness variations around nose and cheeks, tiny imperfections and micro texture inconsistencies. Skin reflections are uneven and physically grounded, never glossy or plastic. NO beauty filter, NO smoothing, NO airbrushed diffusion, NO waxy CGI texture, NO influencer makeup skin, NO over-retouched perfection. Lighting must interact naturally with skin surface, revealing pores, micro shadows, and texture transitions. Macro facial realism preserved at all zoom levels.`;

    // ── MIDJOURNEY ────────────────────────────────────────────────
    const b5_mj = `You are an elite AI image director. Write ONE complete Midjourney v6.1 prompt only.

${ctxLines}

${SKIN_ENGINE}

The image must depict the character in the exact scene described by the VIDEO TOPIC above. Write a single flowing paragraph — full character description, what the character is DOING (action specific to the video topic), scene environment, lighting direction, mood, camera lens and angle, aesthetic, skin realism requirements. Minimum 250 words. End with:
--ar 9:16 --v 6.1 --style raw --q 2 --s 750`;

    // ── FLUX ──────────────────────────────────────────────────────
    const b5_flux = `You are an elite AI image director. Write ONE complete Flux Dev prompt only.

${ctxLines}

${SKIN_ENGINE}

The image must depict the character in the exact scene described by the VIDEO TOPIC above. Write a complete commercial photography prompt. Full subject with action specific to the video topic, scene, lighting with specific sources, mood, camera, composition, skin realism. Minimum 250 words. End with:
--ar 9:16 --steps 30 --guidance 3.5`;

    // ── NANO BANANA ───────────────────────────────────────────────
    const b5_nano = `You are an elite AI image director specialising in Nano Banana 2 — a STATIC IMAGE generation tool (NOT video). Write ONE complete Nano Banana 2 IMAGE prompt.

${ctxLines}

${SKIN_ENGINE}

The image must capture the character in the exact moment described by the VIDEO TOPIC above — caught mid-action in that specific scene.

Start with the EXACT ACTION the subject is doing in the video topic scene.
SUBJECT: [complete physical description head to waist — skin tone, bone structure, hair, expression]
SKIN REALISM: [pore visibility, subsurface scattering, natural texture, oil distribution, under-eye depth — apply full skin engine]
HAIR: [individual strand visibility, natural flyaways, movement caught mid-frame, realistic root behavior]
ENVIRONMENT: [specific location detail matching the video topic, background depth, environmental objects]
LIGHTING: [exact light source, quality, color temperature, shadows on skin, catch light in eyes]
LENS: [focal length, aperture, depth of field]
COMPOSITION: [framing — where subject sits in frame]
MOOD: [emotional quality specific to the video topic]
NEGATIVE: [15 specific things to avoid — beauty filter, smoothing, plastic skin, posed look, studio lighting, perfect symmetry, AI glow, generic beauty content, etc.]
TECHNICAL: --ar 9:16 --style raw --q 2

Minimum 300 words. Every word must reinforce biological accuracy and photographic realism.`;

    // ── PARALLEL GENERATION ───────────────────────────────────────
    const [r1, r2, r3, r4, r_mj, r_flux, r_nano] = await Promise.all([
      ask(b1, 800),
      ask(b2, 2500),
      ask(b3, 1500),
      ask(b4, 2000),
      ask(b5_mj, 700),
      ask(b5_flux, 700),
      ask(b5_nano, 900),
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
        brief_summary: { ...briefData.brief, mode },
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
