export function addFavorites(payload) {
    return { 
        type: "ADD_FAVORITES",
        payload
    }
}

export function deleteFavorites(payload) {
    return { 
        type: "DELETE_FAVORITES",
        payload
    }
}