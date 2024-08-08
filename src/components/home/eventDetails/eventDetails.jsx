const EventDetailsSection = () => {
  return (
    <div className="bg-black py-16">
      <div
        className="text-white max-w-6xl mx-auto rounded-lg p-12 relative min-h-[400px]"
        style={{
          background: 'linear-gradient(90deg, #DA22FF 0%, #9733EE 100%)',
        }}
      >
        <div className="relative flex flex-col md:flex-row items-center justify-center">
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[300px] overflow-hidden">
              {/* Gambar utama */}
              <img
                src="/images/about-fosti.jpeg"
                alt="Event Image"
                className="absolute inset-0 w-full h-full object-cover rounded-lg z-10 shadow-lg"
              />
            </div>
            {/* Gambar belakang */}
            <img
              src="/images/about-fosti.jpeg"
              alt="Event Image Shadow"
              className="rounded-lg absolute top-[-45px] left-[-16px] opacity-50 z-0 w-[300px] h-[300px]"
            />
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">About Fostifest</h2>
            <p className="text-base mb-6">  
              FOSTIFEST adalah acara teknologi oleh FOSTI UMS dengan tema
              "Designing the Future: Creative Tech for The Digital Age". Acara
              ini mencakup workshop tentang pembuatan aplikasi chat dengan
              Vue.js, serta kompetisi di keamanan digital, hackathon,
              pemrograman, dan desain UI/UX. Penutup acara meliputi diskusi,
              tanya jawab, dan pengumuman pemenang. FOSTIFEST bertujuan
              meningkatkan keterampilan teknis, mendorong kreativitas, dan
              memperluas peluang karir di teknologi digital.
            </p>
          </div>
        </div>

        {/* Timeline section*/}
        <section className="py-12 mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Lets Check <br /> Our Timeline
            </h2>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/timeline-poster.png"
              alt="Timeline Image"
              className="w-11/12 max-w-4xl mx-auto"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetailsSection;
