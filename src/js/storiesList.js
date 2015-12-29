export class RelatedStoriesList {
	constructor(relStoriesArr) {
		this.relatedStoriesArr = relStoriesArr;
		// console.log(relStoriesArr);
	}
}


export class StoriesList extends RelatedStoriesList {
	constructor () {
		super();
	}
}
