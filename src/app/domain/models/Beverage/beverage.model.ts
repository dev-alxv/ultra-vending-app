import {
  IBeverageDescription,
  IProductImgDescription,
  IProductIngredientsDescription,
} from 'src/app/data/interfaces/descriptions/api/vending/description';
import { isDefined } from 'src/app/utils/utils';
import { IIngredient } from '../../interfaces/beverage/beverage.interfaces';
import { IProductImage } from '../../interfaces/common/common.interfaces';

export class Beverage {
  public id: number;
  public name: string;
  public price: number;
  public description: string;
  public ingredients: IIngredient[];
  public productImages: IProductImage;

  constructor(beverageDescription: IBeverageDescription) {
    if (isDefined(beverageDescription.id)) {
      this.id = beverageDescription.id;
    }

    if (isDefined(beverageDescription.name)) {
      this.name = beverageDescription.name;
    }

    if (isDefined(beverageDescription.price)) {
      this.price = beverageDescription.price;
    } else {
      this.price = Math.floor(Math.random() * 12);
    }

    if (isDefined(beverageDescription.desc)) {
      this.description = beverageDescription.desc;
    }

    // Set ingredients
    if (isDefined(beverageDescription.ingredients)) {
      this.ingredients = beverageDescription.ingredients.map(
        (description: IProductIngredientsDescription) => {
          const ingredient: IIngredient = {
            id: description.id.toString(),
            name: description.name,
            image: description.img,
          };

          return ingredient;
        }
      );
    }

    // Set images
    if (isDefined(beverageDescription.img) && beverageDescription.img.length) {
      const smallImage: string = beverageDescription.img.find(
        (img: IProductImgDescription) => img.sm !== undefined
      ).sm;
      const largeImage: string = beverageDescription.img.find(
        (img: IProductImgDescription) => img.lg !== undefined
      ).lg;

      this.productImages = {
        main: {
          small: smallImage,
          large: largeImage,
        },
      };
    }
  }
}
