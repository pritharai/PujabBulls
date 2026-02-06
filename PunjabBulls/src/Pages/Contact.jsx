import React, { useState, useEffect } from "react";
import axios from "axios";

/* =======================
   OFFICE LOCATIONS
======================= */
const LOCATIONS = [
  {
    city: "Ludhiana",
    address:
      "Sco-5, Sua Road Opposite Canara Bank, Tharike, Jhande, Ludhiana, Punjab 141008",
  },
  {
    city: "Delhi",
    address: "FE-30, Lower Ground Floor, Shivaji Enclave, New Delhi - 110027",
  },
  {
    city: "Delhi (Nehru Place)",
    address:
      "508, Eros Apartment, 5th Floor, Building No. 56, Nehru Place, New Delhi",
  },
  {
    city: "Chandigarh",
    address:
      "#841, Tricity Trade Tower, Patiala-Zirakpur Highway, Punjab 140603",
  },
  {
    city: "Mumbai",
    address: "Dreamax Height, Jijabai Road, Andheri East, Mumbai - 400093",
  },
  {
    city: "Noida",
    address:
      "Office No-2218, 22nd Floor, Ithum 73, Sector 73, Noida, Uttar Pradesh",
  },
];

export default function ContactUs() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  /* =======================
     TOAST AUTO DISMISS
  ======================= */
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  /* =======================
     SUBMIT HANDLER
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check (bots fill this)
    if (form.company) {
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${apiUrl}/api/contact`,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setToast({ type: "success", text: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =======================
         TOAST
      ======================= */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-full text-sm shadow-lg ${
              toast.type === "success"
                ? "bg-primary text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.text}
          </div>
        </div>
      )}

      {/* =======================
         CONTACT + FORM
      ======================= */}
      <section className="min-h-screen bg-background-light flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs tracking-widest text-primary">
              CONTACT
            </span>

            <h1 className="mt-4 text-5xl font-bold text-secondary">
              Let’s talk.
            </h1>

            <p className="mt-6 text-gray-600 max-w-md">
              Whether you have a question, feedback, or a quiet idea waiting to
              be heard, we’d love to listen.
            </p>

            <div className="mt-10 space-y-5 text-sm text-secondary">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
                info@punjabbulls.com
              </div>

              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
                +91 9711270115
              </div>

              <div className="flex items-start gap-3 text-primary leading-relaxed">
                <span className="material-symbols-outlined mt-0.5">
                  location_on
                </span>
                <span>
                  PUNJABBULLS TECHNOLOGY PVT. LTD.
                  <br />
                  FE-30, Lower Ground Floor,
                  <br />
                  Shivaji Enclave, New Delhi – 110027, India
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-accent-gray p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Honeypot field (hidden) */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(e) =>
                  setForm({ ...form, company: e.target.value })
                }
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              {["name", "email"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  className="w-full border border-gray-200 px-4 py-3 rounded-(--radius) focus:outline-none focus:border-primary"
                />
              ))}

              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Message"
                required
                className="w-full border border-gray-200 px-4 py-3 rounded-(--radius) focus:outline-none focus:border-primary"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-primary text-white py-3 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =======================
         OUR OFFICES
      ======================= */}
      <section className="relative py-24 px-6 bg-background-light grid-bg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary text-center">
            Our Offices in India
          </h2>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {LOCATIONS.map((loc, i) => (
              <div
                key={loc.city}
                className={`bg-white rounded-xl border p-6 animate-fade-up animate-delay-${
                  i % 3
                }`}
              >
                <h3 className="font-semibold text-secondary">{loc.city}</h3>
                <p className="mt-2 text-sm text-gray-600">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
         MAP (DELHI ONLY)
      ======================= */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-accent-gray">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.094716989596!2d77.1166894!3d28.6568825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03760f4ce391%3A0xbbae2dc9948975e1!2sPunjabbulls%20Technology%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1770361350810"
              width="100%"
              height="420"
              loading="lazy"
              style={{ border: 0 }}
              title="Punjabbulls Delhi Office"
            />
          </div>
        </div>
      </section>
    </>
  );
}
