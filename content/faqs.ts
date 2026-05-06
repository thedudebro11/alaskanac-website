import type { FAQ } from '@/lib/types';

// CRITICAL: The `answer` text must be verbatim identical to what renders on-page.
// Both the FAQAccordion and the FAQPage JSON-LD schema are generated from this same source.
// Any drift between schema answer and visible answer causes Google to remove the rich result.

export const FAQS: FAQ[] = [
  {
    question: 'How often should I service my AC in Tucson?',
    answer:
      "Once a year, ideally in spring before temperatures climb above 100°F. Tucson's " +
      'extreme summer heat puts more stress on AC systems than almost anywhere in the ' +
      "country — a system that hasn't been serviced can fail precisely when you need it " +
      'most. If your system runs year-round, a fall check before the heating season is ' +
      'smart too. An annual Alaskafication covers both modes.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'What is an Alaskafication and what does it include?',
    answer:
      "An Alaskafication is Alaskan Air Conditioning's proprietary maintenance service — " +
      'our version of an AC tune-up, done the right way instead of the cheap way. ' +
      "Unlike a standard 20-minute checkup, an Alaskafication is a thorough inspection, " +
      "cleaning, and optimization of your entire system. When we're done, your AC is " +
      'ready for a Tucson summer — not just running, but running efficiently. ' +
      'Call (844) 364-5800 for details on everything included.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'What size AC unit do I need for my home in Tucson?',
    answer:
      "AC sizing is calculated based on your home's square footage, ceiling height, " +
      "insulation quality, window area, and sun exposure. In Tucson's climate, an " +
      'oversized unit short-cycles, never removes humidity properly, and breaks down ' +
      'sooner. Alaskan performs a proper load calculation (Manual J) before recommending ' +
      'a system size. Call (844) 364-5800 for a free quote.',
    relatedServiceSlug: 'ac-installation',
  },
  {
    question: 'Why is my air conditioner blowing warm air?',
    answer:
      'The most common causes are low refrigerant (possibly a leak), a dirty air filter ' +
      "blocking airflow, a failing compressor, or a thermostat set incorrectly (check " +
      "it's set to 'cool,' not 'fan only'). If your filter is clean and thermostat is " +
      'correct, call (844) 364-5800 — warm air usually means a refrigerant or mechanical ' +
      'issue that needs a technician.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'How long does an HVAC system last?',
    answer:
      'A well-maintained central air conditioner in Tucson typically lasts 12–15 years. ' +
      'Heat pumps are similar. Furnaces last 15–20 years. Systems in Tucson work harder ' +
      "than in most climates due to extreme summer heat. Regular Alaskafications extend " +
      "system life measurably — most of our longest-running customers' systems outlast " +
      'the average by 3–5 years.',
    relatedServiceSlug: 'heating-and-furnaces',
  },
  {
    question: 'Should I repair or replace my AC unit?',
    answer:
      'The general rule: if the repair cost exceeds 50% of what a new system would cost, ' +
      'or your system is over 12 years old, replacement is usually the smarter investment. ' +
      "A new Trane system also saves money on energy bills — today's units are " +
      'significantly more efficient than systems from 10+ years ago. Call (844) 364-5800 ' +
      "and we'll tell you honestly which makes more sense for your situation.",
    relatedServiceSlug: 'ac-installation',
  },
  {
    question: "What's the best thermostat setting for summer in Tucson?",
    answer:
      "The Department of Energy recommends 78°F when you're home and 85°F when you're " +
      'away. Every degree you raise the setpoint reduces cooling costs by about 3%. For ' +
      'Tucson summers, a programmable or smart thermostat pays for itself in one season. ' +
      'We install and configure smart thermostats as part of new system installations and ' +
      'Alaskafications.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'How much does AC installation cost in Tucson?',
    // ⚠️ CLIENT INPUT: Replace with actual price range OR keep the call-to-action version.
    // Update the JSON-LD schema in SEO_SPEC.md §1.5 to match if changed.
    answer:
      'The cost depends on system size, efficiency rating, equipment brand, and ' +
      'installation complexity. Alaskan provides free, no-obligation quotes with a full ' +
      'written breakdown before any work begins. Call (844) 364-5800 to schedule your ' +
      'free quote.',
    relatedServiceSlug: 'ac-installation',
  },
];
