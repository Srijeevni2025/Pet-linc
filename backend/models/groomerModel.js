const mongoose = require("mongoose")
const bcrypt = require("bcrypt");


const groomerSchema = new mongoose.Schema(
  {
    // BASIC IDENTITY
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    // email: {
    //   type: String,
    //   unique: true,
    //   lowercase: true,
    // },

    // password: {
    //   type: String,
    //   required: true,
    //   select: false, // never send password to frontend
    // },
     // ADD THIS — password field
password: {
  type: String,
  required: [true, "Password is required"],
  minlength: 6,
  select: false,
},
    // PROFILE
    avatar: {
      type: String, // image URL
    },

    experienceYears: {
      type: Number,
      default: 0,
    },

    about: {
      type: String,
    },

    // SERVICE AREA
    city: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    serviceRadiusKm: {
      type: Number,
      default: 5, // how far they are willing to travel
    },

    // GEO LOCATION (for nearest groomer matching)
    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //     default: "Point",
    //   },
    //   coordinates: {
    //     type: [Number], // [longitude, latitude]
    //   },
    // },

    // AVAILABILITY
    isOnline: {
      type: Boolean,
      default: false,
    },

    isBusy: {
      type: Boolean,
      default: false, // true when handling an order
    },

    // SERVICES & PRICING
    // services: {
    //   basic: {
    //     small: Number,
    //     medium: Number,
    //     large: Number,
    //   },
    //   standard: {
    //     small: Number,
    //     medium: Number,
    //     large: Number,
    //   },
    //   premium: {
    //     small: Number,
    //     medium: Number,
    //     large: Number,
    //   },
    // },

    // VERIFICATION & TRUST
    isVerified: {
      type: Boolean,
      default: false,
    },

    // documents: {
    //   idProof: String,
    //   certificate: String,
    // },
    aadhar:{
        type:String,
        required:true
    },

    panNumber:{
        type:String,
        required:true
    },

    rating: {
      type: Number,
      default: 5,
    },

    totalJobs: {
      type: Number,
      default: 0,
    },

    // EARNINGS & PAYOUT
    walletBalance: {
      type: Number,
      default: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

    commissionPercent: {
      type: Number,
      default: 20, // Petlinc cut
    },

    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      ifsc: String,
      bankName: String,
    },

    // STATUS
    isActive: {
      type: Boolean,
      default: true,
    },
    fcmToken: {
  type: String,
  default: null,
},

  },
  { timestamps: true },
  
);



groomerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

groomerSchema.methods.checkPassword = async function (received, saved) {
  return await bcrypt.compare(received, saved);
};


const Groomer = mongoose.model("Groomer", groomerSchema);

module.exports = Groomer;
