<template>
  <section class="cart">
    <div class="container">
      <p class="cart__yesOrNo" v-show="cartByOne?.length ? false : true">
        Your cart is currently no products
        <router-link to="/">home page</router-link>
      </p>
      <ul class="cart__list">
        <li class="cart__product" v-for="(product, index) in cartByOne" :key="index">
          <router-link
            :to="{
              name: 'ProductPage',
              params: { id: product?.id },
            }"
            @click="$store.commit('setCategory', product?.category)"
            class="cart__rout"
          >
            <img
              :src="product?.thumbnail"
              alt="product-img"
              class="cart__product-img"
            />
          </router-link>
          <div class="cart__product-about">
            <h3 class="cart__product-title">{{ product?.title }}</h3>
            <p class="cart__product-brand">
              <b>Brand:</b> {{ product?.brand }}
            </p>
            <p class="cart__product-desc">{{ product?.description }}</p>
            <p class="cart__product-price">{{ product?.price }}$</p>
          </div>

          
          <div class="cart__product-info">
            <input type="number" :value="product?.quantity" min="1" :max="product?.stock" class="cart__product-quantity" required>
            <div class="cart__product-control">
              <button
                class="cart__product-add"
                @click="increment(cartByOne[index])"
              >
                +1
              </button>
              <button
                class="cart__product-delete"
                @click="$store.commit('setCartDel', cartByOne[index].id)"
              >
                Delete
              </button>
              <button
                class="cart__product-add"
                @click="decriment(cartByOne[index])"
              >
                -1
              </button>
            </div>

          </div>

        </li>
      </ul>

      <div class="cart__total">
        
        <p class="cart__total-txt">
          Total: <span>{{ totalPrice }}$</span>
        </p>
        <router-link to="/buy" class="cart__total-buy" :class="{'active': cartByOne?.length}" v-show="cartByOne?.length">Buy</router-link>

        <button class="cart__total-buy cart__total-buy-noPr" v-show="cartByOne?.length == 0 ? true : false"> No products</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "cart",
  data() {
    return {
      qua: null,
      btnHideShow: false,
    }
  },
  computed: {
    ...mapState(["products", "cartByOne"]),
    totalPrice() {
      return this.cartByOne.reduce(
        (acc, val) => acc + val.quantity * val.price,
        0
      );
    },

    
  },
  methods: {
    decriment(index) {

      if (index.quantity <= 1) {
        index.quantity = 1
      } else {
        index.quantity--
      }

    },
    increment(index) {
      if (index.quantity >= index.stock) {
        index.quantity = index.stock
      } else {
        index.quantity++
      }

    }
  },
};
</script>
