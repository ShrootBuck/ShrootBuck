"use client";

import { useEffect, useState } from "react";

import { FALLBACK_CONTACT_EMAIL, getContactEmail } from "~/lib/contact-email";

export function ContactEmail() {
  const [email, setEmail] = useState(FALLBACK_CONTACT_EMAIL);

  useEffect(() => {
    let active = true;

    void getContactEmail()
      .then((address) => {
        if (active) setEmail(address);
      })
      .catch(() => {
        // Preserve the working fallback if address generation fails.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <a href={`mailto:${email}`}>email</a>
    </>
  );
}
