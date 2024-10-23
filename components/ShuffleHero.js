import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link'
import { FaPlus } from "react-icons/fa6";
import onBoarding from '../assests/shuffle-hero-assets/onboarding.jpg'
import Congratulations from '../assests/shuffle-hero-assets/congratulations.jpg'
import NewYear from '../assests/shuffle-hero-assets/new_year.jpg'
import Thaknyou from '../assests/shuffle-hero-assets/thankyou.jpg'
import Hbirthday from '../assests/shuffle-hero-assets/hbday.jpg'
import Retirement from '../assests/shuffle-hero-assets/retirement.jpg'
import Christmas from '../assests/shuffle-hero-assets/christmas.jpeg'
import Graduation from '../assests/shuffle-hero-assets/graduation.jpeg'
import Valentines from '../assests/shuffle-hero-assets/valentines.jpeg'


const ShuffleHero = () => {

    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isErasing, setIsErasing] = useState(false);
     const categories = ['Birthday!', 'Welcome!', 'New year!', 'Easter!', 'ThankYou!', 'Love!', 'Farewell!', 'Congrats!'];

  useEffect(() => {
    let timeoutId;

    if (!isErasing) {
      // Writing mode
      if (displayedText?.length < categories[currentCategoryIndex]?.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(categories[currentCategoryIndex].substring(0, displayedText.length + 1));
        }, 100); // Speed of writing each letter
      } else {
        timeoutId = setTimeout(() => {
          setIsErasing(true);
        }, 1000); // Delay before starting to erase
      }
    } else {
      // Erasing mode
      if (displayedText?.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(categories[currentCategoryIndex].substring(0, displayedText?.length - 1));
        }, 100); // Speed of erasing each letter
      } else {
        setIsErasing(false);
        setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories?.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isErasing, currentCategoryIndex]);

  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <h3 className="text-3xl text-black md:text-4xl font-semibold">
            Create group memories with personalized recognition cards and leave a lasting impression!
        </h3>
        <p className="text-base md:text-2xl text-black my-4 md:my-6">
            Personalized occasions with praise board for every <span className="text-[#2a9d8f] text-3xl" > {displayedText}</span>
        </p>
        <Link rel="stylesheet"  href="/boards/create" 
            className="mt-12 btn bg-[#2a9d8f] sm:btn-lg text-md sm:text-xl font-medium text-white border hover:bg-transparent hover:text-[#2a9d8f] hover:border-[#2a9d8f]" 
            > <FaPlus /> Create a Praise board 
        </Link>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [ array[randomIndex], array[currentIndex]];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: onBoarding.src
  },
  {
    id: 2,
    src: Congratulations.src
  },
  {
    id: 3,
    src: NewYear.src
  },
  {
    id: 4,
    src: Thaknyou.src
  },
  {
    id: 5,
    src: Hbirthday.src
  },
  {
    id: 6,
    src: Retirement.src
  },
  {
    id: 7,
    src: Christmas.src
  },
  {
    id: 8,
    src: Graduation.src
  },
  {
    id: 9,
    src: Valentines.src
  }
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    >
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;