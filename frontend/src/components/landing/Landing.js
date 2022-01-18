import React from 'react'
import './LandingStyle.css'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <header class="masthead">
                <div class="container px-4 px-lg-5 h-100">
                    <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div class="col-lg-8 align-self-end">
                            <h1 class="text-white font-weight-bold">Your Favorite App to analyze your finances</h1>
                            <hr class="divider" />
                        </div>
                        <div class="col-lg-8 align-self-baseline">
                            <p class="text-white-75 mb-5">Start with CashFlow now!</p>
                            <Link to='/login' ><a class="btn btn-primary btn-xl" href="#">Get Started</a></Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Landing
