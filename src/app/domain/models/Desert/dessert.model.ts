import {
  IDessertDescription,
  IProductImgDescription,
} from 'src/app/data/interfaces/descriptions/api/vending/description';
import { isDefined } from 'src/app/utils/utils';
import { IProductImage } from '../../interfaces/common/common.interfaces';

export class Dessert {
  public id: number;
  public name: string;
  public price: number;
  public description: string;
  public productImages: IProductImage;

  constructor(dessertDescription: IDessertDescription) {
    if (isDefined(dessertDescription.id)) {
      this.id = dessertDescription.id;
    }

    if (isDefined(dessertDescription.name)) {
      this.name = dessertDescription.name;
    }

    if (isDefined(dessertDescription.price)) {
      this.price = dessertDescription.price;
    }

    if (isDefined(dessertDescription.desc)) {
      this.description = dessertDescription.desc;
    }

    // Set images
    if (isDefined(dessertDescription.img) && dessertDescription.img.length) {
      const smallImage: string = dessertDescription.img.find(
        (img: IProductImgDescription) => img.sm !== undefined
      ).sm;
      const largeImage: string = dessertDescription.img.find(
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
