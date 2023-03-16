import mongoose from "mongoose";

const PcSchema = new mongoose.Schema(
  {
    pc: {
      type: String,
      // required: true
    },
    from: {
      type: Date,
      default: Date.now,
      required: true
    },
    to: {
      type: Date,
      default: null
    },
    message: String,
    SpendMoneyDesc: String,
    isGenerator: {
      type: Boolean,
      default: false,
    },
    isUsingWifi: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: String,
    },
    isUsingMobileWifi: {
      type: Boolean,
      default: false,
    },
    mobileSpeed: {
      type: String,
    },
    mobileFrom: {
      type: Date,
      default: null
    },
    mobileTo: {
      type: Date,
      default: null
    },
    paid: {
      type: Boolean,
      default: false,
    },
    totalAmount: {
      type: Number,
      deafult: 0
    },
    spendMoney: {
      type: Number,
      deafult: 0
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Pc = mongoose.model("Pc", PcSchema);

export default Pc;