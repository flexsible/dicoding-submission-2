import { async } from "regenerator-runtime";
import favoriteRestaurant from "../../public/data/favorite-restaurant";
import { createLikeButtonTemplate, createLikedButtonTemplate } from "../views/templates/template-creator";

const likeButtonInitiator = {
    async init({ likeButtonContainer, restaurant }){
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant.restaurant;

        await this._renderButton();
    },

    async _renderButton(){
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)){
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id){
        const restaurant = await favoriteRestaurant.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike(){
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await favoriteRestaurant.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },

    _renderLiked(){
        this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await favoriteRestaurant.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default likeButtonInitiator;