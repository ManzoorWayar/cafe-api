import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import PC from "../models/Pc.js"
import { countMobileWifiMoney, countMoney } from "../utils/countMoney.js"

const getPcs = asyncHandler(async (req, res, next) => {
	const pcs = await PC.find({});

	res.json(pcs)
})

const createPc = asyncHandler(async (req, res) => {
	const { body, user } = req

	// body.creatorId = user.id 

	const pc = await PC.create(body)

	res.status(201).json(pc)
})

const updatePc = asyncHandler(async (req, res, next) => {
	const { params, body } = req

	if (!mongoose.isValidObjectId(params.id)) return next()

	body.mobileFrom = new Date()

	const pc = await PC.findByIdAndUpdate(params.id, body, { new: true })

	if (!pc) {
		res.status(404)
		throw new Error("PC Not Found")
	}

	res.status(200).json(pc)
})

const withdrawalPc = asyncHandler(async (req, res, next) => {
	const { params, body } = req

	if (!mongoose.isValidObjectId(params.id)) return next()

	const [sharFileAndWifi, sharFileAndWifiTime] = countMoney(body)
	const [mobileWifi, mobileWifiTime] = countMobileWifiMoney(body)

	const updateData = {
		paid: true,
		to: new Date(),
		mobileTo: body.mobileTo && new Date(),
		totalAmount: sharFileAndWifi + mobileWifi
	}

	const pc = await PC.findByIdAndUpdate(params.id, updateData, { new: true })

	if (!pc) {
		res.status(404)
		throw new Error("PC Not Found")
	}

	res.status(200).json({ pc, passTime: { sharFileAndWifiTime, mobileWifiTime } })
})

const deletePc = asyncHandler(async (req, res, next) => {
	const { params } = req

	if (!mongoose.isValidObjectId(params.id)) return next()

	const pc = await PC.findByIdAndDelete(params.id)

	if (!pc) {
		res.status(404)
		throw new Error("PC Not Found")
	}

	res.json({})
})

const PcController = {
	getPcs,
	createPc,
	updatePc,
	deletePc,
	withdrawalPc,
}

export default PcController