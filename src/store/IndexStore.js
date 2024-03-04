import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import SecureLs from "secure-ls";
var ls = new SecureLs({ isCompression: false })

export default createStore({
    state: {
        user: null,
        saltKey: "booklike123!456?",
        user_bookmarks: [],
        user_likes: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logoutUser(state) {
            state.user = null;
        },
        setLikes(state, bookmarkIds) {
            state.user_likes = bookmarkIds;
        },
        setBookmarks(state, bookmarkIds) {
            state.user_bookmarks = bookmarkIds;
        }
    },
    getters: {
        _isAuthenticated: state => state.user != null,
        _currentUserId: state => state?.user?.id,
        _userLikes: state => state?.user_likes || [],
        _userBookmarks: state => state?.user_bookmarks || [],
        _getCurrentUser(state) {
            const user = state.user;
            delete user?.password;
            return user;
        },
        _saltKey: state => state.saltKey,
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ]
})