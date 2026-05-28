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

    // ── SEEDANCE — FULL GOD MODE ──────────────────────────────────────────────
    const b3 = `You are an elite Seedance 2.0 cinematic UGC director operating at VELORA GOD MODE standard.

${REALISM_FRAMEWORK}

⚠️ TOPIC LOCK: Read the VIDEO TOPIC in the context below. Your ENTIRE brief — every scene, voiceover line, action, environment — must be about THAT specific topic. Not about beauty. Not about skincare unless that IS the topic. About exactly what the user typed.

CONTEXT:
${ctxLines}

REEL DURATION: ${DURATION} seconds
REALISM MODE: ${(realismMode || 'alive').toUpperCase()}

---

SEEDANCE 2.0 — ${DURATION}s VERTICAL 9:16
${(realismMode || 'alive').toUpperCase()} MODE + GOD MODE REALISM ACTIVE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EMOTIONAL CORE (PRE-PRODUCTION)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What the character feels internally:
What emotional transition occurs across ${DURATION}s:
Subconscious tension or contradiction:
What audience should subconsciously feel:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT THIS VIDEO IS ABOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2-3 sentences — exactly what happens in this video based on the VIDEO TOPIC. Specific. Not generic.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FACE LOCK & IDENTITY SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full biometric anchor — bone structure, exact skin tone hex, eye shape/color, lip volume, jaw angle, any asymmetric features. Every frame must match. Drift = reject. Include: visible pores, peach fuzz, under-eye depth, natural skin variations.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCENE BREAKDOWN — ${DURATION}s TOTAL
(Write every second. ${DURATION === '7' ? '3 scenes' : DURATION === '10' ? '4 scenes' : '5 scenes'})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOR EACH SCENE:
[Xs – Xs] SCENE NAME IN CAPS
SETTING: Exact environment — specific objects, lighting conditions, ambient life. Must match the VIDEO TOPIC scene.
CHARACTER ACTION: What they are physically doing — caught mid-action, not posing. Include: hesitation before, micro-resistance during, subconscious adjustment after.
VOICEOVER — EXACT WORDS: "every single word in quotes — mid-thought, never starting with okay/so/hey/guys"
INTERNAL MONOLOGUE: What they are thinking (fragmented, imperfect, subconscious) — e.g. "wait..." "why does this..." "ugh... okay"
FACIAL REACTION: Which specific muscles activate. How emotion builds over 0.3-0.6s. Asymmetric. Never perfectly timed.
BODY PHYSICS: Weight shift, fabric tension, hand grip, hair movement with 0.15s delay lag
BIOLOGICAL DETAIL: Blink at [X.Xs] type [asymmetric/double/slow], micro head drift [X]mm [direction], breath visible
CAMERA: How iPhone frames this naturally — handheld, autofocus hunt, exposure breath, framing imperfection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL VOICEOVER SCRIPT — TIMESTAMPED
(Every word. Every pause. Every breath.)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[0s] "—already mid-sentence when video starts about THIS topic"
[2s] [breath] "specific line about the actual topic"
[pause 0.4s]
[4s] "continues naturally—"
[8s] "—cuts off mid-thought"
NEVER: okay / so / hey / guys / let me show you

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKIN REALISM LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pore depth: [specific]. SSS intensity: [level]. T-zone oil: [zones + timing]. Under-eye depth: [mm]. Peach fuzz: [yes/no + visible angle]. 3 asymmetric imperfections: [list specifically]. Skin compression where clothing contacts. NO beauty filter. NO smoothing. NO waxy finish.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT/PROP PHYSICS (if applicable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[If product or prop exists in scene: weight feel, grip resistance, label angle toward camera, finger placement avoiding branding, entry timestamp, packaging resistance, what makes it feel found not staged]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HUMAN BEHAVIOR SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5 involuntary behaviors specific to THIS scene — NOT generic, must relate to the VIDEO TOPIC:
1. [before speaking — specific to this scene]
2. [distraction — glance off-camera with specific trigger]
3. [concentration — specific to what they are doing]
4. [reaction — specific emotional leak]
5. [habitual nervous tell — unique to this character in this moment]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MICRO-RESISTANCE MOMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3 tiny friction moments specific to THIS scene that create massive realism:
1. [fabric/object/environment resists slightly]
2. [grip adjustment or repositioning]
3. [interruption or inconvenience]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HAIR PHYSICS ENGINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Specific hair behavior for this scene: strand separation, 0.15s inertia delay after head movement, section-specific reactions (crown vs sides vs nape), flyaways responding to environment, NEVER moving as one object.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLINK SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Every blink with exact timestamp and type: asymmetric / double micro / slow deliberate / half-refocus / emotional blink]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NERVOUS SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Head drift: [Xmm] [direction] every [Ys]. Breath: inhale [Xs] / hold [Xs] / exhale [Xs]. Posture shift: [Xs] weight to [direction]. Eye dart path with timestamps. Shoulder breath every 2.5s visible through fabric.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAMERA — iPhone handheld
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No stabilization. Autofocus hunts at [specific transition]. Exposure breathes when [action]. Rolling shutter micro-warp during [movement]. Framing: [starts X drifts to Y — never corrected]. Lens compression: 26mm equivalent. Handheld micro-shake: 0.3-0.8mm irregular.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPERFECTION LAYER (UGC AD ENGINE STANDARD)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mandatory imperfections for THIS scene (pick 3-4):
[ ] slight cough or throat clear at [Xs]
[ ] blinking delay — blink happens 0.3s late
[ ] object/product slip or grip readjustment
[ ] adjusting hair mid-thought
[ ] looking off-camera suddenly
[ ] nervous laugh or breath
[ ] lighting shift as they move
[ ] unfinished sentence, restarts

FINAL CUT: Video ends mid-natural movement. NOT at a pause. Last ambient sound continues 0.3s after voiceover. Creates scroll-back instinct.

REALISM KILLERS for THIS specific scene — 10 hard NOs:
[10 things specific to THIS topic/scene that would instantly break the illusion]

UGC KILLERS — 5 hard NOs:
[5 things that would make this look studio-produced not real life]`;

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

    // ── NANO BANANA — GOD MODE ────────────────────────────────────────────────
    const b5_nano = `You are an elite AI image director specialising in Nano Banana 2 — STATIC IMAGE generation. Apply VELORA GOD MODE realism standards. This is NOT a video prompt.

${REALISM_FRAMEWORK}

${SKIN_ENGINE}

CONTEXT:
${ctxLines}

The image must capture the character in the exact moment from the VIDEO TOPIC — caught mid-action in that specific scene, biologically alive, psychologically believable.

Write ONE complete Nano Banana 2 IMAGE prompt minimum 350 words:

ACTION (open with this): The exact action the subject is caught doing in this video topic scene — mid-gesture, mid-thought, mid-interaction. NOT posed. NOT looking at camera performatively.

SUBJECT: Complete physical description head to waist — exact skin tone with hex reference, bone structure, eye shape with color and golden flecks, lip volume, jaw angle, any asymmetric features that make them human.

SKIN REALISM (dermatology-grade): Visible pore structure concentrated across T-zone, slightly enlarged pores either side of nose. Orange-peel texture across cheeks where foundation hasn't been applied. Natural subsurface scattering — translucent quality where light hits ear rim and cheek apex. Very fine vellus hair catching light along jawline and upper lip. Slight oil accumulation in nasolabial crease. Natural under-eye area with faint purple undertones and fine dehydration lines. A healing blemish or post-inflammatory hyperpigmentation mark. Freckles scattered unevenly from sun exposure. Skin compression where clothing contacts body. should pass 400% zoom test.

HAIR: Individual strand visibility with specific strand count groupings. Natural flyaways — specific strands crossing forehead or catching light. Root behavior with natural lift. Section-specific movement (crown vs sides vs nape reacts differently). 0.15s inertia lag captured as slight blur on leading strands. NEVER a solid mass.

HANDS (if visible): Natural relaxed finger position — slight curl, knuckle texture visible, tendons under skin, realistic nail appearance, skin compression at grip points.

ENVIRONMENT: Specific location detail matching the video topic exactly — named objects, depth, background life, environmental imperfections. Makes the scene socially believable.

LIGHTING: Exact source (e.g. "north-facing window at 10am, diffused through sheer curtain"), quality, color temperature, shadow fall on skin, catch light position in eyes, exposure breath visible in highlights.

LENS: 85mm portrait compression, f/1.8, DOF with eyes sharp and nose tip beginning to soften.

COMPOSITION: Subject placement in frame — rule of thirds, foreground interest, background depth.

MOOD: Single word + expanded emotional quality leaking through body language, not expression.

EMOTIONAL LEAKAGE: How the internal state shows — jaw tension, eye softness, shoulder posture, breathing visible in chest, not face.

MICRO-RESISTANCE: One tiny friction moment visible in the frame — fabric tension, grip imperfection, environmental interruption.

NEGATIVE: beauty filter, smoothing, plastic skin, posed look, studio lighting, perfect symmetry, AI glow, influencer expression, waxy hair, frozen idle state, emotionally empty, over-beautification, unnatural eye contact, generic background, perfect posture

TECHNICAL: --ar 9:16 --style raw --q 2`;

    // ── PARALLEL GENERATION ───────────────────────────────────────────────────
    const [r1, r2, r3, r4, r_mj, r_flux, r_nano] = await Promise.all([
      ask(b1, 800),
      ask(b2, 2500),
      ask(b3, 2000),
      ask(b4, 2500),
      ask(b5_mj, 800),
      ask(b5_flux, 800),
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
