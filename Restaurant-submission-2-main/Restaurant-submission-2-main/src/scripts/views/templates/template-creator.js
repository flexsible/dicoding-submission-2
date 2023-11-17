import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (data) => `
<div class='restaurant__details'>
    <div class='restaurant__image'>
        <img class='restaurant__poster' src='${CONFIG.BASE_IMAGE_URL + data.restaurant.pictureId}' alt='${data.restaurant.name}' />
    </div>

    <div class='restaurant__detail'>
        <h2 class='restaurant__title'>${data.restaurant.name}</h2>
        <div class='restaurant__info'>
            <p class='restaurant__info-category'>${data.restaurant.categories
    .map(
      (category) => `
                    <span class='category'>${category.name}</span>
                    `,
    )
    .join('')}</p>
            <h3>Information</h3>
            <p class='restaurant__description'>${data.restaurant.description}</p>
            <div class='restaurant__detail-info'>
                <p>Rating: ${data.restaurant.rating}/5.0</p>
                <p>Location: ${data.restaurant.city}</p>
                <p>Address: ${data.restaurant.address}</p>
            </div>
        </div>
    </div>
</div>

    <div class='restaurant__menu'>
        <div class='restaurant__menu-food'>
        <h3>Food</h3>
            <ul>
                ${data.restaurant.menus.foods
    .map(
      (food) => `
                    <li><p>${food.name}</p></li>
                    `,
    )
    .join('')}
            </ul>
        </div>

        <div class='restaurant__menu-drink'>
        <h3>Drink</h3>
        <ul>
            ${data.restaurant.menus.drinks
    .map(
      (drink) => `
                <li><p>${drink.name}</p></li>
                `,
    )
    .join('')}
        </ul>
        </div> 
    </div>

    <h2 class='review-title'>Customer Review</h2>
    <div class='restaurant__review'>
        ${data.restaurant.customerReviews
    .map(
      (review) => `
            <div class='review-detail'>
                <div class='review-header'>
                <p class='review-name'>${review.name}</p>
                <p class='review-date'>${review.date}</p>
                </div>

                <div class='review-body'>
                <p class='review-text'>${review.review}</p>
                </div>
            </div>
            `,
    )
    .join('')}
    </div>
</div>
`;

const createRestaurantItemTemplate = (restaurant) => `
        <div class="restaurantContainer" id="restaurantContainer" tabindex="0">
                <div class="card" id="card">
                    <a href="/#/detail/${restaurant.id}">
                        <div id="(${restaurant.id})" class="card-body" >
                        <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
                        <h3>${restaurant.name}</h3>
                        <p>${restaurant.description}</p>
                        </div>
                    </a>
                </div>
        </div>
        `;

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createLikedButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
};
