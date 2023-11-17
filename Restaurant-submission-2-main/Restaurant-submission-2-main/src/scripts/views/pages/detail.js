import urlParser from '../../routes/url-parser';
import Restaurant from '../../../public/data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import likeButtonInitiator from '../../utils/like-button.initiator';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = urlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await Restaurant.detailRestaurant(url.id);
    console.info(restaurant);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant,
    });
  },
};

export default Detail;
