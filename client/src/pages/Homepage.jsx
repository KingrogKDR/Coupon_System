import React from 'react';
import CouponClaim from '../components/CouponClaim';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Special Discount Coupons
          </h1>
          <p className="text-gray-600">
            Claim your exclusive coupon and save on your next purchase!
          </p>
        </div>
        <div className='flex justify-center gap-3 items-center'>
            <p>An admin?</p>
            <Link to="/admin" className='shadow-md px-4 py-2 rounded-2xl hover:text-white hover:bg-black hover:scale-110 transition ease-in duration-300' >Go To Admin</Link>
        </div>
        <CouponClaim />
      </div>
    </div>
  );
};

export default HomePage;