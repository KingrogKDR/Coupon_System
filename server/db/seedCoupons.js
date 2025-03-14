import connectDB from "./index.js";
import { Coupon } from "../models/coupon.model.js"


const coupons = [
    {
      code: 'SAVE10',
      description: '10% off your entire purchase',
      discountAmount: 10,
      isActive: true,
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
    },
    {
      code: 'SUMMER25',
      description: '$25 off summer collection items',
      discountAmount: 25,
      isActive: true,
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
    },
    {
      code: 'FREESHIP',
      description: 'Free shipping on orders over $50',
      discountAmount: 5,
      isActive: true,
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
    },
    {
      code: 'WELCOME15',
      description: '15% off your first order',
      discountAmount: 15,
      isActive: true,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    },
    {
      code: 'FLASH50',
      description: '50% off flash sale items',
      discountAmount: 50,
      isActive: true,
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    },
    {
      code: 'HOLIDAY20',
      description: '20% off holiday special',
      discountAmount: 20,
      isActive: true,
      expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000) // 120 days from now
    },
    {
      code: 'BUNDLE30',
      description: '30% off when you buy 3 or more items',
      discountAmount: 30,
      isActive: true,
      expiryDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000) // 75 days from now
    },
    {
      code: 'APP10',
      description: 'Extra 10% off when ordering through our app',
      discountAmount: 10,
      isActive: true,
      expiryDate: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000) // 100 days from now
    },
    {
      code: 'SIGNUP5',
      description: '$5 off your first purchase when you sign up',
      discountAmount: 5,
      isActive: true,
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180 days from now
    },
    {
      code: 'LOYALTY15',
      description: '15% off for loyalty members',
      discountAmount: 15,
      isActive: true,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 365 days from now
    }
  ];


const seedDB = async () => {
    try {
        await connectDB();
        console.log("Clearing existing coupons...");
        await Coupon.deleteMany({})
        console.log("Adding new coupons...")
        await Coupon.insertMany(coupons)
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDB()