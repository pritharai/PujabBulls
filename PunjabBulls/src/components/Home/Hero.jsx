import React from 'react'

const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-background-light">
            <div className="px-4 md:px-10 lg:px-40 py-12 md:py-20 flex justify-center">
                <div className="max-w-300 w-full">
                    <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
                        {/* LEFT CONTENT */}
                        <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
                            <div className="flex flex-col gap-4">
                                <span className="text-primary font-bold tracking-wider text-sm uppercase">
                                    IT Consulting &amp; Solutions
                                </span>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#101912]">
                                    Empowering Enterprise Excellence
                                </h1>

                                <h2 className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    Transform your business with expert ERP, CRM, and Microsoft
                                    Dynamics solutions tailored for growth.
                                </h2>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                                <button className="flex hover:cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                                    Get Started
                                </button>

                                <button className="flex hover:cursor-pointer items-center justify-center rounded-lg h-12 px-6 border border-[#d3e4d8]  text-[#101912] text-base font-bold hover:bg-black/5 transition-all">
                                    View Solutions
                                </button>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="w-full flex-1">
                            <div
                                className="aspect-4/3 w-full rounded-2xl bg-cover bg-center shadow-2xl overflow-hidden relative"
                                style={{
                                    backgroundImage: "url('/images/hero_img.png')",
                                }}
                                aria-label="Modern office representing enterprise growth"
                            >
                                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent mix-blend-multiply"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero