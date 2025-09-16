import { MediaType } from '../utils/MediaType';
import type { ModelToData } from '../utils/Utils';
import { mediaDbTag, migrateObject } from '../utils/Utils';
import { MediaTypeModel } from './MediaTypeModel';

export type GameData = ModelToData<GameModel>;

export class GameModel extends MediaTypeModel {
	developers: string[];
	publishers: string[];
	genres: string[];
	onlineRating: number;
	onlineReviews: string;
	onlineRecommendations: number;
	requiredAge: string;
	shortDescription: string;
	description: string;
	image: string;

	released: boolean;
	releaseDate: string;

	userData: {
		played: boolean;
		personalRating: number;
	};

	constructor(obj: GameData) {
		super();

		this.developers = [];
		this.publishers = [];
		this.genres = [];
		this.onlineRating = 0;
		this.onlineReviews = '';
		this.onlineRecommendations = 0;
		this.requiredAge = '';
		this.shortDescription = '';
		this.description = '';
		this.image = '';

		this.released = false;
		this.releaseDate = '';

		this.userData = {
			played: true,
			personalRating: 0,
		};

		migrateObject(this, obj, this);

		if (!Object.hasOwn(obj, 'userData')) {
			migrateObject(this.userData, obj, this.userData);
		}

		this.type = this.getMediaType();
	}

	getTags(): string[] {
		return ['media', 'videogames'];
	}

	getMediaType(): MediaType {
		return MediaType.Videogame;
	}

	getSummary(): string {
		return this.englishTitle + ' (' + this.year + ')';
	}
}
