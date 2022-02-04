<template>
  <div>
    <Cart></Cart>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Cart from './Cart'
import Sale from './Sale'
import Observe from './Observe'
import { mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Cart,
    Sale,
    Observe
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions('home', ['getData'])
  }
}
</script>

<style lang="scss" scoped></style>
