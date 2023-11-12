import { createStore } from 'vuex';
import createPersistedState from "vuex-plugin-persistedstate";
import axios from 'axios';

export default createStore({
  state: {
    products: null,
    cart: [],
    cartByOne: [],
    category: [],
    userData: [],
    categories: null,
    socials: {
      telegram: {
        name: "Telegram",
        link: "https://telegram.me/maga_me",
        icon: require("@/assets/images/icons/telegram.svg")
      },
      tiktok: {
        name: "TikTok",
        src: "https://www.tiktok.com/",
        icon: require("@/assets/images/icons/tiktok.svg")
      },
      youtube: {
        name: "YouTube",
        src: "https://www.youtube.com/watch?v=_1YwHbjELJI",
        icon: require("@/assets/images/icons/youtube.svg")
      },
      instagram: {
        name: "Instagram",
        src: "https://www.instagram.com/",
        icon: require("@/assets/images/icons/instagram.svg")
      },
      
    },
  },
  mutations: {
    setProducts(state, product) {
      state.products = product;
    },
    setCartAdd(state, item) {

        state.cart.push(item)
        
        let obj = item
        obj.quantity = 1

        if (state?.cartByOne?.find(el => el.id == item.id)) {
          let qw = state?.cart?.filter(el => el.id == item.id).length
          obj.quantity = qw
        } else {
          state.cartByOne.push(item)
        }

    },
    setCartDel(state, id) {
      let idx = state.cartByOne.findIndex(item => item.id == id)
      state.cartByOne.splice(idx, 1)
    },
    setCardDicre(state, item) {

      state.cart.forEach(element => {
        if (element.id == item.id) {
          
          state.cart.splice(element, 1)
        }
      });

      // let ww = state.cart.filter(el => el.id == item.id)

      // let obj = item
      

      // if (state?.cartByOne?.find(el => el.id == item.id)) {
      //     let qw = state?.cart?.filter(el => el.id == item.id).length
      //     obj.quantity = qw
      //     console.log(qw);
      //   } 
    },
    setCategory(state, name) {
      state.category = state.products?.filter(product => product.category == name);
    },
    setCategories(state, category) {
      state.categories = category;
    },
    sortAscending(state) {
      state.products.sort((a, b) => a.price - b.price);
    },
    sortDescending(state) {
      state.products.sort((a, b) => b.price - a.price);
    },
    sortAscendingRating(state) {
      state.products.sort((a, b) => a.rating - b.rating);
    },
    sortDescendingRating(state) {
      state.products.sort((a, b) => b.rating - a.rating);
    },
    setUserData(state, data) {
      state.userData.push(data)
    }
  },
  actions: {
    async getProducts({ commit }) {
      try {
        let productList = await axios.get('https://dummyjson.com/products?&limit=100');
        let products = productList?.data?.products;
        commit("setProducts", products);
      } catch (error) {
        console.error(error);
      } 
    },
    async getCategories({ commit }) {
      try {
        let categoryList = await axios.get('https://dummyjson.com/products/categories');
        let categories = categoryList?.data;
        commit("setCategories", categories);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});