function ApiFeatures(query, queryString) {
	this.query = query; // Products.find()
	this.queryString = queryString; // req.query

	this.search = () => {
		const keyword = this.queryString.keyword
			? {
					name: {
						$regex: this.queryString.keyword,
						$options: 'i',
					},
			  }
			: {};

		this.query = this.query.find({ ...keyword });
		return this;
	};

	this.filter = () => {
		const queryObjCopy = { ...this.queryString };

		const removeExcludedFields = ['keyword', 'page', 'limit'];

		removeExcludedFields.forEach((key) => delete queryObjCopy[key]);

		// Filter For Price and Rating

		let queryStr = JSON.stringify(queryObjCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

		this.query = this.query.find(JSON.parse(queryStr));

		return this;
	};

	this.pagination = (resultPerPage) => {
		const currentPage = Number(this.queryString.page) || 1;

		const skip = resultPerPage * (currentPage - 1);

		this.query = this.query.limit(resultPerPage).skip(skip);

		return this;
	};

	// this.sorting = () => {
	// 	const sort = this.queryString.sort || '-createdAt';
	// 	this.query = this.query.sort(sort);
	// 	return this;
	// };
}

module.exports = ApiFeatures;
