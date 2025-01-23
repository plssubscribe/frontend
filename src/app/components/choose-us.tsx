"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function ChooseUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardToShow, setCardToShow] = useState(1);
  let projectsData = [
    { title: "title 1", description: "This is diecription 1" },
    { title: "title 2", description: "This is diecription 2" },
    { title: "title 3", description: "This is diecription 3" },
    { title: "title 4", description: "This is diecription 4" },
    { title: "title 5", description: "This is diecription 5" },
    { title: "title 6", description: "This is diecription 6" },
    { title: "title 7", description: "This is diecription 7" },
  ];
  useEffect(() => {
    const updateCardToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardToShow(projectsData.length);
      } else {
        setCardToShow(1);
      }
    };

    updateCardToShow();

    window.addEventListener("resize", updateCardToShow);
    return () => window.removeEventListener("resize", updateCardToShow);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };
  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };
  return (
    <section id="choose-us" className="contact-area py-16 bg-[#030B15]">
      <div className="row justify-center mb-16 text-center">
        <div className="col-lg-8">
          <div className="section-title mb-6 d-flex">
            <span className="sub-title text-sm font-semibold text-gray-500 uppercase flex items-center justify-center space-x-2">
              <div className="bg-sky-500 rounded-full w-2 h-2"></div>
              <span>Why choose our bigtech</span>
              <div className="bg-sky-500 rounded-full w-2 h-2"></div>
            </span>
            <h2 className="title text-3xl font-bold text-[white] mt-2">
              <span className="text-blue-600">Why choose our bigtech</span>{" "}
              <br />
              Token
            </h2>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto   px-6 md:px-20 lg:px-32 my-5 w-full overflow-hidden"
        id="Projects"
      >
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={prevProject}
            className="p-3 bg-gray-200 rounded-50 mr-2"
            aria-label="Previous Projects"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={nextProject}
            className="p-3 bg-gray-200 rounded-50 mr-2"
            aria-label="Previous Projects"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardToShow}%)`,
            }}
          >
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 shadow border border-[#121A23] rounded  transition-transform duration-300  hover:border-0 p-3 w-full sm:w-1/4 flex items-center justify-center group"
              >
                <div className="choose-item flex flex-col items-center justify-center shadow rounded p-6 space-y-4  group-hover:shadow-lg transition-all duration-300 ease-in-out">
                  <div className="choose-icon border rounded-50 border-[#121A23] flex justify-center group-hover:scale-105 transition-transform duration-300 ease-in-out">
                    <img
                      className="light w-4 h-4 md:w-16 md:h-16 p-4"
                      src="https://themedox.com/bigtech/wp-content/uploads/2023/03/choose_icon02.svg"
                      alt=""
                    />
                  </div>
                  <div className="choose-content text-center">
                    <h2 className="title text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 ease-in-out">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors duration-300 ease-in-out">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Progress Line */}
          <div className="w-full h-[2px] bg-gray-300  mb-8   mt-[10vh]">
            <div
              className="h-full bg-blue-500  transition-all duration-300"
              style={{
                width: `${(currentIndex / (projectsData.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
