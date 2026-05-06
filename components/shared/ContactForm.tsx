'use client';
import { useState } from 'react';
import styles from './ContactForm.module.css';

const SERVICE_OPTIONS = [
  'AC Maintenance / Alaskafication',
  'AC Installation or Replacement',
  'AC Repair',
  'Heating & Furnace Service',
  'Indoor Air Quality',
  'Emergency Service',
  'Other',
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get('name')) errs.name = 'Name is required';
    if (!data.get('phone')) errs.phone = 'Phone number is required';
    if (!data.get('service')) errs.service = 'Please select a service';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrors({ form: data.error || 'Something went wrong.' });
      }
    } catch {
      setStatus('error');
      setErrors({ form: 'Could not reach the server. Please call (844) 364-5800.' });
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="alert">
        <h3>Message received — thank you!</h3>
        <p>
          We'll call you back within 1 business hour during business hours. For emergencies,
          call <a href="tel:8443645800">(844) 364-5800</a> — we answer 24/7.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Honeypot — hidden from humans, filled by bots */}
      <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

      <div className={styles.field}>
        <label htmlFor="name">Your Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span id="name-error" className={styles.error} role="alert">{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Phone Number *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 555-5555"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <span className={styles.error} role="alert">{errors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="service">Service Needed *</label>
        <select id="service" name="service" aria-invalid={!!errors.service}>
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.service && <span className={styles.error} role="alert">{errors.service}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="location">Your Location</label>
        <select id="location" name="location">
          <option value="Tucson">Tucson, AZ</option>
          <option value="Phoenix">Phoenix, AZ</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">
          Message <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us what's going on — the more detail, the better"
        />
      </div>

      {errors.form && (
        <p className={styles.error} role="alert">{errors.form}</p>
      )}

      <button type="submit" className="btn-primary btn-primary--large" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : "Send Message — We'll Call You Back"}
      </button>
    </form>
  );
}
