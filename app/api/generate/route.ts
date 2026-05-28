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
    return JSON.parse(cleaned.substring(start, end + 1));
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
  return nextMarker === -1 ? section.trim() : section.slice(0, nextMarker).trim();
}

// ── MASTER REALISM FRAMEWORK ─────────────────────────────────────────────────
const REALISM_FRAMEWORK = `
=== MOTION STUDIO GOD MODE — ACTIVE ===
You are simultaneously: elite Hollywood director, behavioral realism specialist, luxury campaign creative director, cinematographer, motion realism engineer, sensory storytelling expert, emotional psychology strategist, GTA-style environmental realism designer, human observation specialist.

PRE-PRODUCTION BRIEF (build this before generating):
STEP 1 — EMOTIONAL CORE: What does the character feel? What emotional transition occurs? What subconscious tension exists? What contradiction? What should the audience subconsciously feel?
STEP 2 — HUMAN BEHAVIOR: realistic eye behavior, blink timing, hesitation patterns, subconscious gestures, posture shifts, breathing realism, facial asymmetry, nervous system behavior, attention shifts, involuntary reactions. Movement must NEVER be robotic, symmetrical, perfectly timed.
STEP 3 — MOTION ENGINEERING: body weight physics, hair lag physics (0.15s inertia delay), delayed secondary motion, camera inertia, breathing movement, fabric movement. Hair settles after movement, separates into strand groups, reacts differently by section. NEVER moves as one object.
STEP 4 — CAMERA PSYCHOLOGY: Why does the camera exist? Who holds it? Lens compression, framing imperfections, autofocus behavior, handheld realism, exposure breathing. Camera must NEVER feel perfectly composed or mechanically smooth. Audience must feel: "someone accidentally captured a real moment."
STEP 5 — ENVIRONMENTAL REALISM: ambient movement, sound logic, lighting interaction, object placement, environmental imperfections. Environment must feel lived-in, reactive, imperfect, socially real.
STEP 6 — LIGHTING PSYCHOLOGY: emotional temperature, practical light sources, shadow realism, skin interaction, color contrast, exposure shifts. AVOID beauty lighting, studio perfection, glam diffusion.
STEP 7 — SOCIAL BELIEVABILITY: Would this moment actually happen in real life? Would social media viewers subconsciously believe this is real?

=== UGC AD ENGINE 2026 — ACTIVE ===
Senior UGC ad strategist + performance marketer standard. MANDATORY:
- HOOKS: Stop scroll in 0-3 seconds. Feel native, not like an ad. Use curiosity, tension, or problem framing. NEVER generic.
- SCRIPT FLOW: Hook (0-3s) → Problem (relatable + specific) → Discovery → Experience/Demo → Imperfection Layer (MANDATORY: include 2-4 of: slight cough, blinking delay, product slip, adjusting hair, looking off-camera, nervous laugh, lighting inconsistency) → Result (realistic, NOT exaggerated) → CTA (platform-safe)
- STORYBOARD: Camera type, movement (handheld micro-shake), lighting (natural window preferred), duration, action
- SAFETY: No medical claims, no "cure/guarantee/instant results"

=== AI UGC OPERATOR — PRODUCT REALISM ===
PRODUCT IDENTITY LOCK: fixed geometry, consistent label placement, no logo warping, stable orientation
MOTION ENGINEERING: no robotic movement, pre-movement hesitation, imperfect paths, weight and delayed motion
SKIN REALISM: visible pores, peach fuzz, uneven tone, no plastic skin, natural absorption behavior
CAMERA REALISM (iPhone): handheld micro-shake, autofocus shifts, exposure breathing, imperfect framing
ENVIRONMENT REALISM: real clutter, mixed lighting, non-staged composition

=== UGC SKINCARE REALISM SYSTEM ===
PRODUCT INTERACTION ENGINE: avatar stabilizes product naturally, rotates packaging carefully toward camera, avoids covering branding with fingers, rebalances grip subconsciously, supports heavier items with palm tension, shifts fingers dynamically, maintains elegant feminine hand posture.
LABEL READING BEHAVIOR: eyes must track text naturally, head tilts slightly, lips part subtly, fingers stabilize container, gaze moves line-by-line.
LOTION/PRODUCT APPLICATION: spreading unevenly first, palms warming product, visible pressure drag, subtle skin shine transition, natural elbow bending, shoulder stabilization. Product does NOT disappear immediately — leaves temporary sheen, catches light, creates drag trails.
HAIR PHYSICS: delayed secondary motion, dynamic strand separation, realistic root lift, natural flyaways, gravity-responsive movement, slight frizz diffusion, pressure flattening where touched. NEVER moves as one mass.
HUMAN PRESENCE ENGINE: NEVER generate robotic movement. Every action = cause → thought → reaction → adjustment → consequence loop. Include: motion hesitation, reaction delays, interrupted gestures, overlapping actions, unfinished movements, accidental pauses, thinking during action.
MICRO-RESISTANCE SYSTEM: fabric catches slightly, bottle cap slips, sponge grip readjustment, sleeve slides down, hair interrupts visibility. Tiny resistance creates massive realism.
EMOTIONAL LEAKAGE: jaw tension, eye softness, mouth compression, shoulder posture, breathing rhythm. Emotion should rarely be fully intentional.
ANTI-AI DETECTION: IMMEDIATELY AVOID: symmetrical movement, perfectly smooth pacing, frozen idle states, constant smiling, uninterrupted eye contact, optimized body mechanics, emotionally flat delivery, repetitive gestures, perfect posture, physics-free motion.

FINAL DIRECTIVE: The viewer should NOT feel "AI generated." The viewer should feel "I accidentally witnessed a real human moment."
`;

