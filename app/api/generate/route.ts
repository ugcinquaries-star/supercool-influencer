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
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\t/g, ' ')
      .trim();
    // Find first { and last } to extract JSON object
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

    const b3 = `You are a world-class AI video director specialising in Seedance 2.0 cinematic UGC. Every brief you write is COMPLETELY UNIQUE — different voiceover opening, different hook angle, different scene energy, different emotional arc. NEVER start with "okay" or "so" or generic openers. NEVER repeat the same structure twice.

BRIEF CONTEXT:
\${ctxLines}

RANDOMISATION SEED: Generate from a DIFFERENT emotional angle each time. Rotate through: confession, discovery, transformation reveal, behind-the-scenes, real reaction, accidental viral moment, before-and-after, day-in-my-life moment. Pick one that hasn't been used for this niche recently.

Write a COMPLETE Seedance 2.0 production document with ALL of the following layers:

SEEDANCE 2.0 — 10 SECOND VERTICAL 9:16
\${(realismMode || 'alive').toUpperCase()} MODE ACTIVE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FACE LOCK & IDENTITY SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Full biometric description: bone structure, exact skin tone code, eye shape/color, lip volume, nose bridge, ear position, jaw angle. Face must be IDENTICAL across all frames. Any drift = reject render.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKIN REALISM LAYER (mandatory)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Pore depth setting, subsurface scattering intensity, T-zone oil distribution, under-eye shadow depth, peach fuzz visibility in side light, natural asymmetric imperfections, skin response to lighting — how it catches, absorbs, reflects. NO beauty filter. NO smoothing. Specify exact texture parameters.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT LOCK SYSTEM (if product exists)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Product must stay visually consistent every frame it appears. Label readable. Texture accurate. Light interaction physically correct. Grip natural not posed. Product placement timing: exact second it enters frame, how it's held, label angle to camera.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HUMAN BEHAVIOR SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Specify 5 specific involuntary human behaviors: nostril flare before speaking, micro shoulder raise during surprise, tongue tip touching upper lip during thought, chin tuck when making a point, eyebrow asymmetry during emotion. These make the character feel alive not generated.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EMOTIONAL ARC SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Map the exact emotion at each 2-second interval. Emotion must transition naturally — not jump cut. Include: starting emotion, trigger moment, emotional peak, resolution. Specify which facial muscles activate for each emotion.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[0s - 3s] HOOK MOMENT — \${niche} specific
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[World state: exact environment details. Character position. What they're in the middle of doing — NOT posed for camera. Biological realism: blink at exactly [Xs], micro head drift [direction] [mm]. Voiceover: unique opening line — NOT "okay" NOT "so" NOT "let me show you". Specific to the niche, unexpected angle.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[3s - 6s] ESCALATION MOMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Action sequence with exact timing. Product introduced if applicable. Skin interaction if beauty. Real hand movement — finger placement, grip, pressure applied. Voiceover continues — conversational not scripted sounding. Reaction: what does their face do in response to the product/moment?]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[6s - 9s] TRANSFORMATION OR PAYOFF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[The emotional peak. What changes — physically or emotionally. Camera pushes in or pulls back — specify exactly. Skin under new lighting. Character's genuine reaction — specify muscle movements. Voiceover: the most compelling sentence of the entire video.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[9s - 10s] CUT-OFF MOMENT (mid-action)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Video cuts mid-natural movement — not at a pause. Creates scroll-back instinct. Last word of voiceover is NOT the last thing heard — ambient sound continues briefly.]

BLINK SCHEDULE:
[8 exact timestamps: [0.4s] slow deliberate blink — [1.8s] asymmetric blink right eye leads — [3.1s] double micro-blink surprise response — etc. Each blink type named and timed.]

NERVOUS SYSTEM BEHAVIOR:
[Micro head drift: [X]mm [direction] every [Y] seconds. Breath cycle: inhale visible at shoulders [Xs], hold [Xs], exhale [Xs]. Posture micro-shift: [specific description]. Hand stillness broken by [specific micro movement]. Eye dart pattern: [specific gaze path with timestamps].]

CAMERA BEHAVIOR:
[Device: iPhone [model] handheld. Stabilization: NONE — natural hand micro-tremor present. Autofocus: hunting visible on [specific moment]. Exposure breathing: adjusts when character moves toward [light source]. Rolling shutter: visible on fast pan at [Xs]. Framing: starts [composition], drifts to [composition] by end.]

VOICEOVER SCRIPT (full, timestamped, unique):
[Every line timestamped. Opening word is NOT "okay" "so" "hey" or "guys". Voiceover sounds like a real person mid-thought — not a script. Include: breath sounds, natural pauses marked as [beat], filler sounds where authentic, trailing off at end.]

REACTION DIRECTION:
[Specify 3 genuine micro-reactions the character has during the video. Example: tiny exhale of relief when product absorbs. Involuntary smile at result. Self-conscious touch of hair after checking mirror. These are NOT scripted — they happen naturally.]

REALISM KILLERS (10 hard NOs):
[10 specific things that would break biological realism for this exact scenario]

UGC KILLERS (5 hard NOs):
[5 things that would make this look like a studio ad not real UGC]

IDENTITY KILLERS (5 hard NOs):
[5 things that would cause face drift between frames]`;

    const b4 = `Write two complete master production prompts for:\n${ctxLines}\n\n===KLING MASTER PROMPT===\nComplete Kling 1.6 prompt. Include: SUBJECT full character, ACTION sequence with timing, WORLD STATE, CAMERA angle and movement, LIGHTING full setup, ENVIRONMENT with background life, EMOTION, SKIN TRUTH realism, NEGATIVE PROMPTS 10 items, TECHNICAL 4K 24fps 9:16.\n\n===RUNWAY MASTER PROMPT===\nComplete Runway Gen-4 prompt. Include: SCENE cinematic description, SUBJECT full character, MOTION and camera, COLOR GRADE full description, MOOD, LIGHTING, CAMERA behavior, NEGATIVE 8 items, FORMAT 9:16.`;

    const SKIN_ENGINE = `SKIN REALISM ENGINE: Biologically accurate human skin with visible fine pores, realistic epidermal texture, subtle tonal variation, natural oil distribution, and soft subsurface scattering. Skin must retain texture integrity even during close-up shots. Fine peach fuzz visible in side lighting. Realistic under-eye depth, natural creasing around mouth and eyes, asymmetrical pore distribution, slight redness variations around nose and cheeks, tiny imperfections and micro texture inconsistencies. Skin reflections are uneven and physically grounded, never glossy or plastic. NO beauty filter, NO smoothing, NO airbrushed diffusion, NO waxy CGI texture, NO influencer makeup skin, NO over-retouched perfection. Lighting must interact naturally with skin surface, revealing pores, micro shadows, and texture transitions. Macro facial realism preserved at all zoom levels.`;

    const b5_mj = `You are an elite AI image director. Write ONE complete Midjourney v6.1 prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nWrite a single flowing paragraph — full character description, what the character is DOING (action), scene environment, lighting direction, mood, camera lens and angle, aesthetic, skin realism requirements. Minimum 250 words. End with:\n--ar 9:16 --v 6.1 --style raw --q 2 --s 750`;

    const b5_flux = `You are an elite AI image director. Write ONE complete Flux Dev prompt only.\n\n${ctxLines}\n\n${SKIN_ENGINE}\n\nWrite a complete commercial photography prompt. Full subject with action, scene, lighting with specific sources, mood, camera, composition, skin realism. Minimum 250 words. End with:\n--ar 9:16 --steps 30 --guidance 3.5`;

    const b5_nano = `You are an elite AI image director specialising in Nano Banana 2 — a STATIC IMAGE generation tool (NOT video). Write ONE complete Nano Banana 2 IMAGE prompt.

\${ctxLines}

\${SKIN_ENGINE}

Nano Banana 2 excels at: hyper-realistic portrait photography, skin texture detail, natural lighting, editorial beauty shots, candid lifestyle moments.

Write a complete STILL IMAGE prompt (not a video prompt — no motion, no scenes, no seconds):

Start with the EXACT ACTION the subject is caught doing — mid-gesture, not posed.
SUBJECT: [complete physical description head to waist — skin tone, bone structure, hair, expression]
SKIN REALISM: [pore visibility, subsurface scattering, natural texture, oil distribution, under-eye depth — apply full skin engine]
HAIR: [individual strand visibility, natural flyaways, movement caught mid-frame, realistic root behavior]
HANDS: [if visible — natural finger position, skin knuckle texture, natural nail appearance]
ENVIRONMENT: [specific location detail, background depth, environmental objects that confirm authenticity]
LIGHTING: [exact light source — window position, quality (hard/soft/diffused), color temperature, shadows on skin, catch light in eyes]
LENS: [focal length, aperture, depth of field — what is sharp vs soft]
COMPOSITION: [framing — where subject sits in frame, what's in foreground/background]
MOOD: [single word + expanded emotional quality]
CAMERA: [specific camera body + lens if applicable for realism]
NEGATIVE: [15 specific things to avoid — beauty filter, smoothing, plastic skin, posed look, studio lighting, perfect symmetry, AI glow, etc.]
TECHNICAL: --ar 9:16 --style raw --q 2

Minimum 300 words. Every word must reinforce biological accuracy and photographic realism.`;

    const [r1, r2, r3, r4, r_mj, r_flux, r_nano] = await Promise.all([
      ask(b1, 800),
      ask(b2, 1200),
      ask(b3, 1200),
      ask(b4, 3000),
      ask(b5_mj, 600),
      ask(b5_flux, 600),
      ask(b5_nano, 1000),
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
