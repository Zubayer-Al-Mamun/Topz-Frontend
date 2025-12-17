export default function ContactUs() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
                {/* Left: Contact Form */}
                <div className="flex items-center justify-center p-8 md:p-16">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                            Contact us
                        </h2>
                        <p className=" mb-8 text-[12px] text-red-400">
                            আমাদের বন্ধুত্বপূর্ণ দল আপনার কথা শোনার জন্য
                            প্রস্তুত আছে । স্বাগতম ।
                        </p>

                        <div className="space-y-5">
                          phone</div>
                    </div>
                </div>

                {/* Right: Map */}
                <div className="w-full h-[300px] md:h-[50%] p-8">
                    <iframe
                        title="Melbourne Map"
                        src={import.meta.env.VITE_MAP_URL}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            {/* Bottom Section: Locations */}
            <div className="bg-gray-50 py-12 px-8 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Our locations
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Visit us at these locations.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-800">
                        <div>
                            <h4 className="font-medium text-lg">Melbourne</h4>
                            <p className="text-gray-600 text-sm mt-1">
                                100 Flinders Street <br />
                                Melbourne VIC 3000 AU
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium text-lg">London</h4>
                            <p className="text-gray-600 text-sm mt-1">
                                100 Oxford Street <br />
                                London W1D 1LL UK
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium text-lg">Sydney</h4>
                            <p className="text-gray-600 text-sm mt-1">
                                50 George Street <br />
                                Sydney NSW 2000 AU
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium text-lg">
                                San Francisco
                            </h4>
                            <p className="text-gray-600 text-sm mt-1">
                                200 Market Street <br />
                                San Francisco CA 94103 USA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
