<template>
  <header class="header">
    <nav class="nav">
      <div class="container">
        <router-link to="/" class="nav__logo">
          <img src="@/assets/images/logo.png" alt="" class="nav__logo-img" />
        </router-link>

        <div
          class="nav__ground"
          @click="burger = !burger"
          :class="{ active: burger }"
        >
          <div class="nav__group" @click.stop :class="{ active: burger }">
            <ul class="nav__list">
              <li class="nav__item">
                <router-link to="/new" class="nav__link">New</router-link>
              </li>
              <li class="nav__item">
                <router-link to="/category" class="nav__link"
                  >Category</router-link
                >
              </li>
              <li class="nav__item">
                <router-link to="/sales" class="nav__link">Sale</router-link>
              </li>
              <li class="nav__item">
                <router-link to="/contact" class="nav__link"
                  >Contacts</router-link
                >
              </li>
              <li class="nav__item">
                <router-link to="/about" class="nav__link">About</router-link>
              </li>
            </ul>

            <router-link to="/cart" class="nav__shop">
              <img
                src="@/assets/images/shop.svg"
                alt=""
                class="nav__shop-img"
              />
              <span>{{ cartByOne.length == 0 ? "" : cartByOne.length }}</span>
            </router-link>
          </div>
        </div>

        <div
          class="nav__burger"
          @click="burger = !burger"
          :class="{ active: burger }"
        >
          <span></span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      burger: false,
    };
  },
  computed: {
    ...mapState(["cartByOne"]),
  },
};
</script>
