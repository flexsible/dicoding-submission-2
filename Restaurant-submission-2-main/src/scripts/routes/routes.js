import Like from "../views/pages/like";
import Detail from "../views/pages/detail";
import restaurantList from "../views/pages/list-restaurant";

const routes = {
    '/': restaurantList, //default
    '/restaurant-list': restaurantList,
    '/detail/:id': Detail,
    '/like': Like,
}

export default routes