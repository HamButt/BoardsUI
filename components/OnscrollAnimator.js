import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Occasion from '../public/occasions.jpg'
import Invite from '../public/invite.png'
import Deliver from '../public/Designer.jpeg'
import { FaPlus } from "react-icons/fa6";

export const TextParallaxContentExample = () => {

    const contentarray = [
        {
        id: 1,
        heading: "Select any occasion",
        description: "Whether it's a birthday, anniversary, or any special moment worth celebrating, you can choose the perfect occasion for your Praise Board. Select the category that best fits the event and customize the style in just a few minutes, ensuring it matches the tone and significance of the occasion",
        },
        {
        id: 2,
        heading: "Invite people",
        description: "Simply fill out your personal details, and craft a heartfelt personal message. In no time, you'll have a beautifully designed Praise Board ready to celebrate the occasion. Whether it's for friends, family, or colleagues, everyone can be a part of the celebration"
        },
        {
        id: 3,
        heading: "Deliver to recipient",
        description: "Easily share your Praise Board with others in just a few clicks. You can send it directly via email, share the link through WhatsApp, or copy the URL to distribute it however you like. No matter where your recipients are, they’ll be able to view and celebrate the occasion with you"
        },
    
    ]

  return (
    <div className="mt-10">
      <TextParallaxContent
        imgUrl={Occasion.src}
        subheading="Create"
        heading="Choose Occasion & Customize"
      >
        <MainContent contentarray={contentarray[0]} />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={Invite.src}
        subheading="Invite"
        heading="Personalize & Invite Guests"
      >
        <MainContent contentarray={contentarray[1]}/>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={Deliver.src}
        subheading="Deliver"
        heading="Share & Celebrate"
      >
        <MainContent contentarray={contentarray[2]}/>
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy subheading={subheading} heading={heading}/>
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div style={{ y, opacity}} ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-4xl ">{subheading}</p>
      <p className="text-center text-4xl  md:text-6xl">{heading}</p>
    </motion.div>
  );
};

const MainContent = ({contentarray}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-10 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl text-black font-bold md:col-span-4">
        {contentarray?.heading}
    </h2>
    <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-black md:text-2xl">
            {contentarray?.description}
        </p>
        <button className="w-full rounded-md px-9 py-3 text-xl text-white transition-colors hover:bg-[#34bdad] bg-[#2a9d8f] md:w-64">
            <FaPlus className="inline" /> Create a board
        </button>
    </div>
  </div>
);


