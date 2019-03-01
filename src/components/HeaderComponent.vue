<template>
  <header>
    <div class="img-wrap">
      <img src="../assets/images/logo.png" alt="" class="logo">
    </div>
    <h2>официальный дистрибьютор Fox International Channels в России</h2>
    <nav>
      <a href="">Телеканалы</a>
      <a href="">Mаркетинг</a>
      <a href="">Контакты</a>
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  header {
    height: 70px;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 150px 2fr 1fr;
  }
  .img-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
    }
  } 
  h2 {
    color: #fff;
    opacity: .6;
    font-size: 1.125rem;
    margin: 0;
  }
  nav {
    display: grid;
    grid-auto-flow: column;
    font-weight: 500;
    color: #fff;
    justify-content: flex-end;
    padding-right: 4rem;
    font-size: 1.25rem;
    a {
      opacity: 1;
      transition: .3s ease;
      padding: 0 2em;
      &:hover {
        opacity: .7;
      }
    }
  }
</style>

