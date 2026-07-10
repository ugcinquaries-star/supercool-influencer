import React from 'react';

export default function AcademyPage() {
  const beaconsLink = 'https://website.beacons.ai/esha.aiugc';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-red-950 to-black border-b-2 border-red-800 px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4 leading-tight">
            Build Your Realistic AI Influencer
          </h1>
          <p className="text-lg md:text-xl text-red-200 font-light mb-8">
            Create realistic AI human avatars, lifestyle scenes, reels, vlogs, beauty content, and brand-style content — even if you are starting from zero.
          </p>

          {/* Value List */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-base md:text-lg">
            <div className="text-red-300">✓ Realistic Human Avatars</div>
            <div className="text-red-300">✓ AI Reels & Vlogs</div>
            <div className="text-red-300">✓ Beauty + Lifestyle Scenes</div>
            <div className="text-red-300">✓ Faceless Creator Realism Studio™</div>
            <div className="text-red-300">✓ Step-by-Step Training</div>
          </div>

          {/* CTA Button */}
          <a
            href={beaconsLink}
            className="inline-block bg-red-900 hover:bg-red-800 text-white px-12 py-4 rounded-full font-semibold transition-all text-lg mb-4"
          >
            Unlock Instant Access
          </a>
          <div className="text-red-300 text-sm">Launch Price $197 · Regular Value $465</div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-gradient-to-br from-black to-red-950 px-4 py-20 border-b border-red-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-red-200">
            The Complete AI Influencer System™ Is Now Open
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            AI Influencer Academy™ gives you the step-by-step training, tools, prompts, and workflows to build a realistic AI influencer and turn simple ideas into content you can use for social media, portfolios, campaigns, and digital products.
          </p>
          <a
            href={beaconsLink}
            className="inline-block bg-red-900 hover:bg-red-800 text-white px-12 py-4 rounded-full font-semibold transition-all text-lg"
          >
            Get Instant Access
          </a>
        </div>
      </section>

      {/* Section 3: What You'll Learn */}
      <section className="bg-black px-4 py-20 border-b border-red-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-red-200 text-center">
            What You'll Learn Inside
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Build Your AI Influencer',
                desc: 'Create your avatar identity, headshot, full-body image, character bible, and reference package.'
              },
              {
                title: 'Create Realistic AI Photos',
                desc: 'Learn how to create lifestyle scenes, beauty content, product campaigns, and realistic visual stories.'
              },
              {
                title: 'Make AI Reels + Vlogs',
                desc: 'Turn simple ideas into storyboards, shot lists, video prompts, and social media content.'
              },
              {
                title: 'Use The Studio',
                desc: 'Use Faceless Creator Realism Studio™ to generate prompts, scenes, storyboards, video direction, and content plans.'
              },
              {
                title: 'Monetize Your Workflow',
                desc: 'Learn how to turn your AI creator skills into digital products, AI UGC services, affiliate content, and brand offers.'
              }
            ].map((card, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-900 to-red-950 border border-red-800 rounded-lg p-8 hover:border-red-600 transition-colors">
                <h3 className="text-xl font-semibold text-red-200 mb-4">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Included */}
      <section className="bg-gradient-to-br from-black to-red-950 px-4 py-20 border-b border-red-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-red-200 text-center">
            Included With Your Enrollment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              'AI Influencer Academy™ video lessons',
              'Faceless Creator Realism Studio™ access',
              'Prompt Vault',
              'Student workbooks',
              'Video creation workflow',
              'Content strategy system',
              'Business + monetization toolkit',
              'Portfolio and brand content guidance'
            ].map((item, i) => (
              <div key={i} className="text-red-300 pb-4 border-b border-red-900">
                • {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: For You If */}
      <section className="bg-black px-4 py-20 border-b border-red-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-red-200 text-center">
            This Is For You If…
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              'You want to create realistic AI human avatars',
              'You want to make AI reels, vlogs, and lifestyle content',
              'You want faceless content without being on camera',
              'You want beauty, UGC, product, and creator-style content',
              'You want a beginner-friendly step-by-step system',
              'You want to stop guessing prompts',
              'You want to turn your AI creator workflow into income'
            ].map((bullet, i) => (
              <div key={i} className="text-red-300 text-lg">
                ✓ {bullet}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Not Just a Pack */}
      <section className="bg-gradient-to-br from-black to-red-950 px-4 py-20 border-b border-red-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-red-200">
            This Is Not Just A Prompt Pack
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            This is a complete AI creator system. You are not just getting random prompts. You are learning how to build your avatar, lock the identity, create realistic scenes, plan content, direct videos, edit your workflow, and monetize your results.
          </p>
        </div>
      </section>

      {/* Section 7: Start Today */}
      <section className="bg-black px-4 py-20 border-b border-red-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-red-200">
            Start Today For $197
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get instant access to AI Influencer Academy™, Faceless Creator Realism Studio™, the Prompt Vault, student resources, and the monetization toolkit.
          </p>
          <a
            href={beaconsLink}
            className="inline-block bg-red-900 hover:bg-red-800 text-white px-12 py-4 rounded-full font-semibold transition-all text-lg"
          >
            Unlock Instant Access
          </a>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="bg-gradient-to-br from-black to-red-950 px-4 py-20 border-b border-red-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-red-200 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                q: 'Is this a waitlist?',
                a: 'No. The course is live now. You can unlock instant access today.'
              },
              {
                q: 'What happens after I buy?',
                a: 'You\'ll be taken through Beacon checkout and receive access to the course dashboard and resources.'
              },
              {
                q: 'Is this only a GPT?',
                a: 'No. This is a full course system with video lessons, workbooks, prompts, Studio access, video workflow, and monetization training.'
              },
              {
                q: 'Can beginners join?',
                a: 'Yes. The course is made for beginners and walks you through the process step by step.'
              },
              {
                q: 'What can I create?',
                a: 'You can create AI influencer headshots, full-body references, character sheets, lifestyle scenes, product campaigns, reels, vlogs, storyboards, prompts, and portfolio content.'
              },
              {
                q: 'Do I need to show my face?',
                a: 'No. This is designed for faceless creators who want to build AI influencer content.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-900 to-red-950 border-l-4 border-red-800 p-6 rounded">
                <h4 className="text-red-200 font-semibold mb-2">Q: {faq.q}</h4>
                <p className="text-gray-300">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-black via-red-950 to-black border-t-2 border-red-800 px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-red-200">
            Ready To Build Your AI Influencer?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Start today and get instant access to the complete creator system.
          </p>
          <a
            href={beaconsLink}
            className="inline-block bg-red-900 hover:bg-red-800 text-white px-12 py-4 rounded-full font-semibold transition-all text-lg"
          >
            Unlock Instant Access
          </a>
        </div>
      </section>
    </div>
  );
}
