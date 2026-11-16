import { useState } from 'react';
import { Card, Section } from './ui';

/** My Wispr Flow usage card (public/wispr-usage.png), or a frame waiting for it. */
export function BuiltByVoice() {
  const [missing, setMissing] = useState(false);
  return (
    <Section id="wispr" eyebrow="Built by voice" title="Made with Wispr, for Wispr.">
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <p className="max-w-[44ch] text-body text-fg-2">
          The specs, prompts and commits for this project were dictated through Wispr Flow. Pilot is
          what I wanted next: the same voice, for everything that isn’t typing.
        </p>
        <Card className={`overflow-hidden ${missing ? 'border-dashed bg-transparent' : ''}`}>
          {missing ? (
            <div className="grid aspect-[16/9] place-items-center p-6 text-center">
              <p className="text-small text-fg-3">My Wispr Flow usage card goes here.</p>
            </div>
          ) : (
            <img
              src="/wispr-usage.png"
              alt="My Wispr Flow insights: 97 words per minute (top 3%), 87,712 words dictated, 14,094 fixes made by Flow, 1,294 AI prompts, a 5 day streak"
              width={2240}
              height={1524}
              loading="lazy"
              onError={() => setMissing(true)}
              className="w-full"
            />
          )}
        </Card>
      </div>
    </Section>
  );
}
