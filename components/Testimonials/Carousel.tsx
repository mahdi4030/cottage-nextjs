"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { ImQuotesLeft } from 'react-icons/im';
import 'swiper/css';

export const Carousel = () => {
  const breakpoints = {
		640: {
			slidesPerView: 1,
			spaceBetween: 16,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
	};

  const testimonials= [
		{
			name: "Amy H.",
			location: "New York, NY",
			quote: "Switching to renewable energy was a breeze with Cottage! Their customer service was very helpful and made the process stress-free.",
		},
		{
			name: "Akshay S.",
			location: "Chicago, IL",
			quote: "I never thought I'd be able to afford renewable energy, but Cottage made it possible. The switch was hassle-free and I'm already seeing the benefits on my monthly energy bills.",
		},
		{
			name: "James M.",
			location: "Hudson Valley, NY",
			quote: "Cottage made it easy for me to switch to renewable energy as a busy homeowner. Their team was knowledgeable and responsive, and the process was transparent.",
		},
		{
			name: "Heather J.",
			location: "Worstall, NY",
			quote: "Cottage made the switch to renewable energy easy and stress-free. Their customer service was top-notch and always available to help.",
		},
		{
			name: "Monique G.",
			location: "Baltimore, MD",
			quote: "I'm so glad I made the switch to renewable energy with Cottage. Not only did they help me find ways to save money on my energy bills, but I'm also doing my part to reduce my carbon footprint and protect the environment. It's a win-win!",
		},
		{
			name: "Jerome A.",
			location: "Hoboken, NJ",
			quote: "As someone who cares about the planet, switching to renewable energy with Cottage was a no-brainer for me. The process was easy and the benefits for the environment are immeasurable. I'd highly recommend giving it a try!",
		},
	];

	return (
		<div className="flex w-full">
			<Swiper
				spaceBetween={16}
				slidesPerView={3}
				autoplay={{delay: 3000}}
				loop={true}
				speed={1200}
				breakpoints={breakpoints}
				className="w-full"
			>
				{testimonials.map((t, i) => (
					<SwiperSlide className="flex p-2" key={ i }>
						<div className="relative rounded-2xl bg-white p-6 shadow-lg break-inside-avoid-column">
							<ImQuotesLeft className="absolute top-6 left-6 text-border/30 text-8xl" />
							<div className="relative">
								<p className="text-lg tracking-tight leading-snug text-textblack">
									{ t.quote }
								</p>
								<div className="relative mt-3 flex items-center justify-between border-t border-border/50 pt-3"></div>
								<div>
									<div className="text-lg text-forrest-700 font-semibold">{ t.name }</div>
									<div className="text-sm text-gray-500">{ t.location }</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
