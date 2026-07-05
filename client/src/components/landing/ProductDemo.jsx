import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

import demoVideo from "@/assets/demo/pms-demo.mp4";

const ProductDemo = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Background Glow */}

      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full left-0 top-10" />

      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full right-0 bottom-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="uppercase tracking-widest text-blue-400 font-semibold mb-3">
          Product Demo
        </p>

        <h2 className="text-5xl font-bold mb-6">
          Watch PMS
          <span className="text-blue-400"> In Action</span>
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          See how students, recruiters and administrators collaborate seamlessly
          on one unified placement platform.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111827] shadow-[0_20px_70px_rgba(0,0,0,.5)]">
          {/* Browser Top */}

          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-[#1f2937]">
            <div className="w-3 h-3 rounded-full bg-red-500" />

            <div className="w-3 h-3 rounded-full bg-yellow-500" />

            <div className="w-3 h-3 rounded-full bg-green-500" />

            <div className="ml-6 text-sm text-gray-400">
              placement-management-system
            </div>
          </div>

          <div className="relative aspect-video">
            {!playVideo ? (
              <>
                {/* Thumbnail */}

                <img
                  src="/demo-thumbnail.png"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setPlayVideo(true)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-full bg-blue-500 shadow-xl flex items-center justify-center">
                    <Play size={42} fill="white" color="white" />
                  </div>
                </motion.button>
              </>
            ) : (
              <video
                src={demoVideo}
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductDemo;
