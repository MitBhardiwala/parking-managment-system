import React from 'react'
import './../css/about.scss'

const About = () => {
    return (
        <div>
            <div className='overlay'>
                <h1>About</h1>
            </div>
            <div className='container'>
                <div className='row py-5 my-5'>
                    <h2 className='mb-3'>Dedicated Parking Areas for Faculty</h2>
                    {/* <p>A Spot aims to establish a platform that connects parking owners within the community with users in search of affordable parking spaces. Our web application assists parking owners in effectively renting out their additional parking spaces, providing them with an opportunity to earn extra income. Additionally, rent a Spot facilitates users in finding cost-effective parking spaces.</p> */}
                    <p>Our car parking system includes dedicated parking areas exclusively for faculty members. This ensures that faculty always have convenient and accessible parking spaces near academic buildings, making their commute to work smoother and more efficient.We provide clear information about available parking areas and slot availability on our website. This helps users plan their parking in advance and reduces time spent searching for parking spots. With easy access to essential details, users can make informed decisions about their parking needs.</p>
                </div>

                <div className='row mt-5 mb-5'>
                    <div className='col-md-6'>
                        <img src='./vit_parking_1.png' className='services-img'></img>
                    </div>
                    <div className='col-md-6 d-flex align-items-center'>
                        <div>
                            <h3>Reserved Slots for Students</h3>
                            {/* <p>Parking Seekers can utilize the Rent a Spot web application to search for available parking spots that meet their specific needs. By selecting a suitable parking spot, users can reserve it by making the desired payment. Once the reservation is confirmed, users can park their cars by following the provided instructions. Our user-friendly platform ensures a seamless and convenient experience for Parking Seekers, allowing them to easily find and secure parking spaces that suit their requirements.</p> */}
                            <p>Students can benefit from our system by reserving parking slots in advance. This feature allows students to secure a parking space on campus, eliminating the hassle of searching for parking during peak hours. Whether it's for daily classes or longer stays, our system provides students with the convenience they need.</p>
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-md-6 d-flex align-items-center'>
                        <div className='text-right'>
                            <h3>Easy-to-Use Interface</h3>
                            {/* <p>The Rent a Spot web application offers a professional service for parking owners from the community, enabling them to efficiently rent out their extra parking spaces and generate additional income. Our platform lets parking owners easily list their available spots, provide essential details, and set competitive rental prices. Our user-friendly interface ensures a seamless experience, allowing owners to manage their listings, communicate with potential renters, and finalize bookings. With Rent a Spot, parking owners can maximize the utilization of their parking spaces and unlock a new source of revenue. Start utilizing our platform today and experience the benefits of hassle-free and profitable parking space management.</p> */}
                            <p>Our website offers an intuitive and user-friendly interface for booking parking slots. Students and faculty can easily navigate the system, select their desired parking duration, and receive confirmation of their reservation. This simplicity makes parking management hassle-free for all users.</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <img src='./owner.jpg' className='services-img'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About