import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Articles from '../Articles/Articles'


function Home() {
    const [articles, setArticle] = useState([]);
    const Data = [
        {
            "title": "Beti Bachao, Beti Padhao",
            "description": "Join the movement to save and educate the girl child. Together, let's empower girls and eliminate gender-based violence.",
            "image_url": "https://regent.ac.za/wp-content/uploads/2019/11/shutterstock_1209152275.jpg",
            "resources": [
                {
                    "title": "Government of India - Beti Bachao, Beti Padhao",
                    "link": "https://www.betibachao.betipadhao.gov.in/"
                },
                {
                    "title": "UNICEF India - Gender Equality and Violence Prevention",
                    "link": "https://www.unicef.org/india/what-we-do/gender-equality-and-violence-prevention"
                }
            ]
        },
        {
            "title": "One Stop Centre Scheme",
            "description": "Access comprehensive support and services for women affected by violence through One Stop Centres across India.",
            "image_url": "https://image.shutterstock.com/image-vector/stop-violence-against-women-womens-260nw-2074070402.jpg",
            "resources": [
                {
                    "title": "Ministry of Women and Child Development - One Stop Centre Scheme",
                    "link": "https://www.wcd.nic.in/schemes/one-stop-centre-scheme"
                },
                {
                    "title": "National Commission for Women - Helpline Numbers",
                    "link": "https://ncw.nic.in/helpline-numbers"
                }
            ]
        }]
    useEffect(() => {
        setArticle(Data)
    }, [])

    return (
        <div className=''>
            <Navbar />
            <Articles articles={articles} />
        </div>
    )
}

export default Home
