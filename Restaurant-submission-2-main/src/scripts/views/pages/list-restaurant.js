import Restaurant from '../../../public/data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const restaurantList = {
  async render() {
    return `
        <div class="content">
            <div class="hero">
            <div class="hero-content">
                <h2>Welcome to</h2>
                <h1>Restaurant 98</h1>
            </div>
        </div>

            <h2 class="list-title" id="list-title">Restaurant List</h2>
            <div id="restaurantList" class="restaurantList">

            </div>
        </div>
        `;
  },

  async afterRender() {
    const data = await Restaurant.restaurantList();
    const restaurantContainer = document.querySelector('#restaurantList');
    data.restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default restaurantList;
