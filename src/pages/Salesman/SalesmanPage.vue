<template>
  <div class="salesman">
    <div class="container">
      <div class="salesman__cards">
        <div class="salesman__card" v-for="(item, index) in userData" :key="index">

            {{ item }}

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "salesman",
  computed: {
    ...mapState(["userData"]),
  },
};
</script>
