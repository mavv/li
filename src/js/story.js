import Image from './image';

class Story {
	constructor (item) {
		this.title = item.title;
		this.titleNoFormatting = item.titleNoFormatting;
		this.publisher = item.publisher;
		this.publishedDate = new Date(item.publishedDate);
	}
}

class StoryExpanded extends Story {
	constructor (item) {
		super(item);
		this.image = new Image(item.image);
		this.content = item.content;
		this.url = item.url;
		this.unescapedUrl = item.unescapedUrl;
		const rel = item.relatedStories;
		// console.log(rel);
		// this.relatedStories = new RelatedStoriesList(item.relatedStories);
	}

}

export class StoryExpandedList {
	constructor (items) {
		this.items = new Array();
		for (const el of items) {

			this.items.push(new StoryExpanded(el));
		}
	}

	destroy(id) {

		 let root = document.getElementById(id);
		while (root.children.length > 0) {
			root.removeChild(root.lastChild);
		}
	}

	render (order = 'asc', id) {
		let root = document.getElementById(id);
		console.log(order);
		this.items.sort((a, b) => {
			return order === 'asc' ?
							a.publishedDate - b.publishedDate :
							b.publishedDate - a.publishedDate;
		});
		let domString = ``;
		for (const el of this.items) {

			domString += `<article id="a${this.items.indexOf(el)}">
					<header onClick="toggle(${this.items.indexOf(el)})" class="trigger" id="h${this.items.indexOf(el)}">
						<div id="hi${this.items.indexOf(el)}">
							<img src="${el.image.tbUrl}"/>
						</div>
						<div>
							<span id="sp${this.items.indexOf(el)}">${el.title}, </span>
							<span>${el.publishedDate}, </span>
							<span>${el.publisher}</span>

						</div>
					</header>
					<section class="collapsable" id="s${this.items.indexOf(el)}">
						<div>
							<img src="${el.image.url}"/>
							<p>${el.content}<a class="more" href="${el.unescapedUrl}">Read more</a></p>
						</div>
					</section>
				</article>
				`;

		}
		root.innerHTML= domString;
		return root.childNodes[0];
	}

}
