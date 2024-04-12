import { requestWithToken } from "../utils/axios-http";

export function managerCreateRestaurant(restaurant) {
    return requestWithToken({
        data: restaurant,
        method: 'POST',
        url: '/restaurant'
    });
}

export function managerUpdateRestaurant(id, restaurant) {
    return requestWithToken({
        data: restaurant,
        method: 'PUT',
        url: `/restaurant/${id}`
    });
}
