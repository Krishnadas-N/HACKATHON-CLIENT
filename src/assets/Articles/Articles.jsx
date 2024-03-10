import React from "react";

const Articles = ({ articles }) => {
    console.log(articles);
    return (
        <div className="overflow-y-scroll h-full pt-14">
            {articles && articles.map((article, index) => (
                <div
                    key={index}
                    className="p-4 w-full h-auto cursor-pointer hover:shadow-lg transition duration-300"
                >
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                        <img
                            src={article.image_url}
                            alt='articleImage'
                            className="w-full h-80 object-cover object-center mb-4"
                        />
                        <h2 className="text-xl font-bold mb-2">{article.name}</h2>
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-700 mb-4">{article.description}</p>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Articles;
