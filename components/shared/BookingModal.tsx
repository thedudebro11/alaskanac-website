'use client';
import { useRef, useCallback } from 'react';
import styles from './BookingModal.module.css';

interface Props {
  location: 'Tucson' | 'Phoenix';
  label?: string;
  className?: string;
}

export function BookingModal({ location, label, className }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const widgetLoadedRef = useRef(false);

  // Temporarily replaces window.scrollTo with a no-op during widget init.
  // The booking widget calls scrollTo(0,0) on load, which scrolls the page to the top.
  // Wrapping init in this function prevents that without patching the widget itself.
  const suppressScrollDuringInit = useCallback((fn: () => void) => {
    const originalScrollTo = window.scrollTo.bind(window);
    (window as unknown as { scrollTo: unknown }).scrollTo = () => {};
    fn();
    setTimeout(() => {
      (window as unknown as { scrollTo: unknown }).scrollTo = originalScrollTo;
    }, 2000);
  }, []);

  const openModal = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    document.body.style.overflow = 'hidden';

    suppressScrollDuringInit(() => {
      dialog.showModal();

      if (!widgetLoadedRef.current) {
        // ⚠️ CLIENT INPUT NEEDED: Replace with actual booking widget init call.
        // ServiceTitan:    window.serviceTitanBooking?.init({ location });
        // Housecall Pro:   window.hcpBooking?.open({ market: location.toLowerCase() });
        // Script tag:
        //   const s = document.createElement('script');
        //   s.src = 'https://booking.widget.url/init.js';
        //   s.dataset.location = location;
        //   dialog.querySelector('.widget-container')?.appendChild(s);
        widgetLoadedRef.current = true;
      }
    });
  }, [location, suppressScrollDuringInit]);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
    document.body.style.overflow = '';
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) closeModal();
    },
    [closeModal]
  );

  return (
    <>
      <button
        onClick={openModal}
        className={className ?? 'btn-primary btn-primary--large'}
        type="button"
      >
        {label ?? `Schedule Now — ${location}`}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={handleBackdropClick}
        aria-label={`Schedule HVAC service in ${location}`}
      >
        <div className={styles.inner}>
          <button
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close booking form"
            type="button"
          >
            ✕
          </button>
          <h2 className={styles.title}>Schedule Service — {location}, AZ</h2>
          <div className={`widget-container ${styles.widgetContainer}`} />
        </div>
      </dialog>
    </>
  );
}
