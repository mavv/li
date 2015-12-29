import Image from './image';

class Story {
	constructor (item) {
		this.title = item.title;
		this.titleNoFormatting = item.titleNoFormatting;
		this.publisher = item.publisher;
		this.publishedDate = new Date(item.publishedDate);
	}
}

class RelatedStory extends Story {
	constructor (item) {
		super(item);
		this.unescapedUrl = item.unescapedUrl;
		this.url = item.url;
	}
}

class StoryExpanded extends Story {
	constructor (item) {
		super(item);
		this.image = new Image(item.image);
		this.content = item.content;
		this.url = item.url;
		this.unescapedUrl = item.unescapedUrl;

		this.relatedStories = new Array();
		if (item.relatedStories !== undefined && item.relatedStories.length) {
			for (const rel of item.relatedStories) {
				this.relatedStories.push(new RelatedStory(rel));
			}
		}
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
		const root = document.getElementById(id);
		while (root.children.length > 0) {
			root.removeChild(root.lastChild);
		}
	}

	render (order = 'asc', id) {
		const root = document.getElementById(id);
		// console.log(order);
		this.items.sort((a, b) => {
			return order === 'asc' ?
							a.publishedDate - b.publishedDate :
							b.publishedDate - a.publishedDate;
		});
		let domString = ``;
		for (const el of this.items) {
			let domRels = `<ul>`;
			console.log(el.relatedStories);
			if (el.relatedStories.length > 0) {
				for (const e of el.relatedStories) {
					domRels += `<li>
						<a href="${e.url}">${e.title}<a>
					</li>`;
				}
			}
			domRels += `</ul>`;
			// for (const rel of this.relatedStories) {
			// 	// domRels = rel.
			// 	console.log(rel);
			// }
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
						<aside>
							${domRels}
						</aside>
					</section>
				</article>
				`;

		}
		root.innerHTML= domString;
		return root.childNodes[0];
	}

}
