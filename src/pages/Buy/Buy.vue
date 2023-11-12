<template>
  <section class="buy">
    <div class="container">
      <div class="buy__desc">
        <form class="buy__desc-form">
          <input
            type="text"
            class="buy__desc-inp"
            placeholder="Full name: Salohiddinov Muhammadaziz"
            v-model="info.name"
            required
          />

          <input
            type="email"
            placeholder="Email: for.example@gmail.com"
            v-model="info.email"
            class="buy__desc-inp"
            required
          />

          <input
            type="text"
            placeholder="city or region:"
            v-model="info.address.regionOrCity"
            class="buy__desc-inp"
            required
          />
          <input
            type="text"
            placeholder="district:"
            v-model="info.address.district"
            class="buy__desc-inp"
            required
          />
          <input
            type="text"
            placeholder="street:"
            v-model="info.address.street"
            class="buy__desc-inp"
            required
          />
          <input
            type="text"
            placeholder="house:"
            v-model="info.address.house"
            class="buy__desc-inp"
            required
          />
          <input
            type="text"
            placeholder="apartment:"
            v-model="info.address.apartment"
            class="buy__desc-inp"
            required
          />

          <textarea
            name="ss"
            id="ss"
            cols="30"
            rows="3"
            placeholder="Message..."
            v-model="info.message"
            class="buy__desc-inp"
          ></textarea>

          <button class="buy__desc-btn" @click="$store.commit('setUserData', info)">Send all informations</button>
        </form>
      </div>

      <div class="buy__info">
        <h3 class="buy__info-order">Your order</h3>

        <div class="buy__info-product">
          <p class="buy__info-products">
            Products: <span>{{ cartByOne?.length }}</span>
          </p>

          <div class="buy__info-product-ttlprice">${{ totalPrice }}</div>
        </div>

        <p class="buy__info-delivery">
          Delivery: <span>${{ Math.round((totalPrice / 100) * 0.5) }}</span>
        </p>

        <p class="buy__info-total">
          Total:
          <span> ${{ totalPrice + Math.round((totalPrice / 100) * 0.5) }}</span>
        </p>
      </div>
    </div>
  </section>

  <p class="noPage" v-show="cartByOne?.length ? false : true">
    There is nothing. First, add the product to the cart, then click the Buy
    button! <br />
    go to <router-link to="/cart">Cart Page</router-link>
  </p>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Buy",
  data() {
    return {
      info: {
        products: null,
        name: null,
        email: null,
        message: null,
        address: {
          regionOrCity: null,
          district: null,
          street: null,
          house: null,
          apartment: null,
        },
      },
    };
  },
  computed: {
    ...mapState(["cartByOne"]),
    totalPrice() {
      return this.cartByOne.reduce(
        (acc, val) => acc + val.quantity * val.price,
        0
      );
    },
  },
  created() {
    this.info.products = this.cartByOne
  }
};
</script>
