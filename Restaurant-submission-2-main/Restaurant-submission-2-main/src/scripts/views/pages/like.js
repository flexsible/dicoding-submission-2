import favoriteRestaurant from '../../../public/data/favorite-restaurant';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
        <div class="content">
            <h2 class="content__heading">Your Liked Restaurant</h2>
            <div id="restaurantList" class="restaurantList">

            </div>
        </div>
        `;
  },

  async afterRender() {
    const restaurant = await favoriteRestaurant.getAllRestaurant();
    const restaurantContainer = document.querySelector('#restaurantList');

    restaurant.forEach((data) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(data);
    });
  },
};

export default Like;
