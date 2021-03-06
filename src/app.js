const Production = require('./production');
const axios = require('axios');
const utils = require('./utils');
const URL = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1';

utils.getAllProducts('/api/products/1',(err,data)=>{
	if (err){
		console.log(err)
	}
	const products = data;
	//get all products of air conditioners category
	const airConditionerProducts = utils.getProductionByCategory('Air Conditioners',products);
	//filter products by validation check
	const filterAirConditionerProducts = utils.filterProductionsByValidation(airConditionerProducts);
	//get array of products weight
	const weights = filterAirConditionerProducts.map(item=>{
		const product = new Production(item);
		return product.calWeight();
	})
	console.log('weights:',weights);
	if (weights == 0){
		console.log('can not find any air conditioners');
	}else {
		const totalWeight = weights.reduce((accumulator, currentValue) => accumulator + currentValue);
		const averageWeight = totalWeight/(weights.length);
		console.log(`air conditioners average weight:${averageWeight} kg`);
	}
})

