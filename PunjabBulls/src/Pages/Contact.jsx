import React, { useState } from "react";
import axios from "axios";

/* =======================
   OFFICE LOCATIONS
======================= */
const LOCATIONS = [
  {
    city: "Ludhiana",
    address:
      "Sco-5, Sua Road Opposite Canara Bank, Tharike, Jhande, Ludhiana, Punjab 141008",
    map: "https://www.google.com/maps?q=Ludhiana%20Punjab&output=embed",
  },
  {
    city: "Delhi",
    address: "FE-30, Lower Ground Floor, Shivaji Enclave, New Delhi - 110027",
    map: "https://www.google.com/maps?q=Shivaji%20Enclave%20New%20Delhi&output=embed",
  },
  {
    city: "Delhi (Nehru Place)",
    address:
      "508, Eros Apartment, 5th Floor, Building No. 56, Nehru Place, New Delhi",
    map: "https://www.google.com/maps?q=Nehru%20Place%20New%20Delhi&output=embed",
  },

  {
    city: "Chandigarh",
    address:
      "#841, Tricity Trade Tower, Patiala-Zirakpur Highway, Punjab 140603",
    map: "https://www.google.com/maps?q=Zirakpur%20Punjab&output=embed",
  },
  {
    city: "Mumbai",
    address: "Dreamax Height, Jijabai Road, Andheri East, Mumbai - 400093",
    map: "https://www.google.com/maps?q=Andheri%20East%20Mumbai&output=embed",
  },
  {
    city: "Noida",
    address:
      "Office No-2218, 22nd Floor, Ithum 73, Sector 73, Noida, Uttar Pradesh",
    map: "https://www.google.com/maps?q=Noida%20Sector%2073&output=embed",
  },
];

export default function ContactUs() {
  const [activeCity, setActiveCity] = useState(LOCATIONS[1]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =======================
         CONTACT + FORM (UNCHANGED)
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

            {/* CONTACT DETAILS */}
            <div className="mt-10 space-y-5 text-sm text-secondary">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
                <span>info@punjabbulls.com</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
                <span>+91 9711270115</span>
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
              {["name", "email"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-(--radius) focus:outline-none focus:border-primary"
                />
              ))}
              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Message"
                className="w-full border border-gray-200 px-4 py-3 rounded-(--radius) focus:outline-none focus:border-primary"
              />

              <button
                disabled={loading}
                className="w-full rounded-full bg-primary text-white py-3"
              >
                {loading ? "Sending..." : "Send message"}
              </button>

              {status && (
                <p
                  className={`text-sm ${
                    status === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status === "success"
                    ? "Message sent successfully"
                    : "Something went wrong"}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* =======================
         OUR OFFICES (SAME LOOK, BETTER)
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
                onClick={() => setActiveCity(loc)}
                className={`cursor-pointer bg-white rounded-xl border p-6 animate-fade-up animate-delay-${i % 3} hover:shadow-md transition ${
                  activeCity.city === loc.city
                    ? "border-primary"
                    : "border-accent-gray"
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
         MAP + CITY FILTER
      ======================= */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* CITY FILTER TABS */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.city}
                onClick={() => setActiveCity(loc)}
                className={`tracking-wide ${
                  activeCity.city === loc.city
                    ? "text-primary font-medium underline underline-offset-8"
                    : "text-gray-500 hover:text-secondary"
                }`}
              >
                {loc.city}
              </button>
            ))}
          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden border border-accent-gray">
            <iframe
              key={activeCity.city}
              src={activeCity.map}
              width="100%"
              height="420"
              loading="lazy"
              style={{ border: 0 }}
              title="Office Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
