import React from "react";

const Articles = ({ articles }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      {articles && articles.map((article, index) => (
        <div
          key={index}
          className="lg:w-1/3 md:w-1/2 p-4 w-full cursor-pointer hover:shadow-lg transition duration-300"
        >
          <a href={ article.link} target="_blank" rel="noopener noreferrer">
            <img
              src={article.image}
              alt={article.name}
              className="w-full h-40 object-cover object-center mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{article.name}</h2>
            <p className="text-gray-700 mb-4">{article.description}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Articles;