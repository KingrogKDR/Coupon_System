import React, { useState } from "react";
import { claimCoupon } from "../services/api";

const CouponClaim = () => {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [claimed, setClaimed] = useState(false);

  const handleCouponClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await claimCoupon();
      if (result.success) {
        setCoupon(result.data);
        setClaimed(true);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Get Your Discount Coupon
          </h1>
          <p className="text-gray-600 mb-6">
            Click the button below to claim a special discount coupon. Note: You
            can only claim one coupon per device within a 24-hour period.
          </p>

          <button
            onClick={handleCouponClick}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Claim Your Coupon"}
          </button>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {claimed && (
            <div className="animate-fade-in-down mt-4">
              <p className="text-green-600 font-semibold mb-2">
                Congratulations! You've claimed a coupon.
              </p>
            </div>
          )}


          {coupon && (
            <div className="mt-6 bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Your Coupon
                </h2>
                <div className="bg-yellow-50 p-3 rounded mb-4 border border-yellow-200">
                  <span className="font-mono text-xl font-bold tracking-wider">
                    {coupon.code}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{coupon.description}</p>
                <p className="text-gray-800 font-semibold mb-2">
                  Discount: ${coupon.discountAmount}
                </p>
                <p className="text-gray-600 text-ssm">
                  Valid until: {formatDate(coupon.expiryDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponClaim;
