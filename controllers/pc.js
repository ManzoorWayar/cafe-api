import moment from 'moment'
import mongoose from "mongoose"
import PC from "../models/Pc.js"
import asyncHandler from "express-async-handler"
import { countMobileWifiMoney, countMoney } from "../utils/countMoney.js"

const getPcs = asyncHandler(async (req, res, next) => {
	const start = moment().startOf('day').toDate()
	const end = moment().startOf('day').add(1, 'day').toDate()

	const pcs = await PC.find({
		createdAt: {
			$gte: start, $lt: end
		}
	})
		.populate('creatorId', 'firstName lastName');

	res.json(pcs)
})

const createPc = asyncHandler(async (req, res) => {
	const { body, user } = req

	body.creatorId = user.id

	const pc = await PC.create(body)

	res.status(201).json(pc)
})

const updatePc = asyncHandler(async (req, res, next) => {
	const { params, body } = req

	if (!mongoose.isValidObjectId(params.id)) return next()

	body.mobileFrom = body.isUsingMobileWifi ? new Date() : undefined

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

	res.status(200).json({ pc, passTime: { sharFileAndWifiTime, mobileWifiTime, sharFileAndWifi, mobileWifi } })
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

const generateReport = asyncHandler(async (req, res, next) => { 
	 const {startDate, endDate} = req.query
 
	const reports = await PC.find({
		createdAt: {
			$gte: new Date(new Date(startDate).setHours('00', '00', '00')),
			$lt: new Date(new Date(endDate).setHours(23, 59, 59))
		}
	})
 
	res.status(200).json(reports)
})

const PcController = {
	getPcs,
	createPc,
	updatePc,
	deletePc,
	withdrawalPc,
	generateReport,
}

export default PcController


// const reportByMonth = [
	// 	{
	// 		"$eq": [
	// 			{
	// 				$month: "$createdAt"
	// 			},
	// 			month
	// 		]
	// 	},
	// 	{
	// 		"$eq": [
	// 			{
	// 				$year: "$createdAt"
	// 			},
	// 			year
	// 		]
	// 	}
	// ]

	// const reportByDay = [
	// 	{
	// 		"$eq": [
	// 			{
	// 				$month: "$createdAt"
	// 			},
	// 			month.replace(/(^|-)0+/g, "$1")
	// 		]
	// 	},
	// 	{
	// 		"$eq": [
	// 			{
	// 				$year: "$createdAt"
	// 			},
	// 			year
	// 		]
	// 	},
	// 	{
	// 		"$eq": [
	// 			{
	// 				$dayOfMonth: "$createdAt"
	// 			},
	// 			day.replace(/(^|-)0+/g, "$1")
	// 		]
	// 	}
	// ]

	// const reportResult = day ? reportByDay : reportByMonth

	// const reports = await PC.find({
	// 	$expr: {
	// 		$and: reportResult
	// 	}
	// })

	
	// let reports = await PC.aggregate([
	// 	{ $addFields: { "month": { $month: '$createdAt' } } },
	// 	{ $match: { month: 2 } }
	// ]);
