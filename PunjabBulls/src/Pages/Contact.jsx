import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
const apiUrl = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {

      const res = await axios.post(
        `${apiUrl}/api/contact`,
        form
      );
      console.log(form)

      if (res.status !== 200) throw new Error();

      setStatus("success");
      setForm({ name: "", email: "", message: "" });

    } catch (err) {

      console.error(err);
      setStatus("error");

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="min-h-screen bg-light flex items-center justify-center px-6 py-20 font-(--font-family-sans)">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <span className="text-xs tracking-widest text-primary font-medium">
            CONTACT
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-secondary leading-tight">
            Let’s talk.
          </h1>

          <p className="mt-6 text-gray-600 max-w-md">
            Whether you have a question, feedback, or a quiet idea waiting to be
            heard, we’d love to listen.
          </p>

          <div className="mt-10 space-y-4 text-sm text-gray-700">
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

            <div className="flex items-center gap-3">
              <span className=" text-primary">
                PUNJABBULLS TECHNOLOGY PVT. LTD. FE-30, Lower Ground Floor, <br />
                Shivaji Enclave, New Delhi- 110027, India
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-xl border border-accent-gray p-10">

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-(--radius) border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-(--radius) border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-color-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full rounded-(--radius) border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full hover:cursor-pointer rounded-full bg-primary text-white py-3 text-sm font-medium tracking-wide hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send message"}
            </button>

            {status === "success" && (
              <p className="text-green-600 text-sm">
                Message sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong. Please try again.
              </p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
