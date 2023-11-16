import API_ENDPOINT from "../../scripts/globals/api-endpoint";

class Restaurant {
    static async restaurantList(){
        const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
        return response.json();
    }

    static async detailRestaurant(id){
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }
}

export default Restaurant;