// ── SKIN ENGINE ───────────────────────────────────────────────────────────────
const SKIN_ENGINE = `
DERMATOLOGY-GRADE SKIN REALISM ENGINE:
Biologically accurate human skin with visible fine pores (asymmetric distribution), realistic epidermal texture, subtle tonal variation, natural oil distribution, soft subsurface scattering. T-zone (forehead/nose) has visible sebum sheen — anisotropic highlights. Cheeks flush pink (vasodilation). Fine peach fuzz visible in side lighting. Realistic under-eye depth with faint purple undertones and fine dehydration lines. Natural creasing around mouth and eyes. Slight redness variations around nose and cheeks. Micro texture inconsistencies. A healing blemish or post-inflammatory hyperpigmentation mark — human authenticity. Skin reflections uneven and physically grounded, NEVER glossy or plastic. Subsurface scattering creates translucent quality where sunlight hits ear rim and cheek apex. Compression where shoulder strap sits. NO beauty filter. NO smoothing. NO airbrushed diffusion. NO waxy CGI texture. NO influencer makeup skin. Lighting must interact naturally with skin surface, revealing pores, micro shadows, texture transitions. Macro facial realism preserved at all zoom levels. Pore structure concentrated across T-zone with slightly enlarged pores either side of nose.
`;

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

    // ── BRIEF + CALENDAR ──────────────────────────────────────────────────────
    const b1 = `You are an elite AI UGC creative director. Generate a production brief STRICTLY based on the VIDEO TOPIC provided.

CRITICAL: Read the VIDEO TOPIC first. Every title, concept, hook, and calendar day must be about THAT specific topic only. NEVER default to generic beauty content.

CONTEXT:
${ctxLines}

Rules:
- title must reflect the exact VIDEO TOPIC word for word
- concept built around the exact scene described
- hook stops scroll for THIS specific topic only
- calendar has 7 different angles on THIS specific topic
- ALL string values under 80 chars, no line breaks inside strings

Respond with ONLY valid JSON, no markdown:
{"brief":{"title":"specific title matching the video topic exactly","concept":"concept built around the exact scene described","emotional_arc":"emotional journey specific to this topic","hook":"scroll-stopping hook for this exact topic"},"calendar":[{"day":1,"concept":"angle on the specific topic","hook":"hook","format":"format","goal":"goal"},{"day":2,"concept":"different angle on same topic","hook":"hook","format":"format","goal":"goal"},{"day":3,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":4,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":5,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":6,"concept":"concept","hook":"hook","format":"format","goal":"goal"},{"day":7,"concept":"concept","hook":"hook","format":"format","goal":"goal"}]}`;

    // ── BRAND BOT ─────────────────────────────────────────────────────────────
    const b2 = `You are a viral content strategist and platform algorithm expert in 2026.

CONTEXT:
${ctxLines}

CRITICAL RULES:
1. Read the VIDEO TOPIC first. Every hook, caption, keyword must be about THAT specific topic
2. ZERO placeholders like [niche], [specific niche context], [time/money/effort] — replace ALL with specific content from the topic
3. ZERO generic captions. Every line topic-specific and audience-specific
4. Captions 5-7 sentences minimum. Written like a REAL creator, conversational chaos energy
5. ZERO basic hooks. No "POV:" no "This changed my life". Specific unexpected angles
6. Keywords = exactly what people type in search for THIS topic. Long-tail, specific
7. Hashtags: 2 mega (1M+), 3 mid (100K-500K), 3 micro (10K-50K niche)
8. Every output must be ready to copy-paste and post right now

Respond with ONLY valid compact JSON. Use | for paragraph breaks. No actual newlines inside JSON strings:
{"research_insight":"specific viral trend happening NOW for this exact topic","competitor_gap":"what creators are NOT doing in this specific niche","viral_angle":"specific angle for this video with highest viral chance","tiktok":{"hooks":["hook 1 ultra specific to the video topic","hook 2 unexpected angle","hook 3 urgency","hook 4 controversial take","hook 5 question that demands answer"],"caption":"sentence 1 opens mid-thought about specific topic | sentence 2 specific detail | sentence 3 daily pain about this | sentence 4 value with keyword woven in | sentence 5 FOMO specific to this topic | sentence 6 earned CTA","keywords":["long tail keyword 1","specific search phrase 2","question people type","how to phrase","best for phrase","vs comparison","review phrase","specific result","niche specific","trending topic","problem phrase","beginner search","creator specific","platform native","2026 trend"],"hashtags":["#mega1","#mega2","#mid1","#mid2","#mid3","#micro1","#micro2","#micro3"],"first_comment":"pinnable tip about this topic with 3-4 keywords natural"},"instagram":{"hooks":["hook 1","hook 2","hook 3","hot take 4","aspirational 5"],"caption":"stops double-tap | specific detail with real emotion | pain audience was afraid to say | value with keywords | relatable moment | CTA tied to this content | reason to save right now","keywords":["ig search 1","reels discovery 2","explore term 3","niche long tail 4","save-worthy 5","creator term 6","ai content 7","product category 8","tutorial search 9","lifestyle niche 10","trend specific 11","audience pain 12","transformation 13","comparison 14","viral topic 15"],"hashtags":["#mega1","#mega2","#mid1","#mid2","#mid3","#micro1","#micro2","#micro3"],"first_comment":"drives saves with specific tip and 3 keywords natural"},"youtube":{"hooks":["retention hook 1","hook 2","hook 3","hook 4","thumbnail click 5"],"caption":"primary keyword exactly what video delivers | secondary keywords natural | CTA | SEO-rich context","keywords":["youtube search 1","how to 2","tutorial 3","review 4","niche 5","beginner 6","advanced 7","2026 8","comparison 9","best for 10","vs 11","result 12","ai creator 13","channel niche 14","discovery 15"],"hashtags":["#ytshorts","#shortsviews","#mid1","#mid2","#mid3","#micro1","#micro2","#micro3"],"first_comment":"drives watch time with question and specific value"},"voiceover":{"accent":"specific accent pace energy for this topic","script":"[0s] exact opening word [2s] specific line [5s] value delivery [8s] retention hook [10s] CTA"}}`;

    // ── SEEDANCE — DINA BEAUTY STRUCTURE + GOD MODE ──────────────────────────
    const b3 = `You are an elite Seedance 2.0 cinematic UGC director operating at VELORA GOD MODE standard.

${REALISM_FRAMEWORK}

⚠️ TOPIC LOCK: Read the VIDEO TOPIC in the context below. Your ENTIRE brief — every scene, voiceover line, action, environment detail — must be about THAT specific topic. Not generic beauty. About exactly what the user typed. Lock to the topic before writing one word.

CONTEXT:
${ctxLines}

REEL DURATION: ${DURATION} seconds
REALISM MODE: ${(realismMode || 'alive').toUpperCase()}

Output the complete Seedance brief now using the EXACT structure below. Every section is mandatory. No shortcuts. This is a production document.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Seedance v2 — ${DURATION} second vertical 9:16 UGC
${(realismMode || 'alive').toUpperCase()} MODE ACTIVE — REAL LIFE SIMULATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FACE LOCK:
[Character name] — [ethnicity], [age], [skin tone hex + description], [body type], [hair style + color + specific details: flyaways, baby hairs, texture], [lashes], [nails: shape + color + finish], [outfit exact description], [scene location]
IDENTITY MUST NOT DRIFT ACROSS ANY FRAME.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRE-PRODUCTION EMOTIONAL CORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What she feels internally this exact moment:
Emotional transition across ${DURATION}s:
Subconscious tension or contradiction:
What audience should feel subconsciously:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT THIS VIDEO IS ABOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2-3 sentences — exactly what happens in this video based on the VIDEO TOPIC. Specific story. Not generic description.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCENE BREAKDOWN — ${DURATION}s TOTAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Write every scene with exact timestamps. ${parseInt(DURATION) <= 7 ? '3 scenes' : parseInt(DURATION) <= 10 ? '4 scenes' : '5 scenes'}.

FOR EACH SCENE — follow this exact format:

[Xs – Xs] SCENE NAME IN CAPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETTING:
[Exact environment — every prop named, lighting direction, ambient life. Specific to the VIDEO TOPIC scene. Products or props: exact position, label angle, what rests beside what.]

CHARACTER POSITION + ACTION:
[Exact body position — head tilt degrees, elbow placement, weight distribution. What she is physically doing — NOT posing. Caught mid-action. Include: what she was doing before this moment started. One flyaway position. Exact hand state.]

BIOLOGICAL REALISM — FACE:
- blink at [X.Xs] — [type: single asymmetric / double micro / slow deliberate]
- micro head drift — [Xmm] [direction], continuous
- lip press [X.Xs] before speaking — [duration]s delay
- [specific facial muscle] engagement at [Xs]
- under-eye natural depth visible
- visible pores at [specific zones]
- [skin condition specific to scene environment: T-zone shine / steam flush / golden light on cheekbones]
- natural peach fuzz on [specific area] in [lighting type]

SPOKEN WORDS — [accent] VOICE:
[Character] says mid-sentence, already talking:
"—[opening mid-thought, never starts clean]"
[action note: what she does while speaking]
"[line 2]"
[pause note: listening / reacting / micro-action]
"[line 3]"
[action note: what hands/eyes/body do]
"[line 4 — cuts off or trails naturally]"

INTERNAL MONOLOGUE (fragmented, subconscious):
"[wait...] [why does this...] [ugh... okay] [that actually—]"
[thoughts influence motion — describe how]

BODY PHYSICS:
- weight shift at [Xs]: [direction + body part]
- fabric tension: [where clothing pulls or releases]
- hand grip: [object + pressure + finger repositioning]
- hair: [specific section movement + 0.15s inertia delay + flyaway behavior]
- secondary motion: [what moves after the main action by 0.15s]

PRODUCT/PROP PHYSICS (if applicable):
- [product name]: held in [hand], [angle]° max, label facing camera
- grip: [finger placement — avoiding branding where]
- [specific friction or resistance moment]
- [what makes it feel found not staged]

MICRO-RESISTANCE MOMENTS:
1. [specific friction in this scene]
2. [grip adjustment or repositioning]
3. [environmental interruption or inconvenience]

CAMERA:
[iPhone framing — starts at X, drifts to Y, never corrected]. Autofocus hunts at [specific moment]. Exposure breathes when [action]. Rolling shutter micro-warp during [movement]. Handheld micro-shake: 0.3-0.8mm irregular throughout.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Continue with all scenes in same format]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL VOICEOVER SCRIPT — ATL/[character accent] ACCENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Write complete timestamped script — every word, every pause, every breath marker]
[0s] "—[already mid-sentence, topic-specific]"
[Xs] [breath / pause / action note] "[line]"
[Xs] "[line — trailing off or interrupted]"
NEVER: okay / so / hey guys / let me show you / alright so

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKIN REALISM ENFORCEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pore depth: [setting specific to scene]. SSS intensity: [level]. T-zone oil timing: [which zones + when in scene]. Under-eye depth: [natural color + lines]. Peach fuzz: visible at [angle + lighting]. 
3 asymmetric imperfections specific to this character: [list]. 
Skin compression: [where clothing contacts body]. 
NO beauty filter. NO smoothing. NO waxy finish. LIVING SKIN ONLY.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HAIR PHYSICS ENGINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Hair style] physics for this scene:
- 0.15s inertia delay on all head movements
- Section behavior: crown [reaction], sides [reaction], nape [reaction]
- Flyaway behavior: [specific strands, which direction, what triggers movement]
- Baby hair behavior: [specific hairline zones, what light catches them]
- NEVER moves as one object. Micro-layer separation mandatory.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLINK SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[List every blink across full ${DURATION}s with exact timestamp and type]
[X.Xs] — [type + description: "single blink, left eye closes 0.08s faster than right"]
[X.Xs] — [type]
[X.Xs] — [type]
[X.Xs] — [type]
[X.Xs] — [type]
[X.Xs] — [type]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NERVOUS SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Head drift: [Xmm] [direction] every [Ys] — continuous, never static.
Breath: inhale [Xs] / hold [Xs] / exhale [Xs] — shoulder rise visible at [timestamps].
Posture shift: [Xs] weight moves to [direction], [body part] adjusts.
Eye dart path: [timestamp] off-camera [direction] → [timestamp] refocus [where].
Lip press: [Xs] before each spoken line — [duration] delay.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPERFECTION LAYER — MANDATORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Select 3-4 from UGC AD ENGINE standard and specify exact timestamp:
- slight cough / throat clear at [Xs]
- blinking delay — blink 0.3s late at [Xs]
- [object/product] slip or grip readjust at [Xs]
- adjusting [hair/clothing] mid-thought at [Xs]
- looking off-camera suddenly at [Xs] — triggered by [what]
- nervous exhale or breath at [Xs]
- lighting shift as [movement] at [Xs]
- unfinished sentence — restarts at [Xs]

FINAL CUT: Video ends mid-natural movement — NOT at a pause. Last ambient sound continues 0.3s after voiceover ends. Creates scroll-back instinct.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REALISM ENFORCEMENT STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REALISM KILLERS — 10 hard NOs specific to THIS scene:
[10 things that would instantly break the illusion for this exact topic/scene]

UGC KILLERS — 5 hard NOs:
[5 things that would make this look studio-produced not real life]

IDENTITY KILLERS — 5 hard NOs:
[5 things that would break face/character consistency across frames]`;

    // ── KLING + RUNWAY ────────────────────────────────────────────────────────
    const b4 = `You are an elite AI video director. Write two complete master production prompts applying FULL GOD MODE realism standards.

${REALISM_FRAMEWORK}

${SKIN_ENGINE}

CONTEXT:
${ctxLines}

Every prompt must depict the character in the exact scene from the VIDEO TOPIC. Apply all realism systems: motion engineering, human behavior, camera psychology, environmental realism, anti-AI detection rules.

===KLING MASTER PROMPT===
Complete Kling 1.6 production prompt. Include:
SUBJECT: Full character biometric description with skin realism
ACTION SEQUENCE: Timestamped action specific to the video topic — caught mid-action, not posed. Include hesitation, micro-resistance, subconscious adjustments.
WORLD STATE: Environmental detail — ambient life, lived-in imperfections
BODY PHYSICS: Weight shift, hair lag physics, fabric tension, secondary motion
CAMERA: iPhone handheld — micro-shake, autofocus hunt, exposure breathing, imperfect framing. NEVER smooth or stabilized.
LIGHTING: Practical sources, shadow realism, skin interaction, exposure shifts
EMOTION: Specific emotional state with leakage behavior
SKIN TRUTH: Apply full dermatology-grade skin realism engine
IMPERFECTION LAYER: 3 mandatory behavioral imperfections for this specific scene
NEGATIVE PROMPTS: 10 items (include: smooth skin, beauty filter, symmetrical movement, robot motion, studio lighting, perfect posture, waxy hair, plastic texture, influencer expression, overly cinematic)
TECHNICAL: 4K 24fps 9:16

===RUNWAY MASTER PROMPT===
Complete Runway Gen-4 cinematic prompt applying GOD MODE realism. Include:
SCENE: Cinematic description of the exact video topic moment — emotionally observed, psychologically grounded
SUBJECT: Full character with biological skin detail
MOTION: Human timing with inertia, hesitation, delayed secondary motion — camera inertia, exposure breathing
COLOR GRADE: Full emotional color description — temperature, contrast, skin interaction
MOOD: Specific emotional quality of this exact moment
LIGHTING: Observed and practical — NOT beauty or studio
CAMERA BEHAVIOR: Handheld imperfection, autofocus, rolling shutter
NEGATIVE: 8 items
FORMAT: 9:16`;

    // ── MIDJOURNEY — GOD MODE ─────────────────────────────────────────────────
    const b5_mj = `You are an elite AI image director applying VELORA GOD MODE realism standards.

${REALISM_FRAMEWORK}

${SKIN_ENGINE}

CONTEXT:
${ctxLines}

The image must depict the character caught mid-action in the exact scene described by the VIDEO TOPIC. Apply the complete PRE-PRODUCTION BRIEF before writing a single word of the prompt.

Write ONE complete Midjourney v6.1 prompt as a single flowing paragraph minimum 300 words:

Open with the EXACT ACTION the character is caught doing in this topic's scene (not posed — caught mid-moment). Full biometric character description with skin realism. The specific environment matching the video topic — lived-in, imperfect, socially real. Lighting: practical and observed, NOT beauty or studio. Emotional state leaking through body language, jaw tension, eye softness, shoulder posture. Hair physics: individual strands, flyaways, natural movement. Hands: realistic grip, tendon visibility, natural finger position. Apply full dermatology-grade skin realism. Camera: iPhone lens compression, slight handheld angle imperfection, 26mm equivalent, shallow DOF. Micro-resistance visible: fabric tension, grip imperfection, environmental interaction.

End with:
--ar 9:16 --v 6.1 --style raw --q 2 --s 750`;

    // ── FLUX — GOD MODE ───────────────────────────────────────────────────────
    const b5_flux = `You are an elite AI image director applying VELORA GOD MODE realism standards.

${REALISM_FRAMEWORK}

${SKIN_ENGINE}

CONTEXT:
${ctxLines}

The image must depict the character in the exact scene described by the VIDEO TOPIC — caught mid-action, not posed.

Write ONE complete Flux Dev commercial photography prompt minimum 300 words:

Open with the EXACT ACTION caught mid-moment in this scene. Full subject description with biological skin detail. Specific environment matching the video topic — clutter, mixed lighting, non-staged. Lighting: exact source (window angle, lamp position), quality (hard/soft/diffused), color temperature, shadows on skin, catch light in eyes. Hair: individual strand visibility, natural flyaways, root behavior. Hands: natural position, knuckle texture, realistic nail appearance. Apply full skin realism engine. Camera: iPhone 4K realism, slight framing imperfection, autofocus behavior visible. Include micro-resistance: fabric catches, grip adjustment, environmental friction.

End with:
--ar 9:16 --steps 30 --guidance 3.5`;

    // ── NANO BANANA — DINA BEAUTY STRUCTURE + GOD MODE ───────────────────────
    const b5_nano = `You are an elite AI image director specialising in Nano Banana 2 — STATIC IMAGE generation only (NOT video). Apply VELORA GOD MODE realism standards.

${SKIN_ENGINE}

CONTEXT:
${ctxLines}

The image must capture the character in the exact moment from the VIDEO TOPIC — caught mid-action, biologically alive, psychologically believable. NOT posed. NOT performative.

Write ONE complete Nano Banana 2 IMAGE prompt using this EXACT structure:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# NANO BANANA 2 IMAGE PROMPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**EXACT ACTION:** [The precise moment caught in frame — mid-gesture, mid-thought, mid-interaction specific to the VIDEO TOPIC. NOT posed. Body position in full detail: what each hand is doing, head angle in degrees, weight distribution, what they were doing 0.5 seconds before this frame was captured.]

**CHARACTER:** [Ethnicity, age, skin tone with Fitzpatrick scale + hex, body type in detail — bone structure, facial structure specifics, lip volume, jaw angle, natural facial asymmetry, any distinctive features like dimples that appear during the emotional state of this scene. Eyes: iris color + pattern, limbal ring, visible micro-vessels in sclera. Lashes: type and volume. Body type detail visible through outfit. ALL physical specifics — nothing generic.]

**BODY TYPE:** [Full description — height impression, proportions, how clothing interacts with body, visible body language carrying the emotional state of the scene]

**HAIR:** [Style name + exact construction. Strand-level rendering required:
- Individual strands emerging from distinct follicle openings — NOT texture simulation
- Hair shaft optics: medulla dark core, cortex semi-translucent amber-warm in transmitted light, cuticle anisotropic highlight — narrow sharp line along strand axis (NOT broad gloss blob)
- Strand variation: diameter ±15%, unique curvature per strand, irregular spacing, strands crossing naturally
- Split ends: 3-5 strands per cluster showing frayed fiber tip
- Baby hairs: 15-30 per centimeter at temples and nape, 20-35 micron diameter, each catching rim light independently
- Flyaways: 8-15 individual strands escaped, each unique path, catching backlight as bright thin lines
- Color physics: root color → mid-length transition → end highlights with feathered blend over 40-60mm, backlit sections glow amber-warm
- NEVER a solid mass. NEVER texture overlay. Individual strand paths traceable.]

**EYES:** [Iris fiber structure with warm color variation, visible fine vessels in sclera (NOT pure white), tear film luminous crescent along lower waterline, natural asymmetry between eyes, blink state at moment of capture — partial, full, or post-blink with slight moisture residue on lash tips. Exact emotional state of the gaze for this scene.]

**SKIN:** [Apply full dermatology-grade skin realism:
- Fitzpatrick scale + exact hex + undertone description
- Pore structure: asymmetric distribution, concentrated T-zone, sizes 100-250 microns, slightly enlarged beside nose wings
- Sebum: T-zone anisotropic sheen, matte outer cheeks, natural oil variation
- SSS: blood flow visible in ear translucency and cheek warmth
- Vellus hair: peach fuzz visible on jaw and upper cheek in raking light
- Under-eye: natural depth, realistic micro-texture transitions, slight undertone (purple for deeper tones, blue-grey for lighter)
- Nasolabial folds: activating naturally for the emotional expression of this scene
- Specific imperfections: healing blemish OR post-inflammatory hyperpigmentation OR sun freckles — specific location named
- Skin compression: where fabric or surface contacts skin
- NO smoothing. NO beauty filter. NO makeup-ad perfection. LIVING SKIN.]
- MUST pass 400% zoom test

**NAILS:** [Shape, length, color, finish — gloss variation across nails (one slightly less glossy), realistic nail surface not mirror-perfect, any natural chips or wear appropriate to character]

**OUTFIT:** [Exact garment description — fabric type, color, cut, how it sits on this specific body, natural fabric wrinkles at bend points (elbow, waist), tension points where body shape affects drape, any accessories with exact description]

**ACTION DETAIL:** [Expand on the exact action — what the hands are doing in full detail, grip type if holding anything, tendon visibility, skin compression at grip points, finger positioning with natural slight irregularity]

**SCENE/ENVIRONMENT:** [Exact location matching the VIDEO TOPIC — named specific objects with placement, depth layers (foreground / midground / background), background life (blurred figures or objects at realistic depth), environmental imperfections that confirm authenticity, any product or prop with exact label placement and angle, what makes this space feel lived-in not staged]

**LIGHTING:** [Exact light source: type (window / lamp / outdoor / practical), direction (angle degrees), quality (hard / soft / diffused), color temperature in Kelvin, how shadows fall specifically on face and body, catch light position in both eyes (clock position), rim light behavior on hair, skin luminosity interaction, exposure breath visible in any blown-out highlights]

**CAMERA ANGLE:** [Exact lens: 85mm OR 100mm macro. Aperture: f/1.4-f/2.0. Depth of field description: what is razor sharp vs beginning to soften vs fully blurred. Frame composition: where subject sits in frame, rule of thirds application, any slight framing imperfection from handheld capture. Camera position: height relative to subject, angle in degrees.]

**NEGATIVE:** no beauty filter, no skin smoothing, no plastic skin texture, no symmetry perfection, no posed expression, no studio lighting unless specified, no waxy hair, no hair as solid mass, no AI beauty glow, no perfect posture, no emotionally empty expression, no unnatural eye contact, no generic background, no airbrushing, no retouching, no CGI quality, no influencer-staged composition, no perfect nail gloss, no black void anywhere

**TECHNICAL:** Extreme photorealistic, 8K resolution, RAW unretouched, full-frame camera render, CFG 5.0, Steps 38 --ar 9:16 --style raw --q 2`;

    // ── PARALLEL GENERATION ───────────────────────────────────────────────────
    const [r1, r2, r3, r4, r_mj, r_flux, r_nano] = await Promise.all([
      ask(b1, 800),
      ask(b2, 2500),
      ask(b3, 2500),
      ask(b4, 2500),
      ask(b5_mj, 900),
      ask(b5_flux, 900),
      ask(b5_nano, 1500),
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
