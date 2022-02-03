<template>
  <div>
    <Cart></Cart>
    <Sale></Sale>
  </div>
</template>

<script>
import Cart from './Cart'
import Sale from './Sale'

export default {
  name: 'Dashboard',
  components: {
    Cart,
    Sale
  }
}
</script>

<style lang="scss" scoped></style>